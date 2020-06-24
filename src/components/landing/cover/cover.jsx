import React from 'react'
import PropTypes from 'prop-types'

import style from './cover.module.css'

const Cover = ({ title, children }) => {
  return (
    <div className={style.cover}>
      <div className='max-w-screen-xl mx-auto px-4 relative z-10 pt-16 h-full flex items-end'>
        <div className='absolute left-0 bottom-0 w-full px-6 pb-8 z-10 lg:px-16 lg:pb-12 xl:px-6 xl:pb-20'>
          <div className='text-center md:text-left text-white text-3xl leading-tight xs:text-4xl lg:text-5xl'>
            {title}
          </div>
          <div className='hidden text-white text-xl md:block md:mt-4 md:pr-32 lg:pr-24 lg:text-xl xl:max-w-4xl'>
            {children}
          </div>
        </div>
        <div className={style.coverImage}></div>
      </div>
    </div>
  )
}

Cover.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.elementType,
}

export default Cover
