import React from 'react'
import PropTypes from 'prop-types'

const PromoCard = ({ Icon, title, children }) => {
  return (
    <div className='px-6 py-5 flex flex-col xxs:px-4 xxs:flex-row bg-well rounded-lg shadow-lg'>
      <Icon className='w-10 h-10 mb-2 text-nubots-500 flex-shrink-0 xxs:mr-4 xxs:w-12 xxs:h-12' />
      <div>
        <div className='text-xl font-semibold text-white mb-1'>{title}</div>
        <div className='text-secondary-inverted'>{children}</div>
      </div>
    </div>
  )
}

PromoCard.propTypes = {
  Icon: PropTypes.elementType,
  title: PropTypes.string.isRequired,
  children: PropTypes.elementType.isRequired,
}

export default PromoCard
