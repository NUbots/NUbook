import React from 'react'
import PropTypes from 'prop-types'

import MenuIcon from './icon'

const MenuToggle = ({ menuOpen, setMenuOpen }) => (
  <button
    className='w-6 h-6 flex items-center justify-center focus:outline-none'
    onClick={() => setMenuOpen(!menuOpen)}
  >
    <MenuIcon open={menuOpen} />
  </button>
)

MenuToggle.propTypes = {
  menuOpen: PropTypes.bool.isRequired,
  setMenuOpen: PropTypes.func.isRequired,
}

export default MenuToggle
