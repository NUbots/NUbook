import React from 'react'
import PropTypes from 'prop-types'

import style from './promo-card.module.css'

const PromoCard = ({ Icon, title, children }) => {
  return (
    <div className={style.card}>
      <div className={style.cardIcon}>
        <Icon />
      </div>
      <div className='text-2xl mb-6'>{title}</div>
      <div>{children}</div>
    </div>
  )
}

PromoCard.propTypes = {
  Icon: PropTypes.elementType,
  title: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
}

export default PromoCard
