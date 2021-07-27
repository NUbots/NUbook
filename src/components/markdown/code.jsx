import React from 'react'
import PropTypes from 'prop-types'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/oceanicNext'
import CopyImg from './assets/copy.svg'

const Code = ({ children, className }) => {
  const language = className.replace(/language-/, '')

  return (
    <Highlight
      {...defaultProps}
      theme={theme}
      code={children.trim()}
      language={language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <>
          <code
            className={`${className} w-full p-4 rounded block overflow-x-auto`}
            style={style}
          >
            <button
              onClick={() => {
                navigator.clipboard.writeText(children)
              }}
              style={{ float: 'right' }}
            >
              <CopyImg width='16' height='24' />
            </button>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </code>
        </>
      )}
    </Highlight>
  )
}

Code.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
}

Code.defaultProps = {
  className: 'language-txt',
}

export default Code
