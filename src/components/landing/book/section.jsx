import React from 'react'
import PropTypes from 'prop-types'

import style from './section.module.css'

const Section = ({ Icon, children, active }) => {
  return (
    <button
      className={`${style.sectionButton} ${
        active ? style.sectionButtonActive : ''
      }`}
    >
      <div className='mr-3'>
        <Icon className='w-8 h-8 fill-current' />
      </div>
      <div className='text-xl font-semibold flex-grow mr-2 text-left leading-tight'>
        {children}
      </div>
    </button>
  )
}

Section.propTypes = {
  Icon: PropTypes.elementType,
  children: PropTypes.node,
  active: PropTypes.bool,
}

Section.defaultProps = {
  active: false,
}

export default Section
