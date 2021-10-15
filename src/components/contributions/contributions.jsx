import React from 'react'
import EditIcon from './edit-icon.svg'

const lastUpdated = '11th Oct 2021'

const Contributions = ({ data }) => {
  return (
    <div className='text-secondary dark:text-secondary-inverted text-base mt-6 border-t-2 border-b-2 border-gray-200 dark:border-gray-800 py-3 flex'>
      <div className='flex-grow'></div>
      <div className='pr-3'>
        <a>
          Last updated <span className='text-nubots-700'>{lastUpdated}</span>
        </a>
      </div>
      <div className='border-l-2 dark:border-gray-800 pl-3'>
        <button className='flex items-center w-full'>
          <EditIcon className='h-5' />
          <span className='pl-1 hidden lg:block text-nubots-700'>Edit</span>
        </button>
      </div>
    </div>
  )
}

export default Contributions
