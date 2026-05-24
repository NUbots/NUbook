import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { createPortal } from 'react-dom'

const ExpandableImage = ({ children, src, alt, className }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768)
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  useEffect(() => {
    if (!isExpanded) return

    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsExpanded(false)
    }
    const handleDismiss = () => setIsExpanded(false)

    document.addEventListener('keydown', handleEscape)
    window.addEventListener('wheel', handleDismiss, { passive: true })
    window.addEventListener('touchmove', handleDismiss, { passive: true })
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      window.removeEventListener('wheel', handleDismiss)
      window.removeEventListener('touchmove', handleDismiss)
      document.body.style.overflow = 'auto'
    }
  }, [isExpanded])

  const handleClick = () => setIsExpanded(true)
  const handleClose = () => setIsExpanded(false)
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsExpanded(false)
    }
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  const modal = isExpanded && (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden ${
        isMobile ? 'bg-black' : 'bg-black bg-opacity-75'
      } p-4 md:p-8`}
      onClick={handleBackdropClick}
    >
      <button
        onClick={handleClose}
        className='absolute top-4 right-4 md:top-6 md:right-6 z-10 text-white hover:text-gray-300 
          w-8 h-8 text-2xl 
          flex items-center justify-center bg-black bg-opacity-50 rounded-full 
          transition-colors duration-200'
        aria-label='Close expanded image'
      >
        ×
      </button>

      <div className='flex max-w-full max-h-full items-center justify-center'>
        <img
          onClick={handleClose}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              handleClose()
            }
          }}
          src={src}
          alt={alt}
          className='block w-auto h-auto object-contain'
          style={{
            maxWidth: isMobile ? 'calc(100vw - 2rem)' : 'calc(100vw - 4rem)',
            maxHeight: isMobile ? 'calc(100vh - 2rem)' : 'calc(100vh - 4rem)',
          }}
          role='button'
          tabIndex={0}
        />
      </div>
    </div>
  )

  return (
    <>
      <div
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={`cursor-pointer hover:opacity-90 transition-opacity duration-200 ${
          className || ''
        }`}
        role='button'
        tabIndex={0}
        aria-label='Click to expand image'
      >
        {children}
      </div>

      {typeof window !== 'undefined' &&
        modal &&
        createPortal(modal, document.body)}
    </>
  )
}

ExpandableImage.propTypes = {
  children: PropTypes.node.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  className: PropTypes.string,
}

export default ExpandableImage
