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
