import React from 'react'
import PropTypes from 'prop-types'

import * as style from './section.module.css'

const Section = ({ Icon, children, active, onClick }) => {
  return (
    <button
      className={`${style.sectionButton} ${
        active ? style.sectionButtonActive : ''
      }`}
      onClick={onClick}
    >
      <div className='mr-3'>
        <Icon className='w-8 h-8 fill-current' />
      </div>
      <div className='text-xl font-semibold mr-2 leading-tight'>{children}</div>
    </button>
  )
}

Section.propTypes = {
  Icon: PropTypes.elementType,
  children: PropTypes.node,
  active: PropTypes.bool,
  onClick: PropTypes.func,
}

Section.defaultProps = {
  active: false,
}

export default Section
