import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import NUbotsIcon from './nubots-icon.svg'
import SearchIcon from './search-icon.svg'
import MenuIcon from './menu-icon.svg'

const Header = ({ siteTitle }) => (
  <>
    <div className='bg-gray-900 fixed z-10'>
      <div className='container h-16 flex items-center'>
        <NUbotsIcon className='w-10 h-10' />
        <div className='px-6 flex-grow'>
          <div className='relative'>
            <input
              type="text"
              placeholder="Search handbook..."
              className="h-10 w-full pl-14 pr-4 rounded appearance-none text-lg bg-gray-800 placeholder-gray-500 text-white focus:bg-white focus:text-primary"
            />
            <SearchIcon className='absolute top-0 left-0 w-6 h-6 ml-4 mt-2 text-icon-inverted pointer-events-none' />
          </div>
        </div>
        <div className='h-6'>
          <button>
            <MenuIcon className="text-icon-inverted" />
          </button>
        </div>
      </div>
    </div>

    <nav className='container min-h-screen pt-24 pb-6 absolute' style={{backgroundColor: 'rgba(36,41,46,0.85)', backdropFilter: 'blur(20px)' }}>
      <section className='mb-6'>
        <h3 className="text-hint-inverted text-sm uppercase tracking-wide font-semibold mb-1">Introduction</h3>
        <a className='block py-2 font-semibold text-nubots' href="#">Introduction to NUbots</a>
        <a className='block py-2 font-semibold text-primary-inverted' href="#">Areas of Research</a>
      </section>

      <section className='mb-6'>
        <h3 className="text-hint-inverted text-sm uppercase tracking-wide font-semibold mb-1">Joining NUbots</h3>
        <a className='block py-2 font-semibold text-primary-inverted' href="#">How to Join NUbots</a>
      </section>

      <section className='mb-6'>
        <h3 className="text-hint-inverted text-sm uppercase tracking-wide font-semibold mb-1">Team History</h3>
        <a className='block py-2 font-semibold text-primary-inverted' href="#">RoboCup</a>
        <a className='block py-2 font-semibold text-primary-inverted' href="#">NUbots History</a>
        <a className='block py-2 font-semibold text-primary-inverted' href="#">Current Team</a>
      </section>

      <section className='mb-6'>
        <h3 className="text-hint-inverted text-sm uppercase tracking-wide font-semibold mb-1">System</h3>
        <a className='block py-2 font-semibold text-primary-inverted' href="#">Software Overview</a>
        <a className='block py-2 font-semibold text-primary-inverted' href="#">Hardware Overview</a>
      </section>

      <section className='mb-6'>
        <h3 className="text-hint-inverted text-sm uppercase tracking-wide font-semibold mb-1">Team History</h3>
        <a className='block py-2 font-semibold text-primary-inverted' href="#">RoboCup</a>
        <a className='block py-2 font-semibold text-primary-inverted' href="#">NUbots History</a>
        <a className='block py-2 font-semibold text-primary-inverted' href="#">Current Team</a>
      </section>

      <section className='mb-6'>
        <h3 className="text-hint-inverted text-sm uppercase tracking-wide font-semibold mb-1">Team History</h3>
        <a className='block py-2 font-semibold text-primary-inverted' href="#">RoboCup</a>
        <a className='block py-2 font-semibold text-primary-inverted' href="#">NUbots History</a>
        <a className='block py-2 font-semibold text-primary-inverted' href="#">Current Team</a>
      </section>

      <section className='mb-6'>
        <h3 className="text-hint-inverted text-sm uppercase tracking-wide font-semibold mb-1">Team History</h3>
        <a className='block py-2 font-semibold text-primary-inverted' href="#">RoboCup</a>
        <a className='block py-2 font-semibold text-primary-inverted' href="#">NUbots History</a>
        <a className='block py-2 font-semibold text-primary-inverted' href="#">Current Team</a>
      </section>

      <section className='mb-6'>
        <h3 className="text-hint-inverted text-sm uppercase tracking-wide font-semibold mb-1">Team History</h3>
        <a className='block py-2 font-semibold text-primary-inverted' href="#">RoboCup</a>
        <a className='block py-2 font-semibold text-primary-inverted' href="#">NUbots History</a>
        <a className='block py-2 font-semibold text-primary-inverted' href="#">Current Team</a>
      </section>
    </nav>
  </>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: '',
}

export default Header
