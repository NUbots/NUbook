const { Command } = require('commander')
const fs = require('fs')
const path = require('path')
const glob = require('glob')
const mkdirp = require('mkdirp')
const { exec } = require('child_process')

// Add command line arguments for the root to NUbots and NUbook
const program = new Command()
program
  .option(
    '--main_codebase_path <path>',
    'Relative path to the main codebase folder',
    '../NUbots/'
  )
  .option('--nubook_path <path>', 'Relative path to the NUbook folder', '.')

program.parse(process.argv)
const options = program.opts()

// Constants for MDX content
const READMES_PATH = './src/book/02-system/05-modules/'
const IMAGES_PATH = path.join(READMES_PATH, 'images')
const MD_CONTENT_TEMPLATE = `---
section: System
chapter: Modules
title: {title}
description: Documentation for each {description} module in the main NUbots codebase
slug: {slug}
---
`

function isEmptyReadme(content) {
  // Check if the content only contains headings and/or empty lines
  const lines = content.split('\n')
  return lines.every(
    (line) => line.trim() === '' || line.trim().startsWith('#')
  )
}

function copyImagesAndAdjustPaths(mdContent, readmeDir) {
  const imageRegex = /!\[.*?\]\((.*?)\)/g
  let match
  let adjustedContent = mdContent

  while ((match = imageRegex.exec(mdContent)) !== null) {
    const imagePath = match[1]
    const imageName = path.basename(imagePath)
    const sourceImagePath = path.join(readmeDir, imageName)
    const destImagePath = path.join(IMAGES_PATH, imageName)

    if (fs.existsSync(sourceImagePath)) {
      mkdirp.sync(IMAGES_PATH)
      fs.copyFileSync(sourceImagePath, destImagePath)
      adjustedContent = adjustedContent.replace(
        imagePath,
        `images/${imageName}`
      )
    }
  }

  return adjustedContent
}

function processReadmesInSubfolder(subfolder, index) {
  // Find all README.md files in the given subfolder (including nested subfolders)
  const readmeFiles = glob.sync(`${subfolder}/**/README.md`)

  if (readmeFiles.length === 0) {
    console.log(`No README.md files found in ${subfolder}.`)
    return
  }

  // Concatenate the contents of all non-empty README.md files
  let concatenatedContent = ''
  readmeFiles.forEach((file) => {
    const mdContent = fs.readFileSync(file, 'utf-8')
    if (!isEmptyReadme(mdContent)) {
      const readmeDir = path.dirname(file)
      const adjustedContent = copyImagesAndAdjustPaths(
        mdContent,
        readmeDir
      ).replace(/^(#+)/gm, '#$1')
      concatenatedContent += adjustedContent + '\n'
    } else {
      console.log(`Skipping empty README.md file: ${file}`)
    }
  })

  if (concatenatedContent === '') {
    console.log(`All README.md files in ${subfolder} are empty. Skipping.`)
    return
  }

  // Extract the subfolder name
  const subfolderName = path.basename(subfolder)
  const slug = `/system/modules/${subfolderName}/`

  // The header content for the MDX file
  const markdownContent = MD_CONTENT_TEMPLATE.replace('{chapter}', 'Modules')
    .replace(
      '{title}',
      subfolderName.charAt(0).toUpperCase() + subfolderName.slice(1)
    )
    .replace('{description}', subfolderName)
    .replace('{slug}', slug)

  // The path of the mdx file this readme will be added to
  const mdxFilePath = path.join(
    READMES_PATH,
    `${String(index).padStart(2, '0')}-${subfolderName}.mdx`
  )
  console.log(mdxFilePath)

  // Write the content to the MDX file, overriding any existing file
  mkdirp.sync(path.dirname(mdxFilePath))
  fs.writeFileSync(mdxFilePath, markdownContent + concatenatedContent)
}

function findImmediateSubfolders(parentPath) {
  // Find all immediate subfolders in the given parent path
  return fs
    .readdirSync(parentPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => path.join(parentPath, dirent.name))
}

function processModules() {
  const modulesPath = path.join(options.main_codebase_path, 'module')
  const subfolders = findImmediateSubfolders(modulesPath)

  if (subfolders.length === 0) {
    console.log('No subfolders found in the modules directory.')
    return
  }

  mkdirp.sync(path.join(READMES_PATH, options.nubook_path))

  subfolders.forEach((subfolder, index) => {
    // Skip the root directory itself
    if (subfolder === modulesPath) {
      return
    }
    processReadmesInSubfolder(subfolder, index + 1)
  })
}

function runYarnFormat() {
  exec('yarn format', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error running yarn format: ${error.message}`)
      return
    }
    if (stderr) {
      console.error(`yarn format stderr: ${stderr}`)
      return
    }
    console.log(`yarn format stdout: ${stdout}`)
  })
}

// Create the READMES_PATH directory if it doesn't exist
mkdirp.sync(READMES_PATH)

// Process all modules
processModules()

// Run yarn format at the end
runYarnFormat()
