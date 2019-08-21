import React from 'react'
import { Link as GatsbyLink } from 'gatsby'

const Link = ({ children, to, activeClassName, partiallyActive, ...other }) => {
  // Assumes internal links start with /, everything else external
  const internal = /^\/(?!\/)/.test(to)

  // Use Gatsby Link for internal links, and <a> for others
  if (internal) {
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

export default Link
