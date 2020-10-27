/*eslint-env node*/

const path = require('path')

const menu = []

/**
 * Create the site pages from MDX files in /src/book
 */
exports.createPages = async ({ graphql, actions, reporter }) => {
  // Get the MDX pages sorted by file path (this is why we have the numeric prefixes)
  const result = await graphql(`
    query {
      allMdx(sort: { fields: fileAbsolutePath }) {
        edges {
          node {
            id
            frontmatter {
              section
              chapter
              title
              slug
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
  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }

  // Get all MDX files
  const posts = result.data.allMdx.edges

  // Populate the menu
  posts
    .filter(({ node }) => !node.frontmatter.hidden)
    .forEach(({ node }) => {
      const section = findOrCreateSection(menu, node)
      const chapter = findOrCreateChapter(section, node)

      chapter.pages.push({
        title: node.frontmatter.title,
        slug: node.frontmatter.slug,
      })
    })

  // Create a page for each MDX file
  posts.forEach(({ node, next, previous }, index) => {
    const nextPage = getNext(next, posts, index)
    const previousPage = getPrevious(previous, posts, index)

    actions.createPage({
      path: node.frontmatter.slug,
      component: path.resolve('./src/components/page-template.jsx'),
      context: {
        id: node.id,
        next: nextPage ? nextPage.frontmatter : null,
        previous: previousPage ? previousPage.frontmatter : null,
        menu,
        hidden: node.frontmatter.hidden,
      },
    })
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
