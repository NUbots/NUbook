import React from 'react'
import PropTypes from 'prop-types'

import IconChevronRight from './icon-chevron-right.svg'
import style from './nav-button.module.css'

const NavButton = ({ Icon, children, active }) => {
  return (
    <button className={`${style.button} ${active ? style.buttonActive : ''}`}>
      <div className='mr-3'>
        <Icon className='w-10 h-10 fill-current' />
      </div>
      <div className='text-2xl font-semibold flex-grow mr-2 text-left leading-tight'>
        {children}
      </div>
      <div
        className='-mr-2'
        style={{ transform: `rotate(${active ? '90deg' : '0'})` }}
      >
        <IconChevronRight />
      </div>
    </button>
  )
}

NavButton.propTypes = {
  Icon: PropTypes.elementType,
  children: PropTypes.node,
  active: PropTypes.bool,
}

NavButton.defaultProps = {
  active: false,
}

export default NavButton
