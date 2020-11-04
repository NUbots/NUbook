import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import style from './sidebar.module.css'

function elementInView(element, container) {
  const top = element.offsetTop
  const parentTop = container.scrollTop
  const bottom = top + element.offsetHeight
  const parentBottom = container.offsetHeight

  return top >= parentTop && bottom <= parentBottom
}

const getLinkProps = ({ isCurrent }) => {
  return {
    className: `${style.link} ${isCurrent ? `${style.linkActive}` : ''}`,
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
        {menu.map(section => {
          const className = `${style.sectionLink} ${
            section.title === currentSection.title
              ? `${style.sectionLinkActive}`
              : ''
          }`
          return (
            <Link to={section.slug} key={section.slug} className={className}>
              {section.title}
            </Link>
          )
        })}
      </div>

      {currentSection.chapters.map(chapter => {
        return (
          <div className='mb-8' key={chapter.title}>
            <div className={style.chapterTitle}>{chapter.title}</div>
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
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
}

export default Sidebar
