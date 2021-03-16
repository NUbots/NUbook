import React from 'react'
import PropTypes from 'prop-types'

import LightIcon from './light-icon.svg'
import DarkIcon from './dark-icon.svg'

function setColorScheme(scheme) {
  document.documentElement.classList.remove(
    scheme === 'light' ? 'dark' : 'light'
  )
  document.documentElement.classList.add(scheme)
}

function toggleColorScheme() {
  const isDark = document.documentElement.classList.contains('dark')
  const newScheme = isDark ? 'light' : 'dark'
  setColorScheme(newScheme)
  localStorage.colorScheme = newScheme
}

const ToggleSchemeToggle = ({ color }) => {
  return (
    <button
      className={`inline-block ml-10 ${
        color === 'white'
          ? 'text-icon-inverted hover:text-white focus:text-white'
          : 'text-gray-400 dark:text-gray-600 hover:text-gray-800 focus:text-gray-800 dark:hover:text-gray-300 dark:focus:text-gray-300'
      }`}
      title='Switch color scheme'
      onClick={toggleColorScheme}
    >
      <LightIcon className='hidden dark:inline w-5 h-5' />
      <DarkIcon className='dark:hidden w-5 h-5' />
    </button>
  )
}

ToggleSchemeToggle.propTypes = {
  color: PropTypes.string.isRequired,
}

export default ToggleSchemeToggle
