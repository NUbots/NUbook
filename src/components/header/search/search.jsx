import React, { useEffect, useRef } from 'react'
import './search.module.css'

const Search = () => {
  const triggerRef = useRef(null)
  const modalRef = useRef(null)

  // Pagefind's web components mutate their own children as soon as they're
  // upgraded (e.g. pagefind-modal adds an internal <dialog>). If React
  // renders them via JSX, that mutation happens before/during hydration and
  // React "corrects" it by tearing the mutated children back out, breaking
  // the modal. So they're mounted imperatively into empty wrapper divs that
  // React never diffs into, after hydration has already settled.
  useEffect(() => {
    const triggerEl = triggerRef.current
    const modalEl = modalRef.current

    const trigger = document.createElement('pagefind-modal-trigger')
    trigger.setAttribute('placeholder', 'Search NUbook...')
    trigger.setAttribute('shortcut', 'mod+k')
    triggerEl.appendChild(trigger)

    const modal = document.createElement('pagefind-modal')
    modal.setAttribute('reset-on-close', '')
    modalEl.appendChild(modal)

    return () => {
      triggerEl.removeChild(trigger)
      modalEl.removeChild(modal)
    }
  }, [])

  return (
    <>
      <div ref={triggerRef} />
      <div ref={modalRef} />
    </>
  )
}

export default Search
