import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Links from './links/links'
import Logo from './logo/logo'
import Menu from './menu/menu'
import MenuToggle from './menu-toggle/menu-toggle'
import Search from './search/search'
import style from './header.module.css'

const Header = ({ menu, currentSection, background, height }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <>
      <div
        className={`${style.header} w-full fixed z-30 ${
          background === 'solid' ? 'bg-gray-900' : ''
        }`}
      >
        <div className='max-w-screen-xl mx-auto px-6'>
          <div className={`-mx-6 flex items-center ${height}`}>
            <div className='px-6 lg:pr-8 lg:w-1/4 xl:w-1/5'>
              <Logo />
            </div>
            <div className='flex flex-grow items-center lg:w-3/4 xl:w-4/5'>
              <div className='w-full lg:px-6 xl:w-3/4 xl:px-12'>
                <Search background={background} />
              </div>
              <div className='px-6 lg:hidden'>
                <MenuToggle menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
              </div>
              <div className='hidden flex-shrink-0 lg:flex lg:items-center lg:justify-end xl:w-1/4 px-6'>
                <Links />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Menu menu={menu} currentSection={currentSection} open={menuOpen} />
    </>
  )
}

Header.propTypes = {
  menu: PropTypes.array.isRequired,
  currentSection: PropTypes.object.isRequired,
  background: PropTypes.string,
  height: PropTypes.string,
}

Header.defaultProps = {
  background: 'solid',
  height: 'h-16',
}

export default Header
