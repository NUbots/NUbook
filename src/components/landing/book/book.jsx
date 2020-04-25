import React, { useState } from 'react'
import PropTypes from 'prop-types'

import IconTeam from './icons/icon-team.svg'
import IconSystem from './icons/icon-system.svg'
import IconGuides from './icons/icon-guides.svg'
import Section from './section'
import Chapter from './chapter'

const iconMap = {
  'The NUbots Team': IconTeam,
  'System': IconSystem,
  'Guides': IconGuides,
}

const Book = ({ contents }) => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  if (contents.length === 0) {
    return 'No contents to render'
  }
  return (
    <div>
      <div className='flex overflow-x-auto items-end border-2 border-b-0 border-nubots-500 rounded-t lg:inline-flex'>
        {contents.map((section, i) => {
          return (
            <Section
              Icon={iconMap[section.title]}
              active={currentSectionIndex === i}
              key={section.slug}
              onClick={() => {
                setCurrentSectionIndex(i)
              }}
            >
              {section.title}
            </Section>
          )
        })}
      </div>
      <div className='bg-gray-100 border-2 border-nubots-500 rounded-b lg:rounded-t lg:rounded-tl-none'>
        <div className='p-4 grid gap-4 xxs:p-5 xxs:gap-5 md:p-6 md:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:p-8 xl:gap-8'>
          {contents[currentSectionIndex].chapters.map(chapter => {
            return (
              <Chapter
                title={chapter.title}
                key={chapter.slug}
                pages={chapter.pages}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

Book.propTypes = {
  contents: PropTypes.array.isRequired,
}

export default Book
