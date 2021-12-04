import React from 'react'
import PropTypes from 'prop-types'

import * as style from './grid.module.css'

let currentId = 0
function nextId() {
  return currentId++
}

const gapStyles = {
  'none': style.gridGapNone,
  'small': style.gridGapSmall,
  'medium': style.gridGapMedium,
  'large': style.gridGapLarge,
  'extra-large': style.gridGapExtraLarge,
}

const Grid = ({ children, rows, columns, gap, caption, seamless }) => {
  const id = 'grid-' + nextId()
  const styleContent = `
    @media (min-width: 768px) {
      #${id} {
        grid-template-columns: ${columns || 'none'};
        grid-template-rows: ${rows || 'none'};
      }
    }
  `
  return (
    <figure
      className={`${style.grid} ${gapStyles[gap] ?? style.gridGapSmall} ${
        seamless ? style.gridSeamless : ''
      } `}
    >
      <style dangerouslySetInnerHTML={{ __html: styleContent }}></style>
      <div id={id} className={style.gridContent}>
        {children}
      </div>
      {caption && (
        <figcaption className='pt-3 italic text-base'>{caption}</figcaption>
      )}
    </figure>
  )
}

Grid.propTypes = {
  rows: PropTypes.string,
  columns: PropTypes.string,
  gap: PropTypes.string,
  caption: PropTypes.string,
  seamless: PropTypes.bool,
  children: PropTypes.node,
}

Grid.defaultProps = {
  gap: 'small',
}

export default Grid
