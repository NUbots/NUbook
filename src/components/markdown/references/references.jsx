import React, { useContext } from 'react'
import { BibReferencesContext } from '../../page-template'

const References = () => {
  const { references, usedReferences } = useContext(BibReferencesContext)

  // looping array
  const referenceOptions = Array.from(usedReferences).map((referenceId, i) => {
    const fields = references[referenceId].fields // fields handles all the data you need, e.g. author, title, year, etc
    const types = references[referenceId].type // types handles the type of bibtex reference entry

    const authorName = fields.author.split(' ') // splitting author name for future use

    // IEEE
    if (types == 'book') {
      return (
        <div id={`#reference-${referenceId}`}>
          <p>
            {' '}
            [{i + 1}] {authorName[0].charAt(0)}. {authorName[1]},{' '}
            <i>{fields.title}</i>. {fields.address}: {fields.publisher},{' '}
            {fields.year}.
          </p>
        </div>
      )
    } else if (types == 'article') {
      return (
        <div id={`#reference-${referenceId}`}>
          <p>
            {' '}
            [{i + 1}] {authorName[0].charAt(0)}. {authorName[1]}, &quot;
            {fields.title}&quot;, {fields.year}. [Online]. Available:{' '}
            <a href={fields.url} target='_blank' rel='noopener noreferrer'>
              {fields.url}
            </a>
            .
          </p>
        </div>
      )
    }
  })

  // return the map
  return <div>{referenceOptions}</div>
}

export default References
