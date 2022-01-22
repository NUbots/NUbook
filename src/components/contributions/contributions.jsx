import React from 'react'
import PropTypes from 'prop-types'
import EditIcon from './edit-icon.svg'

import NUbotsIcon from '../../images/nubots-icon.svg'

const Contributions = ({ mdxPath, contributions }) => {
  const { authors, lastCommit } = contributions

  return (
    <div className='text-xs text-secondary dark:text-secondary-inverted mb-6 border-t border-b border-gray-200 dark:border-gray-800 py-2 flex items-center'>
      <div className='flex-grow flex gap-x-1 flex-wrap'>
        {authors.map((author) => {
          return author.username ? (
            <a
              key={author.username ?? author.name}
              href={`https://github.com/${author.username}`}
              title={author.name}
            >
              <img
                className='h-7 w-7 rounded-full'
                src={`https://avatars.githubusercontent.com/${author.username}`}
                alt={`${author.name} GitHub avatar`}
              />
            </a>
          ) : (
            <span className='inline-flex' title={author.name}>
              <NUbotsIcon className='w-7 h-7 inline-flex' />
            </span>
          )
        })}
      </div>
      {lastCommit && (
        <div className='pr-3 inline-block whitespace-nowrap ml-1'>
          <span className='md:hidden'>Updated </span>
          <span className='hidden md:inline'>Last updated </span>
          <a
            href={`https://github.com/NUbots/NUbook/commit/${lastCommit.hash}`}
            target='_blank'
            rel='noreferrer'
          >
            <span className='text-nubots-700 dark:text-nubots-500'>
              {new Date(lastCommit.date).toLocaleString('en-AU', {
                dateStyle: 'medium',
              })}
            </span>
          </a>
        </div>
      )}
      <div className='border-l-2 dark:border-gray-800 pl-3'>
        <a
          href={`https://github.com/NUbots/NUbook/edit/main/${mdxPath}`}
          className='flex items-center w-full'
        >
          <EditIcon className='h-5' />
          <span className='pl-1 hidden lg:block text-nubots-700 dark:text-nubots-500'>
            Edit
          </span>
        </a>
      </div>
    </div>
  )
}

Contributions.propTypes = {
  mdxPath: PropTypes.string.isRequired,
  contributions: PropTypes.shape({
    authors: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        username: PropTypes.string,
      })
    ).isRequired,
    lastCommit: PropTypes.shape({
      date: PropTypes.string.isRequired,
      hash: PropTypes.string.isRequired,
    }),
  }),
}

export default Contributions
