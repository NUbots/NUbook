import React, { useState } from 'react'
import PropTypes from 'prop-types'

import IconTeam from './icons/icon-team.svg'
import IconSystem from './icons/icon-system.svg'
import IconGuides from './icons/icon-guides.svg'
import IconTools from './icons/icon-tools.svg'
import Section from './section'
import Chapter from './chapter'

const iconMap = {
  Team: IconTeam,
  System: IconSystem,
  Guides: IconGuides,
  ['Kitchen Sink']: IconTools,
}

const Book = ({ contents }) => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  if (contents.length === 0) {
    return 'No contents to render'
  }
  return (
    <div>
      <div className='flex mb-6 overflow-x-auto md:justify-center'>
        {contents
          .filter((section) => !section.hidden)
          .map((section, i) => {
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
      <div className='bg-gray-100 dark:bg-gray-950 border-2 border-nubots-500 rounded'>
        <div className='p-4 grid gap-4 xxs:p-5 xxs:gap-5 md:p-6 md:gap-6 md:grid-cols-2 lg:grid-cols-3 lg:p-8 xl:p-12 xl:gap-8'>
          {contents[currentSectionIndex].chapters.map((chapter) => {
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
