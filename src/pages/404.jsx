import React from 'react'
import { Link } from 'gatsby'

import SEO from '../components/seo'

const NotFoundPage = () => (
  <div className='h-screen w-screen flex items-center justify-center bg-gray-900 p-6'>
    <SEO title="404: Not found" />
    <div className='text-center p-8 bg-white rounded'>
      <h1 className='font-semibold text-2xl mb-4'>Page not found</h1>
      <p className='mb-4'>You just hit a route that doesn&#39;t exist... the sadness.</p>
      <Link to='/' className='text-blue-700 hover:underline focus:underline'>Go home</Link>
    </div>
  </div>
)

export default NotFoundPage
