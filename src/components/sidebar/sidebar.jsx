import React from 'react'
import { Link } from 'gatsby'

import style from './sidebar.module.css'

const getLinkProps = ({ isCurrent }) => {
  return {
    className: `${style.link} ${isCurrent ? `${style.linkActive}` : ''}`,
  }
}

const Sidebar = ({ menu }) => {
  return <nav>
    {
      menu.map(chapter => {
        return <section className='mb-6' key={chapter.title}>
          <div className={style.chapterTitle}>
            { chapter.title }
          </div>
          {
            chapter.pages.map(page => (
              <Link
                to={page.slug}
                key={page.slug}
                getProps={getLinkProps}
              >{ page.title }</Link>
            ))
          }
        </section>
      })
    }
  </nav>
}

export default Sidebar
