import React, { useContext } from 'react'

import { BibReferencesContext } from './context'

import * as style from './references.module.css'

const References = () => {
  const { references, usedReferenceIds } = useContext(BibReferencesContext)

  const referenceListItems = Array.from(usedReferenceIds).map((referenceId) => {
    const referenceEntry = references[referenceId]

    return (
      <li key={referenceId}>
        <div className={style.anchor} id={`reference-${referenceId}`}></div>
        <div
          dangerouslySetInnerHTML={{ __html: referenceEntry.reference }}
        ></div>
      </li>
    )
  })

  return referenceListItems.length > 0 ? (
    <ol>{referenceListItems}</ol>
  ) : (
    <p>
      <i>No references have been cited on this page yet.</i>
    </p>
  )
}

export default References
