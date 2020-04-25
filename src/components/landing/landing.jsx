import React from 'react'
import PropTypes from 'prop-types'

import Footer from '../../components/footer/footer'
import Header from '../../components/header/header'
import SEO from '../../components/seo'

import Cover from './cover/cover'

import IconBall from './promo-card/icon-ball.svg'
import IconBrain from './promo-card/icon-brain.svg'
import IconHandshake from './promo-card/icon-handshake.svg'
import PromoCard from './promo-card/promo-card'

import Book from './book/book'

const LandingPage = props => {
  const { menu } = props.pageContext
  return (
    <>
      <SEO title='NUbots: Robotics Research at the University of Newcastle' />

      <Header menu={menu} currentSection={menu[0]} background='transparent' />

      <Cover title='NUbots Robotics Research Group'>
        NUbots is a team in the University of Newcastle’s robotics research
        group focused on developing humanoid soccer-playing robots for the
        international RoboCup competition.
      </Cover>

      <div style={{ backgroundColor: '#1A202C' }}>
        <div className='max-w-screen-xl mx-auto px-6 py-12'>
          <div className='grid  lg:grid-cols-3 lg:grid-rows-1 gap-6'>
            <PromoCard Icon={IconBrain} title='AI &amp; Robotics Research'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi
              ut placeat quos doloribus iure blanditiis voluptas perspiciatis
              earum voluptates soluta.
            </PromoCard>

            <PromoCard Icon={IconBall} title='RoboCup'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi
              ut placeat quos doloribus iure blanditiis voluptas perspiciatis
              earum voluptates soluta.
            </PromoCard>

            <PromoCard Icon={IconHandshake} title='Community Engagement'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi
              ut placeat quos doloribus iure blanditiis voluptas perspiciatis
              earum voluptates soluta.
            </PromoCard>
          </div>
        </div>
      </div>

      <div className='max-w-screen-xl mx-auto px-6 py-20 relative'>
        <div className='relative text-center mb-12'>
          <h2 className='text-4xl mb-2'>NUbook</h2>
          <div className=' text-secondary text-lg'>
            The NUbots team documentation
          </div>
        </div>

        <Book />
      </div>

      <Footer />
    </>
  )
}

LandingPage.propTypes = {
  pageContext: PropTypes.object.isRequired,
}

export default LandingPage
