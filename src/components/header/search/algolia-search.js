/* global docsearch */

function loadAlgoliaScript() {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    const head = document.head || document.getElementsByTagName('head')[0]

    const scriptSrc =
      'https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js'

    script.src = scriptSrc
    script.async = false

    script.addEventListener('load', resolve)
    script.addEventListener('error', reject)

    for (let child of head.children) if (child.src === scriptSrc) return

    head.appendChild(script)
  })
}

export const initialiseAlgolia = () => {
  loadAlgoliaScript().then(() => {
    docsearch({
      apiKey: 'be16e460d9d03fa711df82d525dec3c1',
      indexName: 'nubots',
      inputSelector: '#search',
      debug: false,
      // Update the URL on hits to have the current origin,
      // to support local development and deploy previews
      // (they point to the production site otherwise)
      transformData: function (hits) {
        hits.forEach((hit) => {
          const { origin } = new URL(hit.url)
          hit.url = hit.url.replace(origin, window.location.origin)
        })
      },
    })
  })
}
