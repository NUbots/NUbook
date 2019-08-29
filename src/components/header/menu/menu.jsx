import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { CSSTransition } from 'react-transition-group'
import { Link } from 'gatsby'

import style from './menu.module.css'

const getLinkProps = ({ isCurrent }) => {
  return {
    className: `${style.link} ${isCurrent ? style.linkActive : ''}`,
  }
}

const Menu = ({ menu, currentSection, open }) => {
  return (
    <>
      <Helmet>
        <body className={open ? 'overflow-y-hidden' : ''} />
      </Helmet>
      <CSSTransition
        in={open}
        timeout={300}
        enter={true}
        exit={true}
        onEnter={onEnter}
        onEntering={onEntering}
        onEntered={onEntered}
        onExit={onExit}
        onExiting={onExiting}
        unmountOnExit
      >
        <div className={style.wrapper}>
          <nav className={style.menu}>
            <div className='mb-8'>
              {menu.map(section => {
                const className = `${style.sectionLink} ${
                  section.title === currentSection.title
                    ? `${style.sectionLinkActive}`
                    : ''
                }`
                return (
                  <Link
                    to={section.slug}
                    key={section.slug}
                    className={className}
                  >
                    {section.title}
                  </Link>
                )
              })}
            </div>

            {currentSection.chapters.map(chapter => {
              return (
                <section className='mb-6' key={chapter.title}>
                  <h3 className={style.chapterTitle}>{chapter.title}</h3>
                  {chapter.pages.map(page => (
                    <Link
                      to={page.slug}
                      key={page.slug}
                      getProps={getLinkProps}
                    >
                      {page.title}
                    </Link>
                  ))}
                </section>
              )
            })}
          </nav>
        </div>
      </CSSTransition>
    </>
  )
}

Menu.propTypes = {
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
  open: PropTypes.bool.isRequired,
}

export default Menu

function onEnter(node) {
  // Initialize max-height to a numeric value for the enter transition
  node.style.maxHeight = '0'
}

function onEntering(node) {
  // Enter to the element's natural scroll height
  node.style.maxHeight = node.scrollHeight + 'px'
}

function onEntered(node) {
  // Enter transition done: remove max-height to allow the element to grow
  node.style.maxHeight = 'none'
}

function onExit(node) {
  // Restore max-height for the exit transition
  node.style.maxHeight = node.scrollHeight + 'px'
}

function onExiting(node) {
  // Exit to a max-height of 0
  node.style.maxHeight = '0'
}
