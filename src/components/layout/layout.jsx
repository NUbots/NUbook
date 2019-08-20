import React from 'react'
import Helmet from 'react-helmet'

import Header from '../header/header'
import Markdown from '../markdown/markdown'
import SEO from '../seo'

import ArticleHeader from './article-header'
import ArticleNavigation from './article-navigation/article-navigation'
import Sidebar from './sidebar/sidebar'

const Layout = ({ children, data, pageContext }) => {
  const { title, description, keywords, hidden } = data.mdx.frontmatter
  const { next, previous, menu } = pageContext
  return <>
    <SEO
      title={title}
      description={description}
      keywords={keywords || []}
    />
    {
      hidden && <Helmet
        meta={[{
          name: 'robots',
          content: 'noindex,nofollow'
        }]}
      />
    }
    <Header menu={menu} />
    <div className='w-full max-w-screen-xl mx-auto px-6 pt-24 pb-16'>
      <div className='lg:flex -mx-6'>
        <div
          className='hidden inset-0 h-full bg-white w-full overflow-y-visible lg:block lg:w-1/4 xl:w-1/5'
        >
          <div className='pl-6 pr-8 pt-2'>
            <Sidebar menu={menu} />
          </div>
        </div>
        <div className='w-full lg:flex lg:w-3/4 xl:w-4/5'>
          <div
            className='px-6 w-full max-w-3xl mx-auto xl:px-12 lg:ml-0 lg:mr-auto xl:mx-0 xl:w-3/4'
          >
            <ArticleHeader title={title} description={description} />
            <Markdown>{ children }</Markdown>
            <ArticleNavigation next={next} previous={previous} />
          </div>
          <div className='hidden xl:block xl:w-1/4 xl:px-6'>
            Table of contents
          </div>
        </div>
      </div>
    </div>
  </>
}

export default Layout
