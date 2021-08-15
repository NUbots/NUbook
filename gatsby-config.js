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
        remarkPlugins: [require('remark-unwrap-images')],
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
          {
            resolve: 'gatsby-remark-katex',
            options: {
              strict: 'ignore',
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
        serialize: ({ site, allSitePage }) => {
          return allSitePage.nodes.map((node) => {
            return {
              url: `${site.siteMetadata.siteUrl}${node.path}`,
              changefreq: `weekly`,
              priority: 0.7,
            }
          })
        },
      },
    },
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        test: /\.js$|\.jsx|\.mdx$/,
        exclude: /(node_modules|.cache|public)/,
        stages: ['develop'],
        options: {
          emitWarning: true,
          failOnError: false,
        },
      },
    },
  ],
}
