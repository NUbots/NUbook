import React from 'react'
import PropTypes from 'prop-types'

import Footer from '../../components/footer/footer'
import Header from '../../components/header/header'
import SEO from '../../components/seo'

import PromoCards from './promo-cards/promo-cards'
import NavButtons from './nav-buttons/nav-buttons'
import style from './landing.module.css'

const LandingPage = props => {
  const { menu } = props.pageContext
  return (
    <>
      <SEO title='NUbots: Robotics Research at the University of Newcastle' />

      <Header menu={menu} currentSection={menu[0]} background='transparent' />

      <div className={style.cover}></div>

      <PromoCards />

      <div className='max-w-screen-xl mx-auto px-8 mb-32'>
        <h1 className='text-4xl mb-16 text-center'>Welcome to NUbook</h1>
        <div className='text-center text-xl mx-auto max-w-xl lg:max-w-4xl xl:max-w-5xl leading-relaxed'>
          NUbook is the documentation and team handbook for the NUbots team.
          NUbots is an interdis ... some thing Lorem ipsum dolor sit amet,
          consectetur adipisicing elit. Commodi ut placeat quos doloribus iure
          blanditiis voluptas perspiciatis earum voluptates soluta. Commodi ut
          placeat quos doloribus iure blanditiis voluptas perspiciatis earum
          voluptates soluta.
        </div>
      </div>

      <NavButtons />

      <Footer />
    </>
  )
}

LandingPage.propTypes = {
  pageContext: PropTypes.object.isRequired,
}

export default LandingPage
