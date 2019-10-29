import React from 'react'
import PropTypes from 'prop-types'

import InfoIcon from './info-icon.svg'
import style from './alert.module.css'
import WarningIcon from './warning-icon.svg'

const Alert = ({ children, type, hideIcon }) => {
  return (
    <div
      className={`${style.alert} ${
        type == 'info' ? style.alertInfo : style.alertWarning
      }`}
    >
      {!hideIcon && (
        <div className={style.alertIcon}>
          {type == 'info' ? <InfoIcon /> : <WarningIcon />}
        </div>
      )}
      <div data-alert className={style.alertContent}>
        {children}
      </div>
    </div>
  )
}

Alert.propTypes = {
  type: PropTypes.string,
  hideIcon: PropTypes.bool,
  children: PropTypes.node,
}

Alert.defaultProps = {
  type: 'info',
  hideIcon: false,
}

export default Alert
