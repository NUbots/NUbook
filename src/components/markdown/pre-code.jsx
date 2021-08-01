import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/oceanicNext'

const PreCode = ({ children }) => {
  // Assuming children is one child, the nested <code> element
  const codeElement = children

  // Get the language and content of the <code> element
  const language = codeElement?.props?.className?.replace(/language-/, '') ?? ''
  const code = codeElement?.props?.children?.trim() ?? ''

  const [copyLabel, setCopyLabel] = useState('Copy')
  const copyTimeoutRef = useRef(null)

  // Clear the copy feedback timeout if there's one when the component unmounts
  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current != null) {
        clearTimeout(copyTimeoutRef.current)
      }
    }
  }, [])

  return (
    <Highlight {...defaultProps} theme={theme} code={code} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={`${className} relative w-full group`}>
          <button
            onClick={() => {
              navigator.clipboard.writeText(code)
              setCopyLabel('Copied!')

              if (copyTimeoutRef.current != null) {
                clearTimeout(copyTimeoutRef.current)
                copyTimeoutRef.current = null
              }

              copyTimeoutRef.current = setTimeout(() => {
                setCopyLabel('Copy')
                copyTimeoutRef.current = null
              }, 3000)
            }}
            className='absolute right-0 top-0 mr-2 mt-2 bg-gray-800 px-6 py-2 rounded-full leading-none opacity-0 group-hover:opacity-100 transition transition-300 text-primary-inverted'
          >
            {copyLabel}
          </button>
          <code
            className={`${className} w-full p-4 rounded block overflow-x-auto`}
            style={style}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </code>
        </pre>
      )}
    </Highlight>
  )
}

PreCode.propTypes = {
  children: PropTypes.element,
}

export default PreCode
