import React from 'react'
import PropTypes from 'prop-types'
import '@docsearch/css'
import * as style from './search.module.css'
import { DocSearch } from '@docsearch/react'
const Search = () => {
  return (
    <div className={`${style.search}`}>
      <DocSearch
        appId='BH4D9OD16A'
        apiKey='be16e460d9d03fa711df82d525dec3c1'
        indexName='nubots'
        placeholder='Search NUbook...'
      />
    </div>
  )
}

Search.propTypes = {
  background: PropTypes.string,
}

Search.defaultProps = {
  background: 'solid',
}

export default Search
