const defaultBackgroundColor = 'transparent'
const highlightDuration = '5s'

export function highlightElement(element) {
  if (element) {
    const highlightColor = document.documentElement.classList.contains('dark')
      ? 'rgba(255, 255, 0, 0.25)'
      : '#FFC107'

    const oldBackground = element.style.backgroundColor
    const oldTransition = element.style.transition

    element.style.transition = 'none'

    element.style.backgroundColor = highlightColor

    // Force CSS repaint
    element.offsetHeight // eslint-disable-line no-unused-expressions

    element.style.transition = 'background-color ' + highlightDuration
    element.style.backgroundColor =
      oldBackground.length > 0 ? oldBackground : defaultBackgroundColor

    element.addEventListener(
      'transitionend',
      () => {
        element.style.transition = oldTransition
        element.style.backgroundColor = oldBackground
      },
      { once: true }
    )
  }
}
