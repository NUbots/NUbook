import React from 'react'
import PropTypes from 'prop-types'

import LinkIcon from './link.svg'
import style from './heading.module.css'

export function createHeading(HeadingType) {
  const Heading = ({ children }) => {
    const [anchor, ...title] = children
    return (
      <HeadingType>
        <div
          id={anchor.props.href.replace('#', '')}
          className={style.anchor}
        ></div>
        <a data-anchor href={anchor.props.href}>
          <LinkIcon />
        </a>
        {title}
      </HeadingType>
    )
  }

  Heading.propTypes = {
    children: PropTypes.node.isRequired,
  }

  return Heading
}
