const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = async ({ graphql, actions, reporter }) => {
  // Get the MDX pages sorted by file path (this is why we have the numeric prefixes)
  const result = await graphql(`
    query {
      allMdx(sort: {fields: fileAbsolutePath}) {
        edges {
          node {
            id
            frontmatter {
              chapter
              title
              slug
            }
          }
          next {
            frontmatter {
              title
              slug
            }
          }
          previous {
            frontmatter {
              title
              slug
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
  posts.forEach(({ node }) => {
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
    actions.createPage({
      path: node.frontmatter.slug,
      component: path.resolve(`./src/components/page-template.jsx`),
      context: {
        id: node.id,
        next: next ? next.frontmatter : null,
        previous: previous ? previous.frontmatter : null,
        menu: Object.values(menu),
      },
    })
  })
}
