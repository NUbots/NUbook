import React from 'react'

import style from './menu-icon.module.css'

const MenuIcon = ({ menuOpen }) => {
  return <div className={`${style.icon} relative`}>
    <span className={`${style.bar} ${style.topBar}`}></span>
    <span className={`${style.bar} ${style.middleBar}`}></span>
    <span className={`${style.bar} ${style.bottomBar}`}></span>
  </div>
}

export default MenuIcon
