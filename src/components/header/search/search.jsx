import React from 'react'
import PropTypes from 'prop-types'
import '@docsearch/css'
import * as style from './search.module.css'
import { DocSearch } from '@docsearch/react'

const Search = () => {
  return (
    // <div className={style.search}>
    <DocSearch
      appId='BH4D9OD16A'
      apiKey='be16e460d9d03fa711df82d525dec3c1'
      indexName='nubots'
      placeholder='Search NUbook...'
      transformItems={(items) => {
        return items.map((item) => {
          // Get the origin (domain + port, if any) from the result URL
          const { origin } = new URL(item.url)
          return {
            ...item,
            // Replace the origin in the result URL with our current origin,
            // so the links work for local development and deploy previews
            url: item.url.replace(origin, window.location.origin),
          }
        })
      }}
    />
    // </div>
  )
}

Search.propTypes = {
  background: PropTypes.string,
}

Search.defaultProps = {
  background: 'solid',
}

export default Search
