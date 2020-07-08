import React from 'react'
import { Link } from 'gatsby'

import Links from '../header/links/links'

import style from './footer.module.css'
import NUbotsIcon from './nubots-icon.svg'

const Footer = () => (
  <div className='max-w-screen-xl mx-auto px-8'>
    <div className='pt-12 pb-8 border-t border-gray-200 text-gray-500 text-center flex flex-col lg:flex-row lg:text-left'>
      <div className='mb-8 lg:mb-0 lg:w-1/3'>
        <div>
          Copyright © {new Date().getFullYear()} NUbots -{' '}
          <a
            className='hover:text-gray-800 focus:text-gray-800'
            href='https://creativecommons.org/licenses/by/4.0/'
            target='_blank'
            rel='noopener noreferrer'
            title='View NUbook license'
          >
            CC-BY-4.0
          </a>
        </div>
        <div>
          <a
            className='hover:text-gray-800 focus:text-gray-800'
            href='https://policies.newcastle.edu.au/document/view-current.php?id=204'
            target='_blank'
            rel='noopener noreferrer'
            title='View Code of Conduct'
          >
            Code of Conduct
          </a>
        </div>
      </div>
      <div className='flex justify-center items-center mb-6 order-first lg:mb-0 lg:order-none lg:w-1/3'>
        <Link to='/' className={style.logo}>
          <NUbotsIcon />
        </Link>
      </div>
      <div className='flex justify-center items-center lg:justify-end lg:w-1/3'>
        <Links color='black' />
      </div>
    </div>
    <div className='flex items-center justify-center pb-16'>
      <a
        href='https://www.netlify.com'
        className='opacity-50 hover:opacity-100 focus:opacity-100'
        target='_blank' // eslint-disable-line react/jsx-no-target-blank
        rel='noopener'
      >
        <img
          src='https://www.netlify.com/img/global/badges/netlify-light.svg'
          alt='Deploys by Netlify'
        />
      </a>
    </div>
  </div>
)

export default Footer
