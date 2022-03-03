import React, { useRef } from 'react'
import PropTypes from 'prop-types'

import ArticleHeader from './article-header'
import ArticleNavigation from './article-navigation/article-navigation'
import Header from './header/header'
import Markdown from './markdown/markdown'
import SEO from './seo'
import Sidebar from './sidebar/sidebar'
import TableOfContents from './table-of-contents/table-of-contents'
import Footer from './footer/footer'
import Contributions from './contributions/contributions'

const Layout = ({ children, data, pageContext, contributions }) => {
  const {
    section: sectionTitle,
    chapter: chapterTitle,
    title,
    description,
    keywords,
    hidden,
  } = data.mdx.frontmatter
  const { next, previous, menu, mdxPath } = pageContext
  const currentSection =
    menu.find((section) => section.title === sectionTitle) || menu[0]
  const currentChapter = currentSection.chapters.find(
    (chapter) => chapter.title === chapterTitle
  )
  const sidebarWrapperRef = useRef(null)
  return (
    <>
      <SEO
        title={title}
        description={description}
        keywords={keywords || []}
        meta={
          hidden
            ? [
                {
                  name: 'robots',
                  content: 'noindex,nofollow',
                },
              ]
            : []
        }
      />
      <Header menu={menu} currentSection={currentSection} />
      <div className='w-full max-w-screen-xl mx-auto px-6'>
        <div className='lg:flex -mx-6'>
          <div className='hidden w-1/4 lg:block xl:w-1/5'>
            <div
              className='pl-6 pr-8 pt-10 pb-6 sticky top-0 left-0 max-h-screen overflow-y-auto border-t border-transparent'
              ref={sidebarWrapperRef}
              style={{ borderTopWidth: '4rem' }}
            >
              <Sidebar
                menu={menu}
                currentSection={currentSection}
                wrapperRef={sidebarWrapperRef}
              />
            </div>
          </div>
          <div className='w-full lg:flex lg:w-3/4 xl:w-4/5'>
            <div className='hidden xl:block xl:w-1/4 xl:px-6 order-last'>
              {data.mdx.tableOfContents.items && (
                <div
                  className='pt-10 pb-8 sticky top-0 left-0 max-h-screen overflow-y-auto border-t-transparent'
                  style={{ borderTopWidth: '4rem' }}
                >
                  <TableOfContents contents={data.mdx.tableOfContents} />
                </div>
              )}
            </div>
            <div className='px-6 pt-26 pb-12 w-full max-w-3xl mx-auto xl:px-12 lg:ml-0 lg:mr-auto xl:mx-0 xl:w-3/4'>
              <article className='content' id='page-content'>
                <ArticleHeader
                  section={currentSection}
                  chapter={currentChapter}
                  title={title}
                  description={description}
                />
                {contributions && (
                  <Contributions
                    contributions={contributions}
                    mdxPath={mdxPath}
                  />
                )}
                <Markdown>{children}</Markdown>
              </article>
              <ArticleNavigation next={next} previous={previous} />
            </div>
          </div>
        </div>
      </div>

      <div className='pt-12'>
        <Footer />
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node,
  data: PropTypes.shape({
    mdx: PropTypes.shape({
      frontmatter: PropTypes.shape({
        chapter: PropTypes.string,
        section: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        keywords: PropTypes.arrayOf(PropTypes.string),
        hidden: PropTypes.bool,
      }).isRequired,
      tableOfContents: PropTypes.object.isRequired,
    }).isRequired,
  }).isRequired,
  pageContext: PropTypes.shape({
    next: PropTypes.object,
    previous: PropTypes.object,
    menu: PropTypes.array,
    mdxPath: PropTypes.string.isRequired,
  }).isRequired,
  contributions: PropTypes.shape({
    authors: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        username: PropTypes.string,
      })
    ).isRequired,
    lastCommit: PropTypes.shape({
      date: PropTypes.string.isRequired,
      hash: PropTypes.string.isRequired,
    }),
  }),
}

export default Layout
