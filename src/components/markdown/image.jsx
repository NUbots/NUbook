import React from 'react'
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

const Image = (props) => (
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
        Img = <img src={src} className='max-w-full h-auto mx-auto' alt={props.alt} />
      } else {
        const image = data.allImageSharp.edges.find(edge => {
          const path = src.split('/').pop()
          return edge.node.fluid.src.endsWith(`/${path}`)
        })

        if (!image) {
          throw new Error(`Image not found: ${src}.`)
        }

        Img = <NonStretchedImage fluid={image.node.fluid} />
      }

      return <figure className='p-2 bg-gray-100 leading-none'>
        { Img }
        { props.children &&
          <figcaption className='pt-3 pb-1 italic text-base'>{props.children}</figcaption>
        }
      </figure>
    }}
  />
)

export default Image
