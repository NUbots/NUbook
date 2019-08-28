import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import Layout from './layout'

const PageTemplate = props => {
  return (
    <Layout pageContext={props.pageContext} data={props.data}>
      <MDXRenderer>{props.data.mdx.body}</MDXRenderer>
    </Layout>
  )
}

PageTemplate.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.shape({
      id: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      tableOfContents: PropTypes.object,
      frontmatter: PropTypes.shape({
        section: PropTypes.string,
        chapter: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        keywords: PropTypes.arrayOf(PropTypes.string),
        slug: PropTypes.string,
        hidden: PropTypes.bool,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  pageContext: PropTypes.object.isRequired,
}

export default PageTemplate

export const query = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      id
      body
      tableOfContents(maxDepth: 3)
      frontmatter {
        section
        chapter
        title
        description
        keywords
        slug
        hidden
      }
    }
  }
`
