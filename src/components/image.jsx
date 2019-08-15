import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import GatsbyImg from 'gatsby-image'

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
      const src = props.src
      let Img

      if (/^https?:\/\//i.test(src)) {
        Img = <img src={src} className='max-w-full h-auto' alt={props.children} />
      } else {
        const image = data.allImageSharp.edges.find(edge => {
          const path = src.split('/').pop()
          return edge.node.fluid.src.endsWith(`/${path}`)
        })

        if (!image) {
          throw new Error(`Image not found: ${src}.`)
        }

        Img = <GatsbyImg fluid={image.node.fluid} />
      }

      return <figure className='inline-block p-2 bg-gray-100 leading-none'>
        { Img }
        { props.children && <figcaption className='pt-3 pb-1 italic text-base'>{props.children}</figcaption>}
      </figure>
    }}
  />
)

export default Image
