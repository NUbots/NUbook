import React from 'react'
import PropTypes from 'prop-types'

const ArticleHeader = ({ title, description }) => (
  <div className='mb-8'>
    <h1 className='text-3xl md:text-4xl leading-tight font-semibold mb-2'>
      {title}
    </h1>
    <div className='text-secondary text-base'>{description}</div>
  </div>
)

ArticleHeader.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

export default ArticleHeader
