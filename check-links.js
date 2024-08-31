require('events').EventEmitter.defaultMaxListeners = Infinity
const { readdirSync, statSync, readFileSync } = require('fs')
const { resolve } = require('path')
const axios = require('axios')

// Recursively search for files matching the pattern in a directory
const searchRecursive = (dir, pattern) => {
  let results = []
  readdirSync(dir).forEach(dirInner => {
    const resolvedPath = resolve(dir, dirInner)
    const stat = statSync(resolvedPath)

    if (stat.isDirectory()) {
      results = results.concat(searchRecursive(resolvedPath, pattern))
    }
    if (stat.isFile() && resolvedPath.endsWith(pattern)) {
      results.push(resolvedPath)
    }
  })
  return results
}

const files = searchRecursive('./src/book', '.mdx')
const externalLinksList = []

// Loop through the mdx files to find all links
let count = 0
files.forEach(file => {
  const array = readFileSync(file).toString().split('\n')
  const reBrackets = /\((.*?)\)/g

  array.forEach(line => {
    let found
    while ((found = reBrackets.exec(line)) !== null) {
      const t = found[1].split(' ', 1)[0]
      if (t.includes('/')) {
        if (t.startsWith('http') && !t.includes('localhost')) {
          count++
          externalLinksList.push({ link: t, file })
        }
      }
    }
  })
})

// Send HTTP HEAD request to check if the link exists
const sendHTTPRequest = async linkURL => {
  try {
    const res = await axios.head(linkURL, { timeout: 30000 })
    return res.status.toString().startsWith(2)
  } catch (error) {
    console.error('Error checking link:', linkURL, error.message)
    return false
  }
}

// Check all external links
const checkLinks = async () => {
  for (const { link, file } of externalLinksList) {
    const exists = await sendHTTPRequest(link)
    if (!exists) {
      console.log(`Broken link: ${link} found in file: ${file}`)
    }
  }
  console.log('External Links found:', count)
}

checkLinks()