import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import { BibReferencesContext } from '../../page-template'
import style from './cite.module.css'

const CiteSingle = ({ children }) => {
  const { references, usedReferences, addUsedReference } = useContext(
    BibReferencesContext
  )

  const referenceId = String(children)
  const referenceEntry = references[referenceId]

  if (referenceEntry === undefined) {
    return (
      <span className='text-white bg-red-600'>
        (unknown reference: {referenceId})
      </span>
    )
  }

  const referenceIndex = Array.from(usedReferences).indexOf(referenceId)
  let referenceNumber = 0

  if (usedReferences.has(referenceId)) {
    referenceNumber = referenceIndex + 1
  } else {
    addUsedReference(referenceId)
  }

  const { author, year, title } = referenceEntry.fields

  return (
    <a
      href={`#reference-${referenceId}`}
      title={`${title} (${author} ${year})`}
      className={style.citeLink}
    >
      [{referenceNumber}]
    </a>
  )
}

const Cite = ({ children }) => {
  const referenceIds = String(children)
    .split(',')
    .map(id => id.trim())

  return (
    <sup>
      {referenceIds.map(id => (
        <CiteSingle>{id}</CiteSingle>
      ))}
    </sup>
  )
}

Cite.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Cite
