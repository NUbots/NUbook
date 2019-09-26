export function inView(element, container) {
  const top = element.offsetTop
  const parentTop = container.scrollTop
  const bottom = top + element.offsetHeight
  const parentBottom = container.offsetHeight

  return top >= parentTop && bottom <= parentBottom
}

export function scrollIntoView(element, container, options) {
  if (inView(element, container)) {
    return
  }

  const { marginTop, marginBottom } = Object.assign(
    {
      marginTop: 0,
      marginBottom: 0,
    },
    options
  )

  container.scrollTop = element.offsetTop - marginTop + marginBottom
}

export function getScrollParent(element) {
  let style = getComputedStyle(element)

  const excludeStaticParent = style.position === 'absolute'
  const overflowRegex = /(auto|scroll)/

  if (style.position === 'fixed') {
    return document.body
  }

  for (let parent = element; parent !== null; parent = parent.parentElement) {
    style = getComputedStyle(parent)

    if (excludeStaticParent && style.position === 'static') {
      continue
    }

    if (
      overflowRegex.test(style.overflow + style.overflowY + style.overflowX)
    ) {
      return parent
    }
  }

  return document.body
}
