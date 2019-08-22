import React from 'react'

import SearchIcon from './search-icon.svg'
import style from './search.module.css'

const Search = () => (
  <div className={`${style.search} relative`}>
    <input
      disabled
      placeholder='Search handbook...'
      className='h-10 w-full pl-14 pr-4 rounded appearance-none text-lg bg-gray-800 placeholder-gray-500 text-white outline-none focus:bg-white focus:text-primary cursor-not-allowed'
      title='Search coming soon'
    />
    <SearchIcon
      className={`${style.searchIcon} absolute top-0 left-0 w-6 h-6 ml-4 mt-2 text-icon-inverted pointer-events-none`}
    />
  </div>
)

export default Search
