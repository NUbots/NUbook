/*eslint-env node */

const React = require('react')

// Adds the dark mode class name to the body element before render
exports.onRenderBody = ({ setHeadComponents }) => {
  const script = `
    const isDarkMode = localStorage.theme === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)

    document.documentElement.classList.add(isDarkMode ? 'dark' : 'light')
    `

  setHeadComponents([
    <script
      key='dark-mode-script'
      dangerouslySetInnerHTML={{ __html: script }}
    ></script>,
  ])
}
