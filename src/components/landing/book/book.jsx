import React from 'react'

import IconTeam from './icons/icon-team.svg'
import IconSystem from './icons/icon-system.svg'
import IconGuides from './icons/icon-guides.svg'
import Section from './section'
import Chapter from './chapter'

const chapterIntroduction = [
  {
    title: 'Introduction',
    url: '#introduction',
  },
  {
    title: 'Areas of Research',
    url: '#areas-of-research',
  },
  {
    title: 'Current Team',
    url: '#current-team',
  },
]

const chapterJoining = [
  {
    title: 'How We Work',
    url: '#how-we-work',
  },
  {
    title: 'Apply to Join',
    url: '#apply-to-join',
  },
  {
    title: 'New Member Checklist',
    url: '#new-member-checklist',
  },
]

const chapterHistory = [
  {
    title: 'Team History',
    url: '#team-history',
  },
  {
    title: 'Publications',
    url: '#publications',
  },
]

const chapterRoboCup = [
  {
    title: 'The RoboCup Competition',
    url: '#the-robocup-competition',
  },
  {
    title: 'Pre-RoboCup Checklists',
    url: '#pre-reobocup-checklists',
  },
  {
    title: 'RoboCup 2019 Debrief',
    url: '#robocup-2019-debrief',
  },
]

const chapterCommunity = [
  {
    title: 'Sponsors',
    url: '#sponsors',
  },
  {
    title: 'Connect',
    url: '#connect',
  },
]

const Book = () => {
  return (
    <div>
      <div className='flex overflow-x-auto items-end border-2 border-b-0 border-nubots-500 rounded-t lg:inline-flex'>
        <Section Icon={IconTeam} active={true}>
          The NUbots Team
        </Section>
        <Section Icon={IconSystem}>The NUbots System</Section>
        <Section Icon={IconGuides}>Contribution Guides</Section>
      </div>
      <div className='bg-gray-100 border-2 border-nubots-500 rounded-b lg:rounded-t lg:rounded-tl-none'>
        <div className='p-4 grid gap-4 xxs:p-5 xxs:gap-5 md:p-6 md:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:p-8 xl:gap-8'>
          <Chapter title='Introduction' pages={chapterIntroduction} />
          <Chapter title='Joining the Team' pages={chapterJoining} />
          <Chapter title='History' pages={chapterHistory} />
          <Chapter title='RoboCup' pages={chapterRoboCup} />
          <Chapter title='Community' pages={chapterCommunity} />
        </div>
      </div>
    </div>
  )
}

export default Book
