import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import EmailIcon from './email-icon.svg'
import FacebookIcon from './facebook-icon.svg'
import GithubIcon from './github-icon.svg'
import SlackIcon from './slack-icon.svg'

const Links = () => (
  <StaticQuery
    query={graphql`
      query SocialLinksQuery {
        site {
          siteMetadata {
            githubUrl
            slackUrl
            facebookUrl
            email
          }
        }
      }
    `}
    render={data => {
      const { githubUrl, slackUrl, facebookUrl, email } = data.site.siteMetadata
      return (
        <>
          <a
            className='text-icon-inverted hover:text-white focus:text-white mr-6'
            title='NUbots on GitHub'
            href={githubUrl}
            target='_blank'
            rel='noopener noreferrer'
          >
            <GithubIcon className='w-5 h-5' />
          </a>
          <a
            className='text-icon-inverted hover:text-white focus:text-white mr-6'
            title='NUbots on Slack'
            href={slackUrl}
            target='_blank'
            rel='noopener noreferrer'
          >
            <SlackIcon className='w-5 h-5' />
          </a>
          <a
            className='text-icon-inverted hover:text-white focus:text-white mr-6'
            title='NUbots on Facebook'
            href={facebookUrl}
            target='_blank'
            rel='noopener noreferrer'
          >
            <FacebookIcon className='w-5 h-5' />
          </a>
          <a
            className='text-icon-inverted hover:text-white focus:text-white'
            title='NUbots Email'
            href={`mailto:${email}`}
          >
            <EmailIcon className='w-5 h-5' />
          </a>
        </>
      )
    }}
  />
)

export default Links
