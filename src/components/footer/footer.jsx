import React from 'react'
import { Link } from 'gatsby'

import Links from '../header/links/links'

import style from './footer.module.css'
import NUbotsIcon from './nubots-icon.svg'

const Footer = () => (
  <div className='max-w-screen-xl mx-auto px-8'>
    <div className='pt-10 pb-16 border-t text-gray-500 text-center flex flex-col lg:flex-row lg:text-left'>
      <div className='mb-6 lg:mb-0 lg:w-1/3'>
        Copyright © {new Date().getFullYear()} NUbots -{' '}
        <a
          className='hover:text-gray-800'
          href='https://github.com/NUbots/NUbook/blob/master/LICENSE'
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
