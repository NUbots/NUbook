import PropTypes from 'prop-types'
import React from 'react'
import { MDXProvider } from '@mdx-js/react'

import Header from '../header/header'
import Image from '../image'
import Link from '../link'
import SEO from '../seo'

import './layout.css'

const MDXComponents = {
  img: (props) => <Image src={props.src}>{props.alt}</Image>,
  a: ({ href, children, ...other }) => (
    <Link to={href} {...other}>{children}</Link>
  )
}

const Layout = ({ children, pageContext }) => {
  return <>
    <SEO title={pageContext.frontmatter.title} keywords={['nubots', 'team', 'handbook', 'help', 'documentation']} />
    <Header />
    <div className='container pt-24 pb-16'>
      <div className='mb-8'>
        <h1 className='text-3xl md:text-4xl leading-tight font-semibold mb-2'>{pageContext.frontmatter.title}</h1>
        <div className='text-secondary text-base'>{pageContext.frontmatter.description}</div>
      </div>
      <div className='markdown'>
        <MDXProvider components={MDXComponents}>
          { children }
        </MDXProvider>
      </div>
    </div>
  </>
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
