import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

const Image = (props) => (
  <StaticQuery
    query={graphql`
      query {
        allImageSharp {
          edges {
            node {
              fluid(maxWidth: 960, quality: 90) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    `}
    render={data => {
      const image = data.allImageSharp.edges.find(edge => {
        const path = props.src.split('/').pop()
        return edge.node.fluid.src.endsWith(`/${path}`)
      })
      if (!image) {
        throw new Error(`Image not found: ${props.src}.`)
      }
      return <figure className='p-2 bg-gray-100 leading-none'>
        <Img fluid={image.node.fluid} />
        { props.children && <figcaption className='pt-3 pb-1 italic text-base'>{props.children}</figcaption>}
      </figure>
    }}
  />
)

export default Image
