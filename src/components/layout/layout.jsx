import PropTypes from 'prop-types'
import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import Header from '../header/header'
import SEO from '../seo'

import './layout.css'

const Layout = ({ children, pageContext }) => {
  console.log(pageContext);

  return <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <SEO title={pageContext.frontmatter.title} keywords={['nubots', 'team', 'handbook', 'help', 'documentation']} />
        <Header siteTitle={data.site.siteMetadata.title} />
        <div className='container pt-24 pb-16'>
          <div className='mb-8'>
            <h1 className='text-3xl md:text-4xl leading-tight font-semibold mb-2'>{pageContext.frontmatter.title}</h1>
            <div className='text-secondary text-base'>{pageContext.frontmatter.description}</div>
          </div>
          <div className='markdown'>{ children }</div>
          <div></div>
        </div>
      </>
    )}
  />
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
