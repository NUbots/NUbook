/*eslint-env node */
/*eslint-env es6 */

const path = require('path')
const nubookContributionsPlugin = require('./build-plugins/gatsby-transformer-nubook-contributions')

const menu = []
const createdPages = new Set()

/**
 * Use the custom gatsby-transformer-nubook-contributions plugin to add
 * NUbook contribution data (authors and last commit) to MDX page nodes
 */
exports.onCreateNode = async (
  { node, ...otherFirstParams },
  ...otherParams
) => {
  if (node.internal.type === `Mdx`) {
    nubookContributionsPlugin.onCreateNode(
      { node, ...otherFirstParams },
      ...otherParams
    )
  }
}

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
            fileAbsolutePath
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
  menu.forEach((section) => {
    section.chapters.forEach((chapter) => {
      chapter.hidden = chapter.pages.every((page) => page.hidden)
    })

    section.hidden = section.chapters.every((chapter) => chapter.hidden)
  })

  const templatePath = path.resolve('./src/components/page-template.jsx')

  // Create a page for each MDX file
  posts.forEach(({ node, next, previous }, index) => {
    const nextPage = getNext(next, posts, index)
    const previousPage = getPrevious(previous, posts, index)

    actions.createPage({
      path: node.frontmatter.slug,
      component: templatePath,
      context: {
        mdxPath: path
          .relative(__dirname, node.fileAbsolutePath)
          .split(path.sep)
          .join(path.posix.sep),
        id: node.id,
        next: nextPage ? nextPage.frontmatter : null,
        previous: previousPage ? previousPage.frontmatter : null,
        menu,
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
    (section) => section.title === node.frontmatter.section
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
    (chapter) => chapter.title === node.frontmatter.chapter
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

/**
 * Customise the webpack config.
 */
exports.onCreateWebpackConfig = ({ stage, actions, getConfig, plugins }) => {
  disableMiniCssExtractPluginOrder({ stage, actions, getConfig, plugins })
}

/**
 * Replace MiniCssExtractPlugin with a new instance that has the `ignoreOrder`
 * option set. With Tailwind and CSS modules, we have non-colliding and
 * namespaced class names across files respectively. That means we can
 * safely ignore the order warnings from MiniCssExtractPlugin.
 * See https://webpack.js.org/plugins/mini-css-extract-plugin/#remove-order-warnings
 */
function disableMiniCssExtractPluginOrder({
  stage,
  actions,
  getConfig,
  plugins,
}) {
  const config = getConfig()

  const miniCssExtractPluginIndex = config.plugins.findIndex(
    (plugin) => plugin.constructor.name === 'MiniCssExtractPlugin'
  )

  if (miniCssExtractPluginIndex > -1) {
    if (stage === 'build-javascript') {
      config.plugins[miniCssExtractPluginIndex] = plugins.extractText({
        filename: `[name].[contenthash].css`,
        chunkFilename: `[name].[contenthash].css`,
        ignoreOrder: true,
      })
    } else {
      config.plugins[miniCssExtractPluginIndex] = plugins.extractText({
        filename: `[name].css`,
        chunkFilename: `[id].css`,
        ignoreOrder: true,
      })
    }
  }

  actions.replaceWebpackConfig(config)
}
