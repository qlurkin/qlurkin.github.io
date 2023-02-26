export function getAbsoluteGeometry(element, parent) {
  let x = 0
  let y = 0
  let el = element
  while(el !== parent) {
      x += el.offsetLeft
      y += el.offsetTop
      el = el.offsetParent
  }
  return {x, y}
}

export function getLuminance(r, g, b) {
  return (
    0.2126 * r +
    0.7152 * g +
    0.0722 * b
  )
}

export function getContrast(f, b) {
  const L1 = getLuminance(f.r, f.g, f.b)
  const L2 = getLuminance(b.r, b.g, b.b)
  return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05)
}

export function getForegroundColor(r, g, b) {
  const bgColor = {r, g, b}
  const white = {r: 255, g: 255, b: 255}
  const black = {r: 0, g: 0, b: 0}
  const whiteContrast = getContrast(bgColor, white)
  const blackContrast = getContrast(bgColor, black)

  return whiteContrast > blackContrast ? 'white' : 'black'
}
