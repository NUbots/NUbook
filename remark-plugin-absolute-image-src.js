/* eslint-env node */

const path = require('path')
const visit = require('unist-util-visit')

const isAbsoluteUrl = /^https?:\/\//i
const isSvgImage = /\.svg$/i

/**
 * This is a gatsby-remark plugin that rewrites the src attribute on every relative Markdown image to be absolute.
 * We do this to be able to uniquely match the image's src against the list of all images in NUbook.
 * This matching is done in the markdown/image.jsx component.
 */
module.exports = function mdxAbsoluteImageSrc({
  markdownAST,
  markdownNode,
  getNode,
}) {
  visit(markdownAST, `image`, image => {
    // Make sure the parent node has dir (e.g. the image is a top-level node so its parent is the file)
    if (!markdownNode.parent || !getNode(markdownNode.parent).dir) {
      return
    }

    const urlTrimmed = image.url?.trim()

    // Don't rewrite image URLs that are absolute
    if (isAbsoluteUrl.test(urlTrimmed)) {
      return
    }

    // Don't rewrite SVG image URLs
    if (isSvgImage.test(urlTrimmed)) {
      return
    }

    image.originalUrl = urlTrimmed

    const absoluteImagePath = path.posix.join(
      getNode(markdownNode.parent).dir,
      urlTrimmed
    )

    image.url = absoluteImagePath
  })
}
