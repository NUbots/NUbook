import React, { useState } from 'react'
import PropTypes from 'prop-types'

import * as style from './tabbed-images.module.css'

const TabbedImages = ({ children }) => {
  const [currentTab, setCurrentTab] = useState(0)

  return (
    <div className={style.tabbedImages}>
      <div className='bg-gray-300 dark:bg-gray-800 flex overflow-x-auto rounded-t-sm'>
        {children.map((child, index) => {
          return (
            <button
              key={index}
              className={`flex-shrink-0 px-3 py-1 border-r-2 border-white dark:border-gray-900 ${
                index === currentTab
                  ? 'font-bold bg-gray-100 hover:bg-gray-100 focus:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-900 dark:focus:bg-gray-900 dark:text-nubots-500'
                  : 'hover:bg-gray-400 focus:bg-gray-400 dark:hover:bg-gray-700 dark:focus:bg-gray-700'
              }`}
              onClick={() => {
                setCurrentTab(index)
              }}
            >
              {child.props.title}
            </button>
          )
        })}
      </div>
      <div>
        {children.map((child, index) => {
          return (
            <div
              key={index}
              style={{ display: currentTab === index ? 'block' : 'none' }}
            >
              {child}
            </div>
          )
        })}
      </div>
    </div>
  )
}

TabbedImages.propTypes = {
  children: PropTypes.node.isRequired,
}

export default TabbedImages
