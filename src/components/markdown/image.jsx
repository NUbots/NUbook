import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import GatsbyImg from 'gatsby-image'

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

  return <GatsbyImg {...normalizedProps} />
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

const Image = props => (
  <StaticQuery
    query={graphql`
      query {
        allImageSharp {
          edges {
            node {
              fluid(maxWidth: 960, quality: 90) {
                ...GatsbyImageSharpFluid
                presentationWidth
              }
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
      } else {
        const image = data.allImageSharp.edges.find(edge => {
          const path = src.split('/').pop()
          return edge.node.fluid.src.endsWith(`/${path}`)
        })

        if (!image) {
          throw new Error(`Image not found: ${src}.`)
        }

        Img = <NonStretchedImage fluid={image.node.fluid} alt={props.alt} />
      }

      return (
        <figure className='p-2 bg-gray-100 leading-none'>
          {Img}
          {props.children && (
            <figcaption className='pt-3 italic text-base'>
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
