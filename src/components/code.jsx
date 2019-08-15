import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/oceanicNext'

export default ({ children, className }) => {
  const language = className.replace(/language-/, '')

  return (
    <Highlight {...defaultProps} theme={theme} code={children.trim()} language={language}>
      {({className, style, tokens, getLineProps, getTokenProps}) => (
        <code className={`${className} w-full p-4 rounded-lg`} style={style}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({line, key: i})}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({token, key})} />
              ))}
            </div>
          ))}
        </code>
      )}
    </Highlight>
  )
}
