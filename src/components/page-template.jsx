import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import { BibReferencesContext } from './markdown/references/context'

import Layout from './layout'

const PageTemplate = (props) => {
  const commits = props.data.github.repository.object.history.nodes
  const commit = commits[0]

  const unique = commits.filter(
    (v, i, a) => a.findIndex((t) => t.author.user.id === v.author.user.id) === i
  )

  const contributors = []
  unique.forEach((commit) => {
    contributors.push({
      avatar: commit.author.avatarUrl,
      url: commit.author.user.url,
      name: commit.author.name,
    })
  })

  const [usedReferences, setUsedReferences] = useState(new Set())

  function addUsedReference(referenceId) {
    setUsedReferences(
      (previousReferences) => new Set([...previousReferences, referenceId])
    )
  }

  const referencesContext = {
    references: props.pageContext.references,
    usedReferences,
    addUsedReference,
  }

  return (
    <BibReferencesContext.Provider value={referencesContext}>
      <Layout
        pageContext={props.pageContext}
        data={props.data}
        commit={commit}
        contributors={contributors}
      >
        <MDXRenderer>{props.data.mdx.body}</MDXRenderer>
      </Layout>
    </BibReferencesContext.Provider>
  )
}

PageTemplate.propTypes = {
  data: PropTypes.shape({
    github: PropTypes.shape({
      repository: PropTypes.shape({
        object: PropTypes.shape({
          history: PropTypes.shape({
            nodes: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
          }).isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
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
                  name
                  avatarUrl
                  user {
                    url
                    id
                  }
                }
                url
              }
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
