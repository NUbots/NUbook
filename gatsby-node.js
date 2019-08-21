/*eslint-env node*/

const path = require('path')

exports.createPages = async ({ graphql, actions, reporter }) => {
  // Get the MDX pages sorted by file path (this is why we have the numeric prefixes)
  const result = await graphql(`
    query {
      allMdx(sort: { fields: fileAbsolutePath }) {
        edges {
          node {
            id
            frontmatter {
              chapter
              title
              slug
              hidden
            }
          }
          next {
            frontmatter {
              title
              description
              slug
              hidden
            }
          }
          previous {
            frontmatter {
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

  // Create the navigation menu
  const menu = {}

  // Populate the menu
  posts
    .filter(({ node }) => !node.frontmatter.hidden)
    .forEach(({ node }) => {
      const chapter = menu[node.frontmatter.chapter] || {
        title: node.frontmatter.chapter,
        pages: [],
      }

      chapter.pages.push({
        title: node.frontmatter.title,
        slug: node.frontmatter.slug,
      })

      menu[chapter.title] = chapter
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
        menu: Object.values(menu),
      },
    })
  })
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
