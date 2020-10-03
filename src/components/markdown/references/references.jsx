import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import { BibReferencesContext } from '../../page-template'

const References = ({ children }) => {  
    return (
      <p>the references component works</p>
    )
}

References.PropTypes = {
    children: PropTypes.node,
}

export default References