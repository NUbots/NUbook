import React from 'react'
import PropTypes from 'prop-types'

import SearchIcon from './search-icon.svg'
import style from './search.module.css'

const Search = ({ background }) => (
  <div className={`${style.search} relative`}>
    <input
      disabled
      placeholder='Search NUbook...'
      className={`h-10 w-full pl-14 pr-4 rounded appearance-none text-lg outline-none cursor-not-allowed ${
        background === 'solid'
          ? style.backgroundSolid
          : style.backgroundTransparent
      }`}
      title='Search coming soon'
    />
    <SearchIcon
      className={`${style.searchIcon} absolute top-0 left-0 w-6 h-6 ml-4 mt-2 text-icon-inverted pointer-events-none`}
    />
  </div>
)

Search.propTypes = {
  background: PropTypes.string,
}

Search.defaultProps = {
  background: 'solid',
}

export default Search
