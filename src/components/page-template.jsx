import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import Layout from './layout'

const PageTemplate = (props) => {
  return (
    <Layout pageContext={props.pageContext} data={props.data}>
      <MDXRenderer>{props.data.mdx.body}</MDXRenderer>
    </Layout>
  )
}

PageTemplate.propTypes = {
  data: PropTypes.shape({
    github: PropTypes.shape({
      repository: PropTypes.shape({
        object: PropTypes.shape({
          history: PropTypes.shape({
            nodes: PropTypes.arrayOf({
              author: PropTypes.shape({
                date: PropTypes.string,
              }),
              url: PropTypes.string,
            }),
          }),
          file: PropTypes.shape({
            path: PropTypes.string,
          }),
        }),
      }),
    }),
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
  query ($id: String!, $mdxPath: String!) {
    github {
      repository(name: "NUbook", owner: "NUbots") {
        object(expression: "main") {
          ... on GitHub_Commit {
            history(path: $mdxPath) {
              nodes {
                author {
                  date
                }
                url
              }
            }
            file(path: $mdxPath) {
              path
            }
          }
        }
      }
    }
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
