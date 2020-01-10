import React from 'react'
import PropTypes from 'prop-types'

import IconArrowRight from './icon-arrow-right.svg'
import style from './nav-card.module.css'

const NavCard = ({ title, links }) => {
  return (
    <div className={`${style.card} bg-white p-8 rounded`}>
      <h3 className='text-2xl text-primary font-semibold mb-6'>{title}</h3>
      <div>
        {links.map(link => (
          <a
            href={link.href}
            key={link.href}
            className='flex py-2 text-lg text-nubots-700 hover:underline items-center'
          >
            <IconArrowRight className='mr-4 text-secondary' /> {link.text}
          </a>
        ))}
      </div>
    </div>
  )
}

NavCard.propTypes = {
  title: PropTypes.string.isRequired,
  links: PropTypes.array.isRequired,
}

export default NavCard
