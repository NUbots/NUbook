import React from 'react'
import Helmet from 'react-helmet'
import { CSSTransition } from 'react-transition-group'
import { Link } from 'gatsby'

const getLinkProps = ({ isCurrent }) => {
  return {
    className: `block py-2 font-semibold ${isCurrent ? 'text-nubots-500' : 'text-primary-inverted'}`
  }
}

const Menu = ({ menu, open }) => {
  return <>
    <Helmet>
      <body className={open ? 'overflow-y-hidden' : ''} />
    </Helmet>
    <CSSTransition
      in={open}
      timeout={300}
      enter={true}
      exit={true}
      onEnter={onEnter}
      onEntering={onEntering}
      onEntered={onEntered}
      onExit={onExit}
      onExiting={onExiting}
      unmountOnExit
    >
      <div
        className='h-screen w-full overflow-hidden fixed z-10'
        style={{ transition: 'max-height 0.3s ease' }}
      >
        <nav
          className='container h-screen overflow-y-auto pt-24 pb-6'
          style={{ backgroundColor: 'rgba(36,41,46,0.9)', backdropFilter: 'blur(20px)' }}
        >
          {
            menu.map(chapter => {
              return <section className='mb-6' key={chapter.title}>
                <h3 className='text-hint-inverted text-sm uppercase tracking-wide font-semibold mb-1'>
                  { chapter.title }
                </h3>
                {
                  chapter.pages.map(page => (
                    <Link
                      to={page.slug}
                      key={page.slug}
                      getProps={getLinkProps}
                    >{ page.title }</Link>
                  ))
                }
              </section>
            })
          }
        </nav>
      </div>
    </CSSTransition>
  </>
}

function onEnter(node) {
  // Initialize max-height to a numeric value for the enter transition
  node.style.maxHeight = '0'
}

function onEntering(node) {
  // Enter to the element's natural scroll height
  node.style.maxHeight = node.scrollHeight + 'px'
}

function onEntered(node) {
  // Enter transition done: remove max-height to allow the element to grow
  node.style.maxHeight = 'none'
}

function onExit(node) {
  // Restore max-height for the exit transition
  node.style.maxHeight = node.scrollHeight + 'px'
}

function onExiting(node) {
  // Exit to a max-height of 0
  node.style.maxHeight = '0'
}

export default Menu
