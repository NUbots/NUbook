import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import Layout from './layout/layout'

export default (props) => {
  console.log('page context and data', props)
  return (
    <Layout pageContext={props.data.mdx}>
      <MDXRenderer>{props.data.mdx.body}</MDXRenderer>
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      id
      body
      tableOfContents(maxDepth: 4)
      frontmatter {
        chapter
        title
        description
        slug
      }
    }
  }
`
