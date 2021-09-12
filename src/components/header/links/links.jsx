import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import EmailIcon from './email-icon.svg'
import FacebookIcon from './facebook-icon.svg'
import GithubIcon from './github-icon.svg'
import SlackIcon from './slack-icon.svg'

const Link = ({ Icon, title, href, color, isLast }) => (
  <a
    className={`inline-block ${isLast ? '' : 'mr-6'} ${
      color === 'white'
        ? 'text-icon-inverted hover:text-white focus:text-white'
        : 'text-gray-400 dark:text-gray-600 hover:text-gray-800 focus:text-gray-800 dark:hover:text-gray-300 dark:focus:text-gray-300'
    }`}
    title={title}
    href={href}
    target='_blank'
    rel='noopener noreferrer'
  >
    <Icon className='w-5 h-5' />
  </a>
)

Link.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  isLast: PropTypes.bool,
}

const Links = ({ color }) => (
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
    render={(data) => {
      const { githubUrl, slackUrl, facebookUrl, email } = data.site.siteMetadata
      return (
        <>
          <Link
            Icon={GithubIcon}
            title='NUbots on GitHub'
            href={githubUrl}
            color={color}
          />
          <Link
            Icon={SlackIcon}
            title='NUbots on Slack'
            href={slackUrl}
            color={color}
          />
          <Link
            Icon={FacebookIcon}
            title='NUbots on Facebook'
            href={facebookUrl}
            color={color}
          />
          <Link
            Icon={EmailIcon}
            title='NUbots Email'
            href={`mailto:${email}`}
            color={color}
            isLast
          />
        </>
      )
    }}
  />
)

Links.propTypes = {
  color: PropTypes.string,
}

Links.defaultProps = {
  color: 'white',
}

export default Links
