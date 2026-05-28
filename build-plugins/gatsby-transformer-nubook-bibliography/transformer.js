/*eslint-env node*/

const fs = require('fs')
const path = require('path')
const Cite = require('citation-js')

let enGbLocale = ''
let ieeeTemplate = ''

/**
 * Load the IEEE template and the en-GB locale and register them with Cite.
 */
async function loadIeeeTemplateAndGbLocale() {
  if (enGbLocale.length > 0 && ieeeTemplate.length > 0) {
    return
  }

  try {
    enGbLocale = await fs.promises.readFile(
      path.join(__dirname, 'locales-en-GB.xml'),
      'utf8'
    )
  } catch (e) {
    throw new Error('unable to load en-GB locale for citation-js' + e)
  }

  try {
    ieeeTemplate = await fs.promises.readFile(
      path.join(__dirname, 'ieee.csl'),
      'utf8'
    )
  } catch (e) {
    throw new Error('unable to load IEEE template for citation-js' + e)
  }

  const config = Cite.plugins.config.get('@csl')

  config.locales.add('en-GB', enGbLocale)
  config.templates.add('ieee', ieeeTemplate)
}

// https://regexr.com/6ee9c
const bibtexEntrySplitRegex = /(@(?:.|\s)*?\{)/g

/**
 * Split the entire Bibtex string into individual entry strings: splits on `@some_entry_type{`
 */
function parseBibEntries(bibtex) {
  const separator = '__separator__'

  const entries = bibtex
    .replace(bibtexEntrySplitRegex, separator + '$1') // add separator before each entry
    .split(separator) // split on the separator
    .filter((entry) => entry.trim().length > 0) // remove empty entries

  return entries
}

const ieeeTemplateRegexes = {
  // https://regexr.com/6ee74
  entry:
    /<div data-csl-entry-id="(.+?)" class="csl-entry">\s*(.+?<\/div>)\s*<\/div>$/m,
  entryLeftMargin: /<div class="csl-left-margin">(.+?)<\/div>/g,
  divOpen: /<div/g,
  divClose: /<\/div>/g,
}

/**
 * Extract the first entry from the given bibliography HTML.
 */
function extractSingleReference(bibliography) {
  const match = bibliography
    // The IEEE reference template includes the item index at the start in
    // `div.csl-left-margin`. Remove this div from the HTML.
    .replace(ieeeTemplateRegexes.entryLeftMargin, '')
    .match(ieeeTemplateRegexes.entry)

  if (match) {
    return match[2]
      .replace(ieeeTemplateRegexes.divOpen, '<span')
      .replace(ieeeTemplateRegexes.divClose, '</span>')
  }

  return ''
}

/**
 * Parse the given bibtex string into a list of bibliography entries in the IEEE format.
 */
async function parseIeeeBibliography(bibFileContent, bibFilePath) {
  await loadIeeeTemplateAndGbLocale()

  // Parse the entire bibtex file as a pre-run, for accurate line numbers if there's an error
  try {
    new Cite(bibFileContent)
  } catch (error) {
    throw new Error(`unable to parse Bibtex file ${bibFilePath}: \n` + error)
  }

  return parseBibEntries(bibFileContent).map((entry) => {
    const cite = new Cite(entry)

    const data = JSON.parse(cite.format('data'))[0] ?? {}

    // .slice() removes the surrounding brackets
    const citation = (cite.format('citation') ?? '').slice(1, -1)

    const html = cite.format('bibliography', {
      format: 'html',
      template: 'ieee',
      lang: 'en-GB',
    })

    return {
      id: data.id,
      title: data.title,
      citation,
      reference: extractSingleReference(html),
    }
  })
}

async function createBibNode({
  node,
  actions,
  loadNodeContent,
  createNodeId,
  createContentDigest,
}) {
  const content = await loadNodeContent(node)

  const bibliography = await parseIeeeBibliography(content, node.absolutePath)

  const bibFileRelativePath = path.posix.join(node.relativeDirectory, node.base)

  // The new custom NUbookBibliography node
  const bibliographyNode = {
    // Data needed for a Gatsby MDX node
    id: createNodeId(`${node.id} >>> NUbookBibliography`),
    parent: node.id,
    internal: {
      type: 'NUbookBibliography',
      contentDigest: createContentDigest({
        bibFileRelativePath,
        bibliography,
      }),
    },
    // The actual NUbook-specific data
    bibFileRelativePath,
    bibliography,
  }

  // Create the NUbookBibliography node with Gatsby
  actions.createNode(bibliographyNode)

  // Add the NUbookBibliography node as a child to the MDX page node
  actions.createParentChildLink({ parent: node, child: bibliographyNode })
}

exports.createBibNode = createBibNode

async function test() {
  const filePath = path.join(
    __dirname,
    '..',
    '..',
    '/src/book/kitchen-sink/12-referencing.bib'
  )

  const file = await fs.promises.readFile(filePath, 'utf8')

  const bibliography = await parseIeeeBibliography(file, filePath)

  console.log(bibliography)
}

if (require.main === module) {
  test()
}
