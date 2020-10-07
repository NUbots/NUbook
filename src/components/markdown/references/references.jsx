import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import { BibReferencesContext } from '../../page-template'

const References = ({ children }) => {
  const { references, usedReferences, addUsedReference } = useContext(
    BibReferencesContext
  )
  
  const referenceId = String(children)

  // looping array
  const referenceOptions = Array.from(usedReferences).map((referenceId, i) => {
    const fields = references[referenceId].fields
    // fields now has all the data you need, e.g. fields.author, fields.title

    // returning values
    return(
      <div>
        <p> {i+1}. {fields.author} ({fields.year}) - <i>{fields.title}</i> - <a target="_blank" href={fields.url} >{fields.url}</a></p>
        
      </div>
    )
  });

  // return the map
  return(
    <div>
      {referenceOptions}
    </div>
  )

}

References.PropTypes = {
  children: PropTypes.isRequired,
}

export default References