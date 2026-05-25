import React from 'react'
import PropTypes from 'prop-types'

import * as style from './section.module.css'

const Section = ({ Icon, iconSvg, children, active, onClick }) => {
  return (
    <button
      className={`${style.sectionButton} ${
        active ? style.sectionButtonActive : ''
      }`}
      onClick={onClick}
    >
      {(Icon || iconSvg) && (
        <div className='mr-3 w-8 h-8 flex-shrink-0'>
          {Icon ? (
            <Icon className='w-8 h-8 fill-current' />
          ) : (
            <span
              className='block w-8 h-8'
              dangerouslySetInnerHTML={{ __html: iconSvg }}
            />
          )}
        </div>
      )}
      <div className='text-xl font-semibold mr-2 leading-tight'>{children}</div>
    </button>
  )
}

Section.propTypes = {
  Icon: PropTypes.elementType,
  iconSvg: PropTypes.string,
  children: PropTypes.node,
  active: PropTypes.bool,
  onClick: PropTypes.func,
}

Section.defaultProps = {
  active: false,
}

export default Section
