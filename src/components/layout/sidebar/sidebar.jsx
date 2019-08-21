import React from 'react'
import { Link } from 'gatsby'

import style from './sidebar.module.css'

const getLinkProps = ({ isCurrent }) => {
  return {
    className: `${style.link} ${isCurrent ? `${style.linkActive} text-primary` : 'text-primary-muted'}`,
  }
}

const Sidebar = ({ menu }) => {
  return <nav>
    {
      multiplyMenu(menu, 2).map(chapter => {
        return <section className='mb-6' key={chapter.title}>
          <h3 className='text-hint text-sm uppercase tracking-wide font-semibold mb-2'>
            { chapter.title }
          </h3>
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

function multiplyMenu(menu, factor) {
  const product = [...menu]

  for (let i = 0; i < factor; i++) {
    menu.forEach(chapter => {
      product.push({
        title: `${chapter.title} ${i + 1}`,
        pages: chapter.pages.map(page => {
          return Object.assign({}, page, {
            title: `${page.title} ${i + 1}`
          })
        })
      })
    })
  }

  return product
}
