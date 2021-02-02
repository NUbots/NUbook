/*eslint-env node */
/*eslint-env es6 */

const path = require('path')
const { createBibNode } = require('./bib-transformer')

const menu = []
const createdPages = new Set()

exports.onCreateNode = async ({
  node,
  actions,
  loadNodeContent,
  createNodeId,
  createContentDigest,
}) => {
  if (node.ext !== `.bib`) {
    return
  }

  await createBibNode({
    node,
    actions,
    loadNodeContent,
    createNodeId,
    createContentDigest,
  })
}

/**
 * Create the site pages from MDX files in /src/book
 */
exports.createPages = async ({ graphql, actions, reporter }) => {
  // Get the MDX pages sorted by file path (this is why we have the numeric prefixes)
  const mdxResults = await graphql(`
    query {
      allMdx(sort: { fields: fileAbsolutePath }) {
        edges {
          node {
            id
            fileAbsolutePath
            frontmatter {
              section
              chapter
              title
              slug
              references
              hidden
            }
          }
          next {
            frontmatter {
              chapter
              title
              description
              slug
              hidden
            }
          }
          previous {
            frontmatter {
              chapter
              title
              description
              slug
              hidden
            }
          }
        }
      }
    }
  `)

  // Panic and abort on query error
  if (mdxResults.errors) {
    reporter.panicOnBuild(
      '🚨  ERROR: Loading "createPages" query for all MDX files'
    )
  }

  // Get all the bib reference files: these are created in the
  // `bib-transformer.js` file registered with Gatsby in the
  // `gatsby-node.js` file
  const bibResults = await graphql(`
    query {
      allBibtex {
        nodes {
          bib
          dir
          base
          relativeDirectory
        }
      }
    }
  `)

  // Panic and abort on query error
  if (bibResults.errors) {
    reporter.panicOnBuild(
      '🚨  ERROR: Loading "createPages" query for all Bib files'
    )
  }

  // Create the map of references: each key is the path to the bib file,
  // relative to the `src/book` directory, and each value is the file's
  // bib content, parsed into a JS object
  const bibReferences = {}
  for (const bibNode of bibResults.data.allBibtex.nodes) {
    const bibRelativePath = path.posix.join(
      bibNode.relativeDirectory,
      bibNode.base
    )
    bibReferences[bibRelativePath] = JSON.parse(bibNode.bib)
  }

  // Get all MDX files
  const posts = mdxResults.data.allMdx.edges

  // Populate the menu
  posts
    .filter(({ node }) => {
      return !createdPages.has(node.fileAbsolutePath)
    })
    .forEach(({ node }) => {
      const section = findOrCreateSection(menu, node)
      const chapter = findOrCreateChapter(section, node)

      chapter.pages.push({
        title: node.frontmatter.title,
        slug: node.frontmatter.slug,
        hidden: node.frontmatter.hidden,
      })
    })

  // Hide sections and chapters in the menu if all their content is hidden
  menu.forEach(section => {
    section.chapters.forEach(chapter => {
      chapter.hidden = chapter.pages.every(page => page.hidden)
    })

    section.hidden = section.chapters.every(chapter => chapter.hidden)
  })

  const templatePath = path.resolve('./src/components/page-template.jsx')

  // Create a page for each MDX file
  posts.forEach(({ node, next, previous }, index) => {
    const nextPage = getNext(next, posts, index)
    const previousPage = getPrevious(previous, posts, index)

    // Compute the path to this page's bib references file
    // (relative to the `src/book` directory)
    const directory = path.dirname(node.fileAbsolutePath)
    const bibFilePath = path.posix.resolve(
      directory,
      node.frontmatter.references || 'references.bib'
    )
    const [, bibFileRelative] = bibFilePath.split('src/book/')

    const references = bibReferences[bibFileRelative] || null

    actions.createPage({
      path: node.frontmatter.slug,
      component: templatePath,
      context: {
        id: node.id,
        next: nextPage ? nextPage.frontmatter : null,
        previous: previousPage ? previousPage.frontmatter : null,
        menu,
        references,
        hidden: node.frontmatter.hidden,
      },
    })

    createdPages.add(node.fileAbsolutePath)
  })
}

/**
 * Pass the menu through context to the landing page.
 */
exports.onCreatePage = ({ page, actions }) => {
  if (page.path === '/') {
    const { createPage, deletePage } = actions

    // Delete the Gatsby-generated landing page
    deletePage(page)

    // Create a replacement page with the menu
    createPage({
      ...page,
      context: {
        ...page.context,
        menu,
      },
    })
  }
}

/**
 * Get the section in the given menu that the given node belongs to,
 * or create a new section if not found.
 */
function findOrCreateSection(menu, node) {
  const section = menu.find(
    section => section.title === node.frontmatter.section
  )

  if (section) {
    return section
  }

  const newSection = {
    title: node.frontmatter.section,
    slug: node.frontmatter.slug,
    chapters: [],
  }

  menu.push(newSection)

  return newSection
}

/**
 * Get the chapter in the given section that the given node belongs to,
 * or create a new chapter if not found.
 */
function findOrCreateChapter(section, node) {
  const chapter = section.chapters.find(
    chapter => chapter.title === node.frontmatter.chapter
  )

  if (chapter) {
    return chapter
  }

  const newChapter = {
    title: node.frontmatter.chapter,
    slug: node.frontmatter.slug,
    pages: [],
  }

  section.chapters.push(newChapter)

  return newChapter
}

/**
 * Get the next node, skipping any nodes in the chain that are hidden
 */
function getNext(nextNode, posts, index) {
  if (!nextNode) {
    return null
  }

  if (!nextNode.frontmatter.hidden) {
    return nextNode
  }

  const next = posts[index + 1]

  if (!next) {
    return null
  }

  return getNext(next.node, posts, index + 1)
}

/**
 * Get the previous node, skipping any nodes in the chain that are hidden
 */
function getPrevious(previousNode, posts, index) {
  if (!previousNode) {
    return null
  }

  if (!previousNode.frontmatter.hidden) {
    return previousNode
  }

  const previous = posts[index - 1]

  if (!previous) {
    return null
  }

  return getPrevious(previous.node, posts, index - 1)
}
