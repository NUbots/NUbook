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
        <a
          className='text-icon-inverted hover:text-white focus:text-white mr-6'
          href={githubUrl}
          target='_blank'
          rel='noopener noreferrer'
        >
          <GithubIcon className='w-5 h-5' />
        </a>
        <a
          className='text-icon-inverted hover:text-white focus:text-white mr-6'
          href={slackUrl}
          target='_blank'
          rel='noopener noreferrer'
        >
          <SlackIcon className='w-5 h-5' />
        </a>
        <a
          className='text-icon-inverted hover:text-white focus:text-white'
          href={facebookUrl}
          target='_blank'
          rel='noopener noreferrer'
        >
          <FacebookIcon className='w-5 h-5' />
        </a>
      </>
    }}
  />
)

export default Links
