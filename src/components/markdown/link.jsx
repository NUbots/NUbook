import React from 'react'
import PropTypes from 'prop-types'
import { Link as GatsbyLink } from 'gatsby'

const Link = ({ children, to, activeClassName, partiallyActive, ...other }) => {
  // Assumes internal links start with /, everything else external
  const isInternal = /^\/(?!\/)/.test(to)

  // Assumes that file links end with an extension, e.g. ".pdf"
  const isFile = /.*\..+/.test(to)

  // Use Gatsby Link for internal links that are not files, and <a> for others
  if (isInternal && !isFile) {
    return (
      <GatsbyLink
        to={to}
        activeClassName={activeClassName}
        partiallyActive={partiallyActive}
        {...other}
      >
        {children}
      </GatsbyLink>
    )
  }

  return (
    <a href={to} {...other}>
      {children}
    </a>
  )
}

Link.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
  activeClassName: PropTypes.string,
  partiallyActive: PropTypes.bool,
}

export default Link
