import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import { BibReferencesContext } from './markdown/references/context'

import Layout from './layout'

const PageTemplate = (props) => {
  const [usedReferenceIds, setUsedReferenceIds] = useState(new Set())

  function addUsedReference(referenceId) {
    setUsedReferenceIds(
      (previousReferences) => new Set([...previousReferences, referenceId])
    )
  }

  const referencesContext = {
    references: props.pageContext.references,
    usedReferenceIds,
    addUsedReference,
  }

  return (
    <BibReferencesContext.Provider value={referencesContext}>
      <Layout
        pageContext={props.pageContext}
        data={props.data}
        contributions={props.data.mdx.childNUbookContributions || {}}
      >
        <MDXRenderer>{props.data.mdx.body}</MDXRenderer>
      </Layout>
    </BibReferencesContext.Provider>
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
      childNUbookContributions: PropTypes.shape({
        authors: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string.isRequired,
            username: PropTypes.string,
          })
        ).isRequired,
        lastCommit: PropTypes.shape({
          date: PropTypes.string.isRequired,
          hash: PropTypes.string.isRequired,
        }),
      }),
    }).isRequired,
  }).isRequired,
  pageContext: PropTypes.object.isRequired,
}

export default PageTemplate

export const query = graphql`
  query ($id: String!) {
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
      childNUbookContributions {
        authors {
          name
          username
        }
        lastCommit {
          date
          hash
        }
      }
    }
  }
`
