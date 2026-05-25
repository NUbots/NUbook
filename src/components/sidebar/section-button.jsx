import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import * as style from './section-button.module.css'

const getLinkProps = () => {
  return {
    className: style.sectionButtonWrapper,
  }
}

const SectionButton = ({ Icon, iconSvg, children, active, to }) => {
  return (
    <Link to={to} getProps={getLinkProps}>
      <div
        className={`${style.sectionButton} ${
          active ? style.sectionButtonActive : ''
        }`}
      >
        {(Icon || iconSvg) && (
          <div className='mr-3 w-6 h-6 flex-shrink-0'>
            {Icon ? (
              <Icon className='w-6 h-6 fill-current' />
            ) : (
              <span
                className='block w-6 h-6'
                dangerouslySetInnerHTML={{ __html: iconSvg }}
              />
            )}
          </div>
        )}
        <div className='text-base font-semibold mr-2 leading-tight'>
          {children}
        </div>
      </div>
    </Link>
  )
}

SectionButton.propTypes = {
  Icon: PropTypes.elementType,
  iconSvg: PropTypes.string,
  children: PropTypes.node,
  active: PropTypes.bool,
  to: PropTypes.string,
}

SectionButton.defaultProps = {
  active: false,
}

export default SectionButton
