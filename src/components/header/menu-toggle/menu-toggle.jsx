import React from 'react'

import MenuIcon from './icon'

const MenuToggle = ({ menuOpen, setMenuOpen }) => (
  <button
    className='w-6 h-6 flex items-center justify-center focus:outline-none'
    onClick={() => setMenuOpen(!menuOpen)}
  >
    <MenuIcon open={menuOpen} />
  </button>
)

export default MenuToggle
