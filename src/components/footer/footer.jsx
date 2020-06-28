import React from 'react'
import { Link } from 'gatsby'

import Links from '../header/links/links'

import style from './footer.module.css'
import NUbotsIcon from './nubots-icon.svg'

const Footer = () => (
  <div className='max-w-screen-xl mx-auto px-8'>
    <div className='pt-12 pb-16 border-t border-gray-200 text-gray-500 text-center flex flex-col lg:flex-row lg:text-left'>
      <div className='mb-6 lg:mb-0 lg:w-1/3'>
        <a href='https://www.netlify.com'>
          <img
            className='opacity-50 hover:opacity-100 pb-6'
            src='https://www.netlify.com/img/global/badges/netlify-dark.svg'
            alt='Deploys by Netlify'
            title='Netlify'
          />
        </a>
        Copyright © {new Date().getFullYear()} NUbots -{' '}
        <a
          className='hover:text-gray-800'
          href='https://creativecommons.org/licenses/by/4.0/'
          target='_blank'
          rel='noopener noreferrer'
          title='View NUbook license'
        >
          CC-BY-4.0
        </a>
      </div>
      <div className='flex justify-center mb-6 order-first lg:mb-0 lg:order-none lg:w-1/3'>
        <Link to='/'>
          <NUbotsIcon className={style.logo} />
        </Link>
      </div>
      <div className='flex justify-center lg:justify-end lg:w-1/3'>
        <Links color='black' />
      </div>
    </div>
  </div>
)

export default Footer
