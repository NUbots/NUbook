import React from 'react'

import IconBall from './icon-ball.svg'
import IconBrain from './icon-brain.svg'
import IconHandshake from './icon-handshake.svg'
import PromoCard from './promo-card'

const PromoCards = () => {
  return (
    <div className='max-w-screen-xl mx-auto px-6 flex flex-wrap justify-center lg:flex-no-wrap mb-12'>
      <PromoCard Icon={IconBrain} title='Robotics Research'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi ut
        placeat quos doloribus iure blanditiis voluptas perspiciatis earum
        voluptates soluta.
      </PromoCard>

      <PromoCard Icon={IconBall} title='RoboCup'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi ut
        placeat quos doloribus iure blanditiis voluptas perspiciatis earum
        voluptates soluta.
      </PromoCard>

      <PromoCard Icon={IconHandshake} title='Community Engagement'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi ut
        placeat quos doloribus iure blanditiis voluptas perspiciatis earum
        voluptates soluta.
      </PromoCard>
    </div>
  )
}

export default PromoCards
