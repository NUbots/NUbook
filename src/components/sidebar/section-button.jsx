import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import style from './section-button.module.css'

const getLinkProps = ({ isCurrent }) => {
  return {
    className: style.sectionButtonWrapper,
  }
}

const SectionButton = ({ Icon, children, active, to }) => {
  return (
    <Link to={to} getProps={getLinkProps}>
      <div
        className={`${style.sectionButton} ${
          active ? style.sectionButtonActive : ''
        }`}
      >
        <div className='mr-3'>
          <Icon className='w-7 h-7 fill-current' />
        </div>
        <div className='text-lg font-semibold mr-2 leading-tight'>
          {children}
        </div>
      </div>
    </Link>
  )
}

SectionButton.propTypes = {
  Icon: PropTypes.elementType,
  children: PropTypes.node,
  active: PropTypes.bool,
  onClick: PropTypes.func,
}

SectionButton.defaultProps = {
  active: false,
}

export default SectionButton
