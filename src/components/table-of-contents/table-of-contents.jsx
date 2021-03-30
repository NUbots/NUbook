import React from 'react'
import PropTypes from 'prop-types'

import style from './table-of-contents.module.css'

const Contents = ({ contents, level }) => {
  return contents.items.map(item => (
    <div className={level > 0 ? 'pl-4' : undefined} key={item.url}>
      <a
        href={item.url}
        className={`${style.link} text-primary-muted dark:text-primary-muted-inverted`}
      >
        {item.title}
      </a>
      {item.items && (
        <Contents
          contents={{
            items: item.items,
          }}
          level={level + 1}
        />
      )}
    </div>
  ))
}

Contents.propTypes = {
  contents: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        items: PropTypes.array,
      })
    ),
  }).isRequired,
  level: PropTypes.number.isRequired,
}

const TableOfContents = ({ contents }) => (
  <div>
    <h3 className='text-hint dark:text-hint-inverted text-sm uppercase tracking-wider font-semibold mb-2'>
      On this page
    </h3>
    <Contents contents={contents} level={0} />
  </div>
)

TableOfContents.propTypes = {
  contents: PropTypes.object.isRequired,
}

export default TableOfContents
