module.exports = {
  siteMetadata: {
    title: 'NUbook',
    description: 'The NUbots team handbook.',
    author: '@nubots',
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
        name: 'pages',
        path: `${__dirname}/src/pages`,
      }
    },
    // Exposes helper functions for processing images with the
    // `sharp` package from npm. Used by other plugins.
    'gatsby-plugin-sharp',
    // Identifies file nodes that are images and transforms them
    // to create new `ImageSharp` nodes. Those nodes can then
    // be resized and transformed using queries.
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: [`.mdx`, `.md`],
        defaultLayouts: { default: `${__dirname}/src/components/layout/layout.jsx` },
        remarkPlugins: [require('remark-unwrap-images')],
        gatsbyRemarkPlugins: [
          'gatsby-remark-copy-linked-files',
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
        }
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'NUbook',
        short_name: 'nubook',
        start_url: '/',
        background_color: '#24292E',
        theme_color: '#F9A50D',
        display: 'minimal-ui',
        icon: 'src/images/nubots-icon.png', // Relative to site root
      },
    },
  ],
}
