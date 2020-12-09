/* global docsearch */

docsearch({
  apiKey: 'be16e460d9d03fa711df82d525dec3c1',
  indexName: 'nubots',
  inputSelector: '#search',
  debug: false,
})

// Add support for the / keyboard shortcut
window.addEventListener('keydown', event => {
  // Don't do anything if an input is focused
  if (
    document.activeElement instanceof HTMLInputElement ||
    document.activeElement instanceof HTMLTextAreaElement
  ) {
    return
  }

  if (event.key === '/') {
    event.preventDefault()
    const searchBox = document.querySelector('#search')
    searchBox && searchBox.focus()
  }
})
