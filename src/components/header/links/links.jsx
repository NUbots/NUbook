import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import FacebookIcon from './facebook-icon.svg'
import GithubIcon from './github-icon.svg'
import SlackIcon from './slack-icon.svg'

const Links = ({ links }) => (
  <StaticQuery
    query={graphql`
      query SocialLinksQuery {
        site {
          siteMetadata {
            githubUrl
            slackUrl
            facebookUrl
          }
        }
      }
    `}
    render={data => {
      const { githubUrl, slackUrl, facebookUrl } = data.site.siteMetadata
      return <>
        <a href={githubUrl} target='_blank' className='text-icon-inverted mr-5'>
          <GithubIcon className='w-6 h-6' />
        </a>
        <a href={slackUrl} target='_blank' className='text-icon-inverted mr-5'>
          <SlackIcon className='w-6 h-6' />
        </a>
        <a href={facebookUrl} target='_blank' className='text-icon-inverted'>
          <FacebookIcon className='w-6 h-6' />
        </a>
      </>
    }}
  />
)

export default Links
