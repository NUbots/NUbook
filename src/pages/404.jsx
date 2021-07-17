import React from 'react'
import { Link } from 'gatsby'
import error from '../images/error404.gif'

import SEO from '../components/seo'

const NotFoundPage = () => (
  <div className='h-screen w-screen flex items-center justify-center bg-gray-900 p-6'>
    <SEO title='404: Not found' />
    <div className='text-center p-8 bg-white dark:bg-gray-800 rounded'>
      <h1 className='font-semibold text-2xl mb-4'>Page not found</h1>
      <p className='mb-4'>
        The page you are looking for was not found in NUbook 😢
        <img src={error} alt='Page Not Found' />
      </p>
      <Link
        to='/'
        className='text-nubots-700 dark:text-nubots-500 hover:underline focus:underline'
      >
        Go home
      </Link>
    </div>
  </div>
)

export default NotFoundPage
