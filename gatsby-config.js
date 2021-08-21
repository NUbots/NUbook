/*eslint-env node*/

const path = require('path')

module.exports = {
  // Deployment path on Github Pages (matches repo name)
  pathPrefix: '/NUbook',
  siteMetadata: {
    title: 'NUbook',
    description: 'The NUbots team handbook.',
    keywords: ['nubots', 'team', 'handbook', 'help', 'documentation'],
    siteUrl: 'https://nubook.nubots.net',
    githubUrl: 'https://github.com/NUbots/',
    slackUrl: 'https://nubotsteam.slack.com',
    facebookUrl: 'https://www.facebook.com/NubotsRobotics/',
    email: 'nubots@newcastle.edu.au',
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'book',
        path: `${__dirname}/src/book`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages`,
      },
    },
    'gatsby-plugin-image',
    // Exposes helper functions for processing images with the
    // sharp package from npm. Used by other plugins.
    'gatsby-plugin-sharp',
    // Identifies file nodes that are images and transforms them
    // to create new `ImageSharp` nodes. Those nodes can then
    // be resized and transformed using queries.
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        defaultLayouts: {
          default: `${__dirname}/src/components/layout/layout.jsx`,
        },
        remarkPlugins: [
          require('remark-unwrap-images'),
          require('remark-math'),
        ],
        rehypePlugins: [[require('rehype-katex'), { strict: false }]],
        gatsbyRemarkPlugins: [
          {
            resolve: path.join(
              __dirname,
              './build-plugins/remark-absolute-image-src.js'
            ),
          },
          {
            resolve: '@josephuspaye/gatsby-remark-graphviz',
            options: {
              optimize: true,
              wrapperTag: 'div',
              wrapperClass: 'remark-graphviz-graph',
              figureClass: 'remark-graphviz-figure',
              figcaptionClass: 'remark-graphviz-figcaption',
              firstCommentIsCaption: true,
              generateAriaDescription: true,
            },
          },
          'gatsby-remark-copy-linked-files',
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              maintainCase: false,
              removeAccents: true,
            },
          },
        ],
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /\.svg$/,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'NUbook',
        short_name: 'NUbook',
        start_url: '/NUbook',
        background_color: '#24292E',
        theme_color: '#F9A50D',
        display: 'minimal-ui',
        icon: 'src/images/nubots-icon.png', // Relative to site root
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allFile(filter: {extension: {eq: "mdx"}}) {
              nodes {
                modifiedTime
              }
            }
            allSitePage(filter: {context: {hidden: {ne: true}}}) {
              nodes {
                path
              }
            }
          }
        `,
        resolveSiteUrl: ({ site }) => {
          return site.siteMetadata.siteUrl
        },
        resolvePages: ({ site, allFile, allSitePage }) => {
          const lastModified = {}
          for (const file of allFile.nodes) {
            lastModified[file.absolutePath] = file.modifiedTime
          }
          return allSitePage.nodes.map((node) => {
            return {
              ...node,
              url: `${site.siteMetadata.siteUrl}${node.path}`,
              lastModified: lastModified[node.fileAbsolutePath],
            }
          })
        },
        filterPages: () => true,
        serialize: (page) => ({
          url: page.url,
          lastmod: toW3CString(page.lastModified),
        }),
      },
    },
  ],
}

// Convert the given date string to a string in the W3C datetime format (yyyy-mm-ddThh:ii:ss+zz:zz).
// Adapted from https://gist.github.com/tristanlins/6585391
function toW3CString(dateString) {
  const date = new Date(dateString)

  const year = date.getFullYear()
  let month = date.getMonth()
  month++
  if (month < 10) {
    month = '0' + month
  }
  let day = date.getDate()
  if (day < 10) {
    day = '0' + day
  }

  let hours = date.getHours()
  if (hours < 10) {
    hours = '0' + hours
  }

  let minutes = date.getMinutes()
  if (minutes < 10) {
    minutes = '0' + minutes
  }

  let seconds = date.getSeconds()
  if (seconds < 10) {
    seconds = '0' + seconds
  }

  const offset = -date.getTimezoneOffset()
  let offsetHours = Math.abs(Math.floor(offset / 60))
  let offsetMinutes = Math.abs(offset) - offsetHours * 60

  if (offsetHours < 10) {
    offsetHours = '0' + offsetHours
  }

  if (offsetMinutes < 10) {
    offsetMinutes = '0' + offsetMinutes
  }

  let offsetSign = '+'
  if (offset < 0) {
    offsetSign = '-'
  }

  return (
    year +
    '-' +
    month +
    '-' +
    day +
    'T' +
    hours +
    ':' +
    minutes +
    ':' +
    seconds +
    offsetSign +
    offsetHours +
    ':' +
    offsetMinutes
  )
}
