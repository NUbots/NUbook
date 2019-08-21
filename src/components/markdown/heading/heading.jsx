import React from 'react'

import LinkIcon from './link.svg'
import style from './heading.module.css'

export function createHeading(Heading) {
  return ({ children }) => {
    const [anchor, ...title] = children
    return <Heading>
      <div
        id={anchor.props.href.replace('#', '')}
        className={style.anchor}
      ></div>
      <a href={anchor.props.href}><LinkIcon /></a>
      { title }
    </Heading>
  }
}
