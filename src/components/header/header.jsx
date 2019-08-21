import React, { useState } from 'react'

import Links from './links/links'
import Logo from './logo/logo'
import Menu from './menu/menu'
import MenuToggle from './menu-toggle/menu-toggle'
import Search from './search/search'

const Header = ({ menu }) => {
  const [ menuOpen, setMenuOpen ] = useState(false)
  return <>
    <div className='w-full bg-gray-900 fixed z-20'>
      <div className='max-w-screen-xl mx-auto px-6'>
        <div className='-mx-6 h-16 flex items-center'>
          <div className='px-6 lg:pr-8 lg:w-1/4 xl:w-1/5'>
            <Logo />
          </div>
          <div className='flex flex-grow items-center lg:w-3/4 xl:w-4/5'>
            <div className='w-full lg:px-6 xl:w-3/4 xl:px-12'>
              <Search />
            </div>
            <div className='px-6 lg:hidden'>
              <MenuToggle menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            </div>
            <div className='hidden lg:flex lg:items-center lg:justify-end xl:w-1/4 px-6'>
              <Links />
            </div>
          </div>
        </div>
      </div>
    </div>
    <Menu menu={menu} open={menuOpen} />
  </>
}

export default Header
