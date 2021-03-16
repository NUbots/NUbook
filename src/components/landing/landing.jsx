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
      <SEO
        title='NUbots: Robotics Research at the University of Newcastle'
        description='NUbook is the NUbots team documentation and handbook. It contains information about the team, our areas of research, publications, and team history; a description of our hardware, software systems and related tools; as well as guides on contributing to NUbots.'
      />

      <Header
        menu={menu}
        currentSection={menu.filter(section => !section.hidden)[0]}
        background='transparent'
        height='h-20'
      />

      <Cover title='NUbots Robotics Research Group'>
        NUbots is a team in the University of Newcastle’s robotics research
        group focused on developing humanoid soccer-playing robots for the
        international RoboCup competition.
      </Cover>

      <div className='bg-gray-100 dark:bg-gray-900'>
        <div className='max-w-screen-xl mx-auto px-6 py-12'>
          <div className='grid lg:grid-cols-3 lg:grid-rows-1 gap-6'>
            <PromoCard Icon={IconBrain} title='AI &amp; Robotics Research'>
              Our research focuses on applying intelligent techniques in the{' '}
              <a
                className='text-nubots-700 dark:text-nubots-500 hover:underline focus:underline'
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
                className='text-nubots-700 dark:text-nubots-500 hover:underline focus:underline'
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
                className='text-nubots-700 dark:text-nubots-500 hover:underline focus:underline'
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

      <div className='max-w-screen-xl mx-auto px-6 py-24 relative'>
        <div className='relative text-center mb-20'>
          <h2 className='text-4xl mb-8 text-primary dark:text-primary-inverted'>
            Welcome to NUbook
          </h2>
          <div className='text-secondary dark:text-secondary-inverted text-lg max-w-3xl mx-auto'>
            NUbook is the NUbots team documentation and handbook. It contains
            information about the team, our areas of research, publications, and
            team history; a description of our hardware, software systems and
            related tools; as well as guides on contributing to NUbots.
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
