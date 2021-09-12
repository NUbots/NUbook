import React from 'react'
import PropTypes from 'prop-types'

import IconArrowRight from './icons/icon-arrow-right.svg'

const Chapter = ({ title, pages }) => {
  return (
    <div
      className='bg-white dark:bg-gray-900 p-8 rounded'
      style={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}
    >
      <h3 className='text-2xl text-primary dark:text-primary-inverted font-semibold mb-4'>
        {title}
      </h3>
      <div>
        {pages.map((page) => (
          <a
            href={page.slug}
            key={page.slug}
            className='flex py-2 text-lg text-nubots-700 dark:text-nubots-500 hover:underline items-start'
          >
            <IconArrowRight className='mt-px mr-4 text-secondary dark:text-secondary-inverted flex-shrink-0' />{' '}
            {page.title}
          </a>
        ))}
      </div>
    </div>
  )
}

Chapter.propTypes = {
  title: PropTypes.string.isRequired,
  pages: PropTypes.array.isRequired,
}

export default Chapter
