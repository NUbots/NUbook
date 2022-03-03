import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'

import { BibReferencesContext } from './context'
import { highlightElement } from './highlight-element'

import * as style from './cite.module.css'

const CiteSingle = ({ children }) => {
  const { references, usedReferenceIds, addUsedReference } =
    useContext(BibReferencesContext)

  if (!references) {
    throw new Error(
      'Cannot use <cite>: no Bibtex references found for this page.'
    )
  }

  const referenceId = String(children)
  const referenceEntry = references[referenceId]

  if (referenceEntry === undefined) {
    throw new Error(
      `Cannot cite "${referenceId}": no such reference found in the Bibtex file`
    )
  }

  const referenceIndex = Array.from(usedReferenceIds).indexOf(referenceId)
  let referenceNumber = referenceIndex + 1

  // Add the reference if it is not yet in the list of used references
  if (referenceIndex === -1) {
    useEffect(() => {
      addUsedReference(referenceId)
    })
  }

  return (
    <a
      href={`#reference-${referenceId}`}
      title={`${referenceEntry.title} (${referenceEntry.citation})`}
      className={style.citeLink}
      onClick={() =>
        highlightElement(
          document.querySelector('#reference-' + referenceId).parentElement
        )
      }
    >
      {referenceNumber}
    </a>
  )
}

CiteSingle.propTypes = {
  children: PropTypes.node.isRequired,
}

const Cite = ({ children }) => {
  const referenceIds = String(children)
    .split(',')
    .map((id) => id.trim())

  return (
    <span className={style.citeWrapper}>
      {referenceIds.map((id, index) => (
        <CiteSingle key={id + index}>{id}</CiteSingle>
      ))}
    </span>
  )
}

Cite.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Cite
