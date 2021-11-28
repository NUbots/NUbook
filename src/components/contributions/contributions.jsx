import React from 'react'
import PropTypes from 'prop-types'
import EditIcon from './edit-icon.svg'

const Contributions = ({ data }) => {
  const commit = data.github.repository.object.history.nodes[0]
  const file = data.github.repository.object.file
  const lastUpdated = new Date(commit.author.date).toLocaleString('en-AU', {
    dateStyle: 'long',
  })
  const editLink = `https://github.com/NUbots/NUbook/edit/main/${file.path}`
  return (
    <div className='text-sm text-secondary dark:text-secondary-inverted mb-6 border-t-2 border-b-2 border-gray-200 dark:border-gray-800 py-3 flex'>
      <div className='flex-grow'></div>
      <div className='pr-3 capitalize'>
        <span className='hidden lg:inline'>Last</span> updated{' '}
        <a
          href={commit.url}
          target='_blank'
          className='lg:normal-case'
          rel='noreferrer'
        >
          <span className='text-nubots-700 dark:text-nubots-500'>
            {lastUpdated}
          </span>
        </a>
      </div>
      <div className='border-l-2 dark:border-gray-800 pl-3'>
        <a href={editLink} className='flex items-center w-full'>
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
  data: PropTypes.shape({
    github: PropTypes.shape({
      repository: PropTypes.shape({
        object: PropTypes.shape({
          history: PropTypes.shape({
            nodes: PropTypes.arrayOf({
              author: PropTypes.shape({
                date: PropTypes.string,
              }),
              url: PropTypes.string,
            }),
          }),
          file: PropTypes.shape({
            path: PropTypes.string,
          }),
        }),
      }),
    }),
  }),
}

export default Contributions
