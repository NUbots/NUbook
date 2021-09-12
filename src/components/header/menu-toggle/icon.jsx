import React from 'react'
import PropTypes from 'prop-types'

import * as style from './icon.module.css'

const MenuIcon = ({ open }) => {
  return (
    <div className={`${style.icon} ${open ? style.iconOpen : ''}`}>
      <span className={`bg-icon-inverted ${style.bar} ${style.topBar}`}></span>
      <span
        className={`bg-icon-inverted ${style.bar} ${style.middleBar}`}
      ></span>
      <span
        className={`bg-icon-inverted ${style.bar} ${style.bottomBar}`}
      ></span>
    </div>
  )
}

MenuIcon.propTypes = {
  open: PropTypes.bool.isRequired,
}

export default MenuIcon
