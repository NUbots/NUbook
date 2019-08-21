import React from 'react'
import { Link } from 'gatsby'

import NUbotsIcon from './nubots-icon.svg'
import NUbotsLogo from './nubots-logo.svg'

const Logo = () => (
  <Link to='/'>
    <NUbotsIcon className='w-9 h-9 md:hidden flex-shrink-0' />
    <NUbotsLogo className='h-8 hidden md:block flex-shrink-0' />
  </Link>
)

export default Logo
