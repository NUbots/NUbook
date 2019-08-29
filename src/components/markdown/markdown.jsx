import React from 'react'
import PropTypes from 'prop-types'
import { MDXProvider } from '@mdx-js/react'

import Code from './code'
import Image from './image'
import Link from './link'

import style from './markdown.module.css'
import { createHeading } from './heading/heading'

const Img = ({ src, alt, title }) => (
  <Image src={src} alt={alt}>
    {title}
  </Image>
)

Img.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  title: PropTypes.string,
}

const A = ({ href, children, ...other }) => (
  <Link to={href} {...other}>
    {children}
  </Link>
)

A.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

const MDXComponents = {
  img: Img,
  a: A,
  code: Code,
  h1: createHeading('h1'),
  h2: createHeading('h2'),
  h3: createHeading('h3'),
  h4: createHeading('h4'),
  h5: createHeading('h5'),
  h6: createHeading('h6'),
}

const Markdown = ({ children }) => (
  <div className={style.markdown}>
    <MDXProvider components={MDXComponents}>{children}</MDXProvider>
  </div>
)

Markdown.propTypes = {
  children: PropTypes.node,
}

export default Markdown
