import React from 'react'

import style from './table-of-contents.module.css'

const Contents = ({ contents, level }) => {
  return contents.items.map(item => {
      return <div
        className={level > 0 ? 'pl-4' : undefined}
        key={item.url}
      >
        <a
          href={item.url}
          className={`${style.link}`}
        >{ item.title }</a>
        {
          item.items && <Contents
            contents={{
              items: item.items
            }}
            level= {level+1}
          />
        }
      </div>
    })
}

const TableOfContents = ({ contents }) => {
  return <div>
    <h3 className='text-hint text-sm uppercase tracking-wide font-semibold mb-2'>
      On this page
    </h3>
    <Contents
      contents={contents}
      level={0}
    />
  </div>
}

export default TableOfContents
