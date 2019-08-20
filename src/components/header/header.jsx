import React, { useState } from 'react'
import Menu from './menu'
import MenuIcon from './menu-icon/menu-icon'
import NUbotsIcon from './nubots-icon.svg'
import SearchIcon from './search-icon.svg'

const Header = ({ menu }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return <>
    <div className='w-full bg-gray-900 fixed z-20'>
      <div className='container h-16 flex items-center'>
        <NUbotsIcon className='w-9 h-9 md:w-10 md:h-10 flex-shrink-0' />
        <div className='px-6 flex-grow'>
          <div className='relative'>
            <input
              type='text'
              placeholder='Search handbook...'
              className='h-10 w-full pl-14 pr-4 rounded appearance-none text-base md:text-lg bg-gray-800 placeholder-gray-500 text-white focus:bg-white focus:text-primary'
            />
            <SearchIcon
              className='absolute top-0 left-0 w-6 h-6 ml-4 mt-2 text-icon-inverted pointer-events-none'
            />
          </div>
        </div>
        <div className='h-6'>
          <button
            className='w-6 h-6 flex items-center justify-center'
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </div>
    </div>
    <Menu menu={menu} open={menuOpen} />
  </>
}

export default Header
