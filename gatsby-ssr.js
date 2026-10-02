/*eslint-env node */

const React = require('react')
const { withPrefix } = require('gatsby')

// Adds the dark mode class name to the html element before render,
// using an inline script to void a flash of white in dark mode
exports.onRenderBody = ({ setHeadComponents }) => {
  const script = `
      function setColorScheme(scheme) {
        // Remove the current scheme
        document.documentElement.classList.remove(
          scheme === 'light' ? 'dark' : 'light'
        )

        // Add the new scheme
        document.documentElement.classList.add(scheme)

        // Pagefind's search UI reads this attribute to theme itself
        document.documentElement.setAttribute('data-pf-theme', scheme)
      }

      var isDarkMode =
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
    // Pagefind's search index and UI bundle are generated as a post-build
    // step (see the `build` script), so they're loaded from the static
    // output directory rather than bundled as an npm dependency.
    <link
      key='pagefind-css'
      rel='stylesheet'
      href={withPrefix('/pagefind/pagefind-component-ui.css')}
    />,
    <script
      key='pagefind-script'
      type='module'
      src={withPrefix('/pagefind/pagefind-component-ui.js')}
    ></script>,
  ])
}
