import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

/**
 * This components works by keeping a list of all images in NUbook (using a GraphQL static query)
 * and matching it's src prop (from Markdown) to one of those images. It then uses the data from
 * the matched image to render the image using the GatsbyImage component. All of this matching
 * is only applied for local, non-SVG images.
 */
const Image = props => (
  <StaticQuery
    query={graphql`
      query {
        allFile(
          filter: { extension: { regex: "/jpg|jpeg|png|webp|tif|tiff$/" } }
        ) {
          nodes {
            absolutePath
            childImageSharp {
              original {
                width
              }
              gatsbyImageData(
                layout: CONSTRAINED
                width: 960
                quality: 90
                placeholder: NONE
              )
            }
          }
        }
      }
    `}
    render={data => {
      const src = props.src
      let Img

      // Render all remote images with a plain <img> tag
      if (/^https?:\/\//i.test(src)) {
        Img = (
          <img
            src={src}
            className='max-w-full h-auto mx-auto'
            alt={props.alt}
          />
        )
      }
      // Render SVGs with a plain <img> tag
      else if (/\.svg$/i.test(src)) {
        Img = (
          <img
            src={src}
            className='max-w-full h-auto mx-auto'
            alt={props.alt}
          />
        )
      }
      // Otherwise match the image src against the list of all other images (JPG, PNG, WebP)
      // in NUbook and render with GatsbyImage, which will handle resizing and responsiveness,
      // picking the correct resolution appropriate for the client browser.
      else {
        const imageNode = data.allFile.nodes.find(node => {
          return node.absolutePath === src
        })

        if (!imageNode) {
          throw new Error(`Image not found: ${src}.`)
        }

        Img = (
          <GatsbyImage
            image={imageNode.childImageSharp.gatsbyImageData}
            alt={props.alt}
            objectFit='contain'
            style={{
              display: 'block',
              maxWidth: `${imageNode.childImageSharp.original.width}px`, // Don't stretch beyond the source image size
              margin: '0 auto', // Center horizontally
            }}
          />
        )
      }

      return (
        <figure className='p-2 bg-gray-100 dark:bg-gray-900 leading-none rounded-sm'>
          {Img}
          {props.children && (
            <figcaption className='pt-2 italic text-base'>
              {props.children}
            </figcaption>
          )}
        </figure>
      )
    }}
  />
)

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  children: PropTypes.node,
}

export default Image
