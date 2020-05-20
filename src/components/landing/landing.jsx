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

      <div style={{ backgroundColor: `rgba(26, 32, 44, 0.95)` }}>
        <div className='max-w-screen-xl mx-auto px-6 py-12'>
          <div className='grid lg:grid-cols-3 lg:grid-rows-1 gap-6'>
            <PromoCard Icon={IconBrain} title='AI &amp; Robotics Research'>
              Our research focuses on applying intelligent techniques in the{' '}
              <a
                className='text-white hover:underline focus:underline'
                href='https://humanoid.robocup.org/'
              >
                Humanoid Soccer
              </a>{' '}
              domain, and using that domain as a test bed to develop solutions
              for wider application in other research areas.
            </PromoCard>

            <PromoCard Icon={IconBall} title='RoboCup'>
              NUbots competes yearly in the{' '}
              <a
                className='text-white hover:underline focus:underline'
                href='https://www.robocup.org/objective'
              >
                RoboCup competition
              </a>
              , whose ultimate goal is to develop a team of fully autonomous
              humanoid robots that can win against the human world champions by
              2050.
            </PromoCard>

            <PromoCard Icon={IconHandshake} title='Community Engagement'>
              NUbots engages with the community through events including{' '}
              <a
                className='text-white hover:underline focus:underline'
                href='https://www.robocupjunior.org.au/'
              >
                RoboCup Junior
              </a>
              , school visits, public exhibitions, STEM and robotics advocacy,
              as well as research collaborations with industry.
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

        <Book contents={menu} />
      </div>

      <Footer />
    </>
  )
}

LandingPage.propTypes = {
  pageContext: PropTypes.object.isRequired,
}

export default LandingPage
