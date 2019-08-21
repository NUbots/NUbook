import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import style from './sidebar.module.css'

const getLinkProps = ({ isCurrent }) => {
  return {
    className: `${style.link} ${isCurrent ? `${style.linkActive}` : ''}`,
  }
}

const Sidebar = ({ menu }) => {
  return (
    <nav>
      {menu.map(chapter => {
        return (
          <section className='mb-6' key={chapter.title}>
            <div className={style.chapterTitle}>{chapter.title}</div>
            {chapter.pages.map(page => (
              <Link to={page.slug} key={page.slug} getProps={getLinkProps}>
                {page.title}
              </Link>
            ))}
          </section>
        )
      })}
    </nav>
  )
}

Sidebar.propTypes = {
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      pages: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired,
          slug: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
}

export default Sidebar
