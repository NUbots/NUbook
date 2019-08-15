import React from 'react'
import { MDXProvider } from '@mdx-js/react'

import Code from '../code'
import Header from '../header/header'
import Image from '../image'
import Link from '../link'
import SEO from '../seo'

import './layout.css'
import ArrowLeftIcon from './arrow-left.svg'
import ArrowRightIcon from './arrow-right.svg'

const MDXComponents = {
  img: ({ src, alt, title }) => (
    <Image src={src} alt={alt}>{title || alt}</Image>
  ),
  a: ({ href, children, ...other }) => (
    <Link to={href} {...other}>{children}</Link>
  ),
  code: Code,
}

const PageNavigation = ({ next, previous }) => (
  <div className='mt-12 border-t-2 border-gray-200 pt-5 flex'>
    { previous &&
      <div className='w-1/2 pr-1 flex'>
        <Link
          to={previous.slug}
          title={previous.description}
          className='inline-flex text-nubots-700 font-semibold hover:underline focus:underline'
        >
          <ArrowLeftIcon className='mr-2 text-icon flex-shrink-0' /> {previous.title}
        </Link>
      </div>
    }
    { next &&
      <div className='w-1/2 pl-1 flex'>
        <Link
          to={next.slug}
          title={next.description}
          className='inline-flex ml-auto text-right text-nubots-700 font-semibold hover:underline focus:underline'
        >
          {next.title} <ArrowRightIcon className='ml-2 text-icon flex-shrink-0' />
        </Link>
      </div>
    }
  </div>
)

const Layout = ({ children, data, pageContext }) => {
  console.log('layout data, context', data, pageContext)

  const { frontmatter } = data.mdx
  const { next, previous, menu } = pageContext

  return <>
    <SEO
      title={frontmatter.title}
      description={frontmatter.description}
      keywords={['nubots', 'team', 'handbook', 'help', 'documentation']}
    />
    <Header menu={menu} />
    <div className='container pt-24 pb-16'>
      <div className='mb-8'>
        <h1 className='text-3xl md:text-4xl leading-tight font-semibold mb-2'>
          {frontmatter.title}
        </h1>
        <div className='text-secondary text-base'>
          {frontmatter.description}
        </div>
      </div>
      <div className='markdown'>
        <MDXProvider components={MDXComponents}>
          { children }
        </MDXProvider>
      </div>
      <PageNavigation next={next} previous={previous} />
    </div>
  </>
}

export default Layout
