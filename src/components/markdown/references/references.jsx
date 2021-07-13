import React, { useContext } from 'react'
import { BibReferencesContext } from '../../page-template'

// Uses IEEE referencing style (https://ieeeauthorcenter.ieee.org/wp-content/uploads/IEEE-Reference-Guide.pdf)
const References = () => {
  const { references, usedReferences } = useContext(BibReferencesContext)

  const referenceOptions = Array.from(usedReferences).map((referenceId, i) => {
    const fields = references[referenceId].fields // fields has author, title, year, etc
    const type = references[referenceId].type // types is the type of bibtex reference entry

    const authorName = fields.author.normalized.split(' ')

    if (type == 'book') {
      return (
        <li id={`reference-${referenceId}`} key={referenceId}>
          {authorName[0].charAt(0)}. {authorName[1]}, <i>{fields.title}</i>.{' '}
          {fields.address}: {fields.publisher}, {fields.year}.
        </li>
      )
    } else if (type == 'article') {
      return (
        <li id={`reference-${referenceId}`} key={referenceId}>
          {authorName[0].charAt(0)}. {authorName[1]}, &quot;
          {fields.title}&quot;, {fields.year}. [Online]. Available:{' '}
          <a href={fields.url} target='_blank' rel='noopener noreferrer'>
            {fields.url}
          </a>
          .
        </li>
      )
    }
  })

  return <ol>{referenceOptions}</ol>
}

export default References
