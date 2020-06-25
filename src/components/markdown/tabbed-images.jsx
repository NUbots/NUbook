import React, { useState } from 'react'
import PropTypes from 'prop-types'

const TabbedImages = ({ children }) => {
  const [currentTab, setCurrentTab] = useState(0)

  return (
    <div>
      <div className='bg-gray-300 flex overflow-x-auto'>
        {children.map((child, index) => {
          return (
            <button
              key={index}
              className={`flex-shrink-0 px-3 py-1 border-r-2 border-white hover:bg-gray-400 focus:bg-gray-400 ${
                index === currentTab
                  ? 'font-bold bg-nubots-200 hover:bg-nubots-200 focus:bg-nubots-200'
                  : ''
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
