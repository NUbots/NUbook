import React from 'react'

const ArticleHeader = ({ title, description }) => (
  <div className='mb-8'>
    <h1 className='text-3xl md:text-4xl leading-tight font-semibold mb-2'>
      {title}
    </h1>
    <div className='text-secondary text-base'>{description}</div>
  </div>
)

export default ArticleHeader
