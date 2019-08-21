import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import Layout from './layout/layout'

export default (props) => {
  return (
    <Layout pageContext={props.pageContext} data={props.data}>
      <MDXRenderer>{props.data.mdx.body}</MDXRenderer>
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      id
      body
      tableOfContents(maxDepth: 3)
      frontmatter {
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
