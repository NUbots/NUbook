/*eslint-env node */

const React = require('react')

// Adds the dark mode class name to the body element before render,
// inline to void a flash of white in dark mode
exports.onRenderBody = ({ setHeadComponents }) => {
  const script = `
      function setColorScheme(scheme) {
        // Remove the current scheme
        document.documentElement.classList.remove(
          scheme === 'light' ? 'dark' : 'light'
        )

        // Add the new scheme
        document.documentElement.classList.add(scheme)
      }

      const isDarkMode =
        localStorage.colorScheme === 'dark' ||
        (!('colorScheme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)

      setColorScheme(isDarkMode ? 'dark' : 'light')

      // Listen for system color scheme changes
      window.matchMedia('(prefers-color-scheme: dark)').addListener(function(e) {
        // Change the theme if the user hasn't explicitly toggled it
        // (indicated by the presence of colorScheme local storage)
        if (!('colorScheme' in localStorage)) {
          setColorScheme(e.matches ? 'dark' : 'light')
        }
      })
    `

  setHeadComponents([
    <script
      key='dark-mode-script'
      dangerouslySetInnerHTML={{ __html: script }}
    ></script>,
  ])
}
