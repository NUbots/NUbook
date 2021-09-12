import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import * as style from './section-button.module.css'

const getLinkProps = () => {
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
          <Icon className='w-6 h-6 fill-current' />
        </div>
        <div className='text-base font-semibold mr-2 leading-tight'>
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
  to: PropTypes.string,
}

SectionButton.defaultProps = {
  active: false,
}

export default SectionButton
