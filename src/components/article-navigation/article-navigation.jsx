import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import ArrowLeftIcon from './arrow-left.svg'
import ArrowRightIcon from './arrow-right.svg'

const ArticleNavigation = ({ next, previous }) =>
  (next || previous) && (
    <div className='mt-12 border-t-2 border-gray-200 dark:border-gray-800 pt-5 flex'>
      {previous && (
        <div className='w-1/2 pr-1 flex'>
          <div>
            <div className='pl-8 text-sm text-secondary dark:text-secondary-inverted'>
              {previous.chapter}
            </div>
            <Link
              to={previous.slug}
              title={previous.description}
              className='inline-flex text-nubots-700 dark:text-nubots-500 font-semibold hover:underline focus:underline'
            >
              <ArrowLeftIcon className='mr-2 text-icon dark:text-icon-inverted flex-shrink-0' />{' '}
              {previous.title}
            </Link>
          </div>
        </div>
      )}
      {next && (
        <div className='w-1/2 pl-1 flex ml-auto'>
          <div className='ml-auto text-right'>
            <div className='pr-8 text-sm text-secondary dark:text-secondary-inverted'>
              {next.chapter}
            </div>
            <Link
              to={next.slug}
              title={next.description}
              className='inline-flex text-nubots-700 dark:text-nubots-500 font-semibold hover:underline focus:underline'
            >
              {next.title}{' '}
              <ArrowRightIcon className='ml-2 text-icon dark:text-icon-inverted flex-shrink-0' />
            </Link>
          </div>
        </div>
      )}
    </div>
  )

ArticleNavigation.propTypes = {
  next: PropTypes.shape({
    chapter: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    slug: PropTypes.string,
  }),
  previous: PropTypes.shape({
    chapter: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    slug: PropTypes.string,
  }),
}

export default ArticleNavigation
