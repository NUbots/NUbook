import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import SectionButton from './section-button'
import IconTeam from './icons/icon-team.svg'
import IconSystem from './icons/icon-system.svg'
import IconGuides from './icons/icon-guides.svg'
import IconTools from './icons/icon-tools.svg'
import * as style from './sidebar.module.css'

const iconMap = {
  Team: IconTeam,
  System: IconSystem,
  Guides: IconGuides,
  ['Kitchen Sink']: IconTools,
}

function elementInView(element, container) {
  const top = element.offsetTop
  const parentTop = container.scrollTop
  const bottom = top + element.offsetHeight
  const parentBottom = container.offsetHeight

  return top >= parentTop && bottom <= parentBottom
}

const getLinkProps = ({ isCurrent }) => {
  return {
    className: `${
      style.link
    } text-primary-muted dark:text-primary-muted-inverted ${
      isCurrent ? style.linkActive : ''
    }`,
  }
}

const Sidebar = ({ menu, currentSection, wrapperRef }) => {
  const sidebarRef = useRef(null)

  // Scroll to reveal the active link on mount
  useEffect(() => {
    const activeLink = sidebarRef.current.querySelector(`.${style.linkActive}`)

    if (activeLink && !elementInView(activeLink, wrapperRef.current)) {
      activeLink.scrollIntoView({ block: 'center', inline: 'nearest' })
    }
  }, [])

  return (
    <nav ref={sidebarRef}>
      <div className='mb-8'>
        {menu
          // Only show a section if it's currently selected or it's not hidden
          .filter(section => {
            return section.title === currentSection.title || !section.hidden
          })
          .map(section => {
            return (
              <SectionButton
                Icon={iconMap[section.title]}
                active={section.title === currentSection.title}
                key={section.slug}
                to={section.slug}
              >
                {section.title}
              </SectionButton>
            )
          })}
      </div>

      {currentSection.chapters.map(chapter => {
        return (
          <div className='mb-8' key={chapter.title}>
            <div
              className={`${style.chapterTitle} text-hint dark:text-hint-inverted`}
            >
              {chapter.title}
            </div>
            {chapter.pages.map(page => (
              <Link to={page.slug} key={page.slug} getProps={getLinkProps}>
                {page.title}
              </Link>
            ))}
          </div>
        )
      })}
    </nav>
  )
}

Sidebar.propTypes = {
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
    })
  ).isRequired,
  currentSection: PropTypes.shape({
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    chapters: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        pages: PropTypes.arrayOf(
          PropTypes.shape({
            title: PropTypes.string.isRequired,
            slug: PropTypes.string.isRequired,
          })
        ).isRequired,
      })
    ).isRequired,
  }),
  wrapperRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.instanceOf(
        typeof Element === 'undefined' ? Function : Element
      ),
    }),
  ]),
}

export default Sidebar
