import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { createPortal } from 'react-dom'

const ExpandableImage = ({ children, src, alt, className }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [scale, setScale] = useState(1)
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  })
  const [transformOrigin, setTransformOrigin] = useState('50% 50%')
  const modalRef = useRef(null)
  const imageRef = useRef(null)

  const getViewportBounds = () => ({
    width: isMobile ? window.innerWidth - 32 : window.innerWidth - 64,
    height: isMobile ? window.innerHeight - 32 : window.innerHeight - 64,
  })

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768)
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  const viewportBounds =
    typeof window === 'undefined' ? null : getViewportBounds()

  const fitScale = (() => {
    if (!viewportBounds || !imageDimensions.width || !imageDimensions.height) {
      return 1
    }

    const widthScale = viewportBounds.width / imageDimensions.width
    const heightScale = viewportBounds.height / imageDimensions.height

    return Math.min(widthScale, heightScale)
  })()

  const minScale = Math.min(1, fitScale)
  const maxScale = Math.max(minScale, fitScale * 4)

  const clampScale = (value) => Math.min(maxScale, Math.max(minScale, value))

  useEffect(() => {
    if (!isExpanded) return

    const handleEscape = (e) => {
      if (e.key === 'Escape') handleClose()
    }
    const handleWheel = (e) => {
      const imageElement = imageRef.current

      if (!imageElement) return

      const rect = imageElement.getBoundingClientRect()
      const isOverImage =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom

      if (!isOverImage) return

      e.preventDefault()

      const step = e.deltaY > 0 ? -0.15 : 0.15
      const originX = ((e.clientX - rect.left) / rect.width) * 100
      const originY = ((e.clientY - rect.top) / rect.height) * 100

      setTransformOrigin(
        `${Math.min(100, Math.max(0, originX))}% ${Math.min(
          100,
          Math.max(0, originY)
        )}%`
      )
      setScale((currentScale) => clampScale(currentScale + step))
    }

    document.addEventListener('keydown', handleEscape)
    modalRef.current?.addEventListener('wheel', handleWheel, { passive: false })
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      modalRef.current?.removeEventListener('wheel', handleWheel)
      document.body.style.overflow = 'auto'
    }
  }, [isExpanded, fitScale, maxScale, minScale])

  const handleClick = () => {
    setScale(1)
    setImageDimensions({ width: 0, height: 0 })
    setTransformOrigin('50% 50%')
    setIsExpanded(true)
  }
  const handleClose = () => {
    setScale(1)
    setTransformOrigin('50% 50%')
    setIsExpanded(false)
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }
  const handleImageLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.currentTarget
    const nextViewportBounds =
      typeof window === 'undefined' ? null : getViewportBounds()
    const nextFitScale =
      nextViewportBounds && naturalWidth && naturalHeight
        ? Math.min(
            nextViewportBounds.width / naturalWidth,
            nextViewportBounds.height / naturalHeight
          )
        : 1

    setImageDimensions({
      width: naturalWidth,
      height: naturalHeight,
    })
    setScale(Math.min(1, nextFitScale))
  }

  const modal = isExpanded && (
    <div
      ref={modalRef}
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden ${
        isMobile ? 'bg-black' : 'bg-black bg-opacity-75'
      } p-4 md:p-8`}
      onClick={handleClose}
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
          ref={imageRef}
          onClick={handleClose}
          src={src}
          alt={alt}
          onLoad={handleImageLoad}
          className='block w-auto h-auto object-contain select-none'
          style={{
            width: imageDimensions.width
              ? `${imageDimensions.width * Math.min(scale, fitScale)}px`
              : 'auto',
            height: imageDimensions.height
              ? `${imageDimensions.height * Math.min(scale, fitScale)}px`
              : 'auto',
            maxWidth: 'none',
            maxHeight: 'none',
            transform:
              scale > fitScale ? `scale(${scale / fitScale})` : 'scale(1)',
            transformOrigin,
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
