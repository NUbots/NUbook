import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Contributions from './contributions/contributions'

const ArticleHeader = ({ section, chapter, title, description }) => (
  <div className='mb-8 article-header'>
    {(chapter || section) && (
      <div>
        {section && (
          <>
            <Link
              to={section.slug}
              className='text-secondary dark:text-secondary-inverted hover:text-nubots-700 dark:hover:text-nubots-500 focus:text-nubots-700 dark:focus:text-nubots-500 current-section'
            >
              {section.title}
            </Link>
            <span className='text-secondary dark:text-secondary-inverted px-2'>
              ›
            </span>
          </>
        )}
        {chapter && (
          <>
            <Link
              to={chapter.slug}
              className='text-secondary dark:text-secondary-inverted hover:text-nubots-700 dark:hover:text-nubots-500 focus:text-nubots-700 dark:focus:text-nubots-500 current-chapter'
            >
              {chapter.title}
            </Link>
            <span className='text-secondary dark:text-secondary-inverted px-2'>
              ›
            </span>
          </>
        )}
      </div>
    )}
    <h1 className='text-3xl md:text-4xl leading-tight font-semibold mb-2'>
      {title}
    </h1>
    <div className='text-secondary dark:text-secondary-inverted text-base'>
      {description}
    </div>
    <Contributions />
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
