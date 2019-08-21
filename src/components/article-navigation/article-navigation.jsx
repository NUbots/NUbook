import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import ArrowLeftIcon from './arrow-left.svg'
import ArrowRightIcon from './arrow-right.svg'

const ArticleNavigation = ({ next, previous }) =>
  (next || previous) && (
    <div className='mt-12 border-t-2 border-gray-200 pt-5 flex'>
      {previous && (
        <div className='w-1/2 pr-1 flex'>
          <Link
            to={previous.slug}
            title={previous.description}
            className='inline-flex text-nubots-700 font-semibold hover:underline focus:underline'
          >
            <ArrowLeftIcon className='mr-2 text-icon flex-shrink-0' />{' '}
            {previous.title}
          </Link>
        </div>
      )}
      {next && (
        <div className='w-1/2 pl-1 flex ml-auto'>
          <Link
            to={next.slug}
            title={next.description}
            className='inline-flex ml-auto text-right text-nubots-700 font-semibold hover:underline focus:underline'
          >
            {next.title}{' '}
            <ArrowRightIcon className='ml-2 text-icon flex-shrink-0' />
          </Link>
        </div>
      )}
    </div>
  )

ArticleNavigation.propTypes = {
  next: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    slug: PropTypes.string,
  }),
  previous: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    slug: PropTypes.string,
  }),
}

export default ArticleNavigation
