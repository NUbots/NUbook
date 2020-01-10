import React from 'react'

import IconTeam from './icon-team.svg'
import IconSystem from './icon-system.svg'
import IconGuides from './icon-guides.svg'
import IconTriangle from './icon-triangle.svg'
import NavButton from './nav-button'
import NavCard from './nav-card'

import style from './nav-buttons.module.css'

const menuIntroduction = [
  {
    text: 'Introduction',
    href: '#introduction',
  },
  {
    text: 'Areas of Research',
    href: '#areas-of-research',
  },
  {
    text: 'Current Team',
    href: '#current-team',
  },
]

const menuJoining = [
  {
    text: 'How We Work',
    href: '#how-we-work',
  },
  {
    text: 'Apply to Join',
    href: '#apply-to-join',
  },
  {
    text: 'New Member Checklist',
    href: '#new-member-checklist',
  },
]

const menuHistory = [
  {
    text: 'Team History',
    href: '#team-history',
  },
  {
    text: 'Publications',
    href: '#publications',
  },
]

const menuRoboCup = [
  {
    text: 'The RoboCup Competition',
    href: '#the-robocup-competition',
  },
  {
    text: 'Pre-RoboCup Checklists',
    href: '#pre-reobocup-checklists',
  },
  {
    text: 'RoboCup 2019 Debrief',
    href: '#robocup-2019-debrief',
  },
]

const menuCommunity = [
  {
    text: 'Sponsors',
    href: '#sponsors',
  },
  {
    text: 'Connect',
    href: '#connect',
  },
]

const NavButtons = () => {
  return (
    <>
      <div className='max-w-screen-xl mx-auto px-8 mb-8'>
        <div
          className={`mx-auto max-w-xl lg:max-w-4xl xl:max-w-full ${style.navButtonsGrid}`}
        >
          <NavButton Icon={IconTeam} active={true}>
            The NUbots Team
          </NavButton>
          <NavButton Icon={IconSystem}>The NUbots System</NavButton>
          <NavButton Icon={IconGuides}>Contribution Guides</NavButton>
        </div>
      </div>
      <div className='bg-gray-100 relative -mb-px'>
        <IconTriangle
          className={`${style.selectedButtonIndicator} absolute text-gray-100`}
        />
        <div
          className={`${style.navCardsGrid} max-w-screen-xl mx-auto px-8 py-16`}
        >
          <NavCard title='Introduction' links={menuIntroduction} />
          <NavCard title='Joining the Team' links={menuJoining} />
          <NavCard title='History' links={menuHistory} />
          <NavCard title='RoboCup' links={menuRoboCup} />
          <NavCard title='Community' links={menuCommunity} />
        </div>
      </div>
    </>
  )
}

export default NavButtons
