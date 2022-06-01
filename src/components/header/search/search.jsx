import React, {useEffect} from 'react'
import PropTypes from 'prop-types'

import SearchIcon from './search-icon.svg'
import * as style from './search.module.css'

import { initialiseAlgolia } from './algolia-search'

const Search = ({ background }) => {

  useEffect(()=>{
    initialiseAlgolia();
  }, [])
  
  return (
  <div
    className={`${style.search} ${
      background === 'solid'
        ? style.backgroundSolid
        : style.backgroundTransparent
    }`}
  >
    <input
      id='search'
      placeholder='Search NUbook...'
      title='Keyboard shortcut: /'
      autoComplete='off'
      className={`${style.searchInput} h-10 w-full pl-10 md:pl-14 pr-3 md:pr-4 rounded appearance-none text-lg outline-none`}
    />
    <SearchIcon
      className={`${style.searchIcon} absolute top-0 left-0 w-5 md:w-6 h-6 ml-3 md:ml-4 mt-2 pointer-events-none`}
    />
  </div>
)}

Search.propTypes = {
  background: PropTypes.string,
}

Search.defaultProps = {
  background: 'solid',
}

export default Search
