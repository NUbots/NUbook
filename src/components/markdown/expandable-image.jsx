import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { createPortal } from 'react-dom'

const ExpandableImage = ({ children, src, alt, className }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [imageBounds, setImageBounds] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768)
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  useEffect(() => {
    if (!isExpanded) return

    const handleEscape = (e) => {
      if (e.key === 'Escape') handleClose()
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'auto'
    }
  }, [isExpanded])

  const viewportBounds =
    typeof window === 'undefined'
      ? null
      : {
          width: isMobile ? window.innerWidth - 32 : window.innerWidth - 64,
          height: isMobile ? window.innerHeight - 32 : window.innerHeight - 64,
        }

  const maxZoom = (() => {
    if (!viewportBounds || !imageBounds.width || !imageBounds.height) {
      return 4
    }

    const widthZoom = viewportBounds.width / imageBounds.width
    const heightZoom = viewportBounds.height / imageBounds.height

    return Math.max(1, Math.min(4, widthZoom, heightZoom))
  })()

  const clampZoom = (value) => Math.min(maxZoom, Math.max(1, value))

  const handleClick = () => {
    setZoom(1)
    setImageBounds({ width: 0, height: 0 })
    setIsExpanded(true)
  }
  const handleClose = () => {
    setZoom(1)
    setIsExpanded(false)
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }
  const handleWheel = (e) => {
    if (!isExpanded) return

    e.preventDefault()

    const step = e.deltaY > 0 ? -0.15 : 0.15

    setZoom((currentZoom) => clampZoom(currentZoom + step))
  }
  const handleImageLoad = (e) => {
    setImageBounds({
      width: e.currentTarget.naturalWidth,
      height: e.currentTarget.naturalHeight,
    })
  }

  const modal = isExpanded && (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden ${
        isMobile ? 'bg-black' : 'bg-black bg-opacity-75'
      } p-4 md:p-8`}
      onClick={handleClose}
      onWheel={handleWheel}
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

      <div className='flex max-w-full max-h-full items-center justify-center overflow-hidden'>
        <img
          onClick={handleClose}
          src={src}
          alt={alt}
          onLoad={handleImageLoad}
          className='block w-auto h-auto object-contain select-none'
          style={{
            maxWidth: isMobile ? 'calc(100vw - 2rem)' : 'calc(100vw - 4rem)',
            maxHeight: isMobile ? 'calc(100vh - 2rem)' : 'calc(100vh - 4rem)',
            transform: `scale(${zoom})`,
            transformOrigin: 'center center',
            transition: 'transform 120ms ease-out',
          }}
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
