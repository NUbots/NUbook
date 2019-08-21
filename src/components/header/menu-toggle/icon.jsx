import React from 'react'

import style from './icon.module.css'

const MenuIcon = ({ open }) => {
  return (
    <div
      className={`${style.icon} ${open ? style.iconOpen : style.iconClosed}`}
    >
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

export default MenuIcon
