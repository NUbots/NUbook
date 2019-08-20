import React from 'react'
import { MDXProvider } from '@mdx-js/react'

import Code from '../code'
import Image from '../image'
import Link from '../link'

import style from './markdown.module.css'

const MDXComponents = {
  img: ({ src, alt, title }) => (
    <Image src={src} alt={alt}>{title || alt}</Image>
  ),
  a: ({ href, children, ...other }) => (
    <Link to={href} {...other}>{children}</Link>
  ),
  code: Code,
}

const Markdown = ({ children }) => (
  <div className={style.markdown}>
    <MDXProvider components={MDXComponents}>
      { children }
    </MDXProvider>
  </div>
)

export default Markdown
