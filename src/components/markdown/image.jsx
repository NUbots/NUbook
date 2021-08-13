import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

/*
  TODO: Find a way to make this work with the new GatsbyImage component
  i.e. find a way to not stretch images that are below the container width (960px), and vertically center them

// Ensures that images smaller than the viewport are not stretched to 100%
const NonStretchedImage = props => {
  let normalizedProps = props

  if (props.fluid && props.fluid.presentationWidth) {
    normalizedProps = {
      ...props,
      style: {
        ...(props.style || {}),
        maxWidth: props.fluid.presentationWidth,
        margin: '0 auto', // center the image
      },
    }
  }

  return <GatsbyImage {...normalizedProps} />
}

NonStretchedImage.propTypes = {
  fluid: PropTypes.shape({
    presentationWidth: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }),
  style: PropTypes.object,
  alt: PropTypes.string,
}

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
              gatsbyImageData(
                layout: CONSTRAINED
                width: 960
                quality: 90
                placeholder: BLURRED
              )
            }
          }
        }
      }
    `}
    render={data => {
      const src = props.src
      let Img

      if (/^https?:\/\//i.test(src)) {
        Img = (
          <img
            src={src}
            className='max-w-full h-auto mx-auto'
            alt={props.alt}
          />
        )
      } else if (/\.svg$/i.test(src)) {
        Img = (
          <img
            src={src}
            className='max-w-full h-auto mx-auto'
            alt={props.alt}
          />
        )
      } else {
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
