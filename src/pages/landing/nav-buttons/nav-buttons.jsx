import React from 'react'

import IconTeam from './icon-team.svg'
import IconSystem from './icon-system.svg'
import IconProjects from './icon-projects.svg'
import IconGuides from './icon-guides.svg'
import NavButton from './nav-button'

import style from './nav-buttons.module.css'

const NavButtons = () => {
  return (
    <div className='max-w-screen-xl mx-auto px-8 mb-32'>
      <div
        className={`mx-auto max-w-xl lg:max-w-4xl xl:max-w-full ${style.navButtonsGrid}`}
      >
        <NavButton Icon={IconTeam}>The NUbots Team</NavButton>
        <NavButton Icon={IconSystem}>The NUbots System</NavButton>
        <NavButton Icon={IconProjects}>Current Projects</NavButton>
        <NavButton Icon={IconGuides}>Contribution Guides</NavButton>
      </div>
    </div>
  )
}

export default NavButtons
