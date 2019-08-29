import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

const ArticleHeader = ({ section, chapter, title, description }) => (
  <div className='mb-8'>
    <div>
      <Link to={section.slug} className='text-secondary hover:text-nubots-700'>
        {section.title}
      </Link>
      <span className='text-secondary px-2'>›</span>
      <Link to={chapter.slug} className='text-secondary hover:text-nubots-700'>
        {chapter.title}
      </Link>
      <span className='text-secondary px-2'>›</span>
    </div>
    <h1 className='text-3xl md:text-4xl leading-tight font-semibold mb-2'>
      {title}
    </h1>
    <div className='text-secondary text-base'>{description}</div>
  </div>
)

ArticleHeader.propTypes = {
  section: PropTypes.shape({
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  }),
  chapter: PropTypes.shape({
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  }),
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

export default ArticleHeader
