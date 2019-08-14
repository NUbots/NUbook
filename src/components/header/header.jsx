import React from 'react'
import PropTypes from 'prop-types'

import MenuIcon from './menu-icon.svg'
import NUbotsIcon from './nubots-icon.svg'
import SearchIcon from './search-icon.svg'

const Header = ({ siteTitle }) => (
  <>
    <div className='w-full bg-gray-900 fixed z-20'>
      <div className='container h-16 flex items-center'>
        <NUbotsIcon className='w-9 h-9 md:w-10 md:h-10 flex-shrink-0' />
        <div className='px-6 flex-grow'>
          <div className='relative'>
            <input
              type='text'
              placeholder='Search handbook...'
              className='h-10 w-full pl-14 pr-4 rounded appearance-none text-base md:text-lg bg-gray-800 placeholder-gray-500 text-white focus:bg-white focus:text-primary'
            />
            <SearchIcon className='absolute top-0 left-0 w-6 h-6 ml-4 mt-2 text-icon-inverted pointer-events-none' />
          </div>
        </div>
        <div className='h-6'>
          <button>
            <MenuIcon className='text-icon-inverted' />
          </button>
        </div>
      </div>
    </div>

    {/*<nav className='container min-h-screen pt-24 pb-6 absolute z-10' style={{backgroundColor: 'rgba(36,41,46,0.85)', backdropFilter: 'blur(20px)' }}>
      <section className='mb-6'>
        <h3 className='text-hint-inverted text-sm uppercase tracking-wide font-semibold mb-1'>Introduction</h3>
        <a className='block py-2 font-semibold text-nubots' href='#none'>Introduction to NUbots</a>
        <a className='block py-2 font-semibold text-primary-inverted' href='#none'>Areas of Research</a>
      </section>

      <section className='mb-6'>
        <h3 className='text-hint-inverted text-sm uppercase tracking-wide font-semibold mb-1'>Joining NUbots</h3>
        <a className='block py-2 font-semibold text-primary-inverted' href='#none'>How to Join NUbots</a>
      </section>

      <section className='mb-6'>
        <h3 className='text-hint-inverted text-sm uppercase tracking-wide font-semibold mb-1'>Team History</h3>
        <a className='block py-2 font-semibold text-primary-inverted' href='#none'>RoboCup</a>
        <a className='block py-2 font-semibold text-primary-inverted' href='#none'>NUbots History</a>
        <a className='block py-2 font-semibold text-primary-inverted' href='#none'>Current Team</a>
      </section>

      <section className='mb-6'>
        <h3 className='text-hint-inverted text-sm uppercase tracking-wide font-semibold mb-1'>System</h3>
        <a className='block py-2 font-semibold text-primary-inverted' href='#none'>Software Overview</a>
        <a className='block py-2 font-semibold text-primary-inverted' href='#none'>Hardware Overview</a>
      </section>

      <section className='mb-6'>
        <h3 className='text-hint-inverted text-sm uppercase tracking-wide font-semibold mb-1'>Team History</h3>
        <a className='block py-2 font-semibold text-primary-inverted' href='#none'>RoboCup</a>
        <a className='block py-2 font-semibold text-primary-inverted' href='#none'>NUbots History</a>
        <a className='block py-2 font-semibold text-primary-inverted' href='#none'>Current Team</a>
      </section>

      <section className='mb-6'>
        <h3 className='text-hint-inverted text-sm uppercase tracking-wide font-semibold mb-1'>Team History</h3>
        <a className='block py-2 font-semibold text-primary-inverted' href='#none'>RoboCup</a>
        <a className='block py-2 font-semibold text-primary-inverted' href='#none'>NUbots History</a>
        <a className='block py-2 font-semibold text-primary-inverted' href='#none'>Current Team</a>
      </section>

      <section className='mb-6'>
        <h3 className='text-hint-inverted text-sm uppercase tracking-wide font-semibold mb-1'>Team History</h3>
        <a className='block py-2 font-semibold text-primary-inverted' href='#none'>RoboCup</a>
        <a className='block py-2 font-semibold text-primary-inverted' href='#none'>NUbots History</a>
        <a className='block py-2 font-semibold text-primary-inverted' href='#none'>Current Team</a>
      </section>

      <section className='mb-6'>
        <h3 className='text-hint-inverted text-sm uppercase tracking-wide font-semibold mb-1'>Team History</h3>
        <a className='block py-2 font-semibold text-primary-inverted' href='#none'>RoboCup</a>
        <a className='block py-2 font-semibold text-primary-inverted' href='#none'>NUbots History</a>
        <a className='block py-2 font-semibold text-primary-inverted' href='#none'>Current Team</a>
      </section>
    </nav>*/}
  </>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: '',
}

export default Header
