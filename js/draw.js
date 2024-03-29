const toRedraw = []

addEventListener('resize', (event) => {
  const svgs = document.querySelectorAll('.svg-drawOnHtml')
  svgs.forEach((svg) => {
    svg.remove()
  })
  for (let f of toRedraw) {
    f()
  }
})

function getElement(element) {
  if (element === undefined) {
    return document.body
  }
  if (typeof element === 'string') {
    return document.querySelector(element)
  } else return element
}

function createSVGElement(tagname) {
  return document.createElementNS('http://www.w3.org/2000/svg', tagname)
}

function createPath(path, fillColor, strokeColor, strokeWidth) {
  const shape = createSVGElement('path')
  shape.setAttributeNS(null, 'd', path)
  shape.setAttributeNS(null, 'fill', fillColor)
  shape.setAttributeNS(null, 'stroke', strokeColor)
  shape.setAttributeNS(null, 'stroke-width', strokeWidth)
  return shape
}

function getSVG(parent) {
  const parentElement = getElement(parent)
  let svg = parentElement.querySelector('.svg-drawOnHtml')
  if (svg === null) {
    svg = createSVGElement('svg')
    svg.setAttribute('class', 'svg-drawOnHtml')
    svg.setAttribute('style', 'position:absolute;top:0px;left:0px')
    svg.setAttribute('width', parentElement.clientWidth)
    svg.setAttribute('height', parentElement.clientHeight)
    svg.setAttributeNS(
      'http://www.w3.org/2000/xmlns/',
      'xmlns:xlink',
      'http://www.w3.org/1999/xlink',
    )
    parentElement.appendChild(svg)

    const g = createSVGElement('g')
    g.setAttribute('transform', 'translate(-0.5, -0.5)')
    g.setAttribute('class', 'center-pixel')
    svg.appendChild(g)
  }
  const g = svg.querySelector('.center-pixel')
  return g
}

function sdfRoundedBox(x, y, geom) {
  const matrix = inv2D(geom.transform)
  const new_x = matrix[0] * x + matrix[1] * y
  const new_y = matrix[2] * x + matrix[3] * y
  x = new_x
  y = new_y
  const radiusBottom = x > 0 ? geom.radiusBottomRight : geom.radiusBottomLeft
  const radiusTop = x > 0 ? geom.radiusTopRight : geom.radiusTopLeft
  const radius = y > 0 ? radiusBottom : radiusTop
  const qx = Math.abs(x) - geom.width / 2 + radius
  const qy = Math.abs(y) - geom.height / 2 + radius
  return (
    Math.min(Math.max(qx, qy), 0.0) +
    Math.sqrt(Math.pow(Math.max(qx, 0), 2) + Math.pow(Math.max(qy, 0), 2)) -
    radius
  )
}

function contactBox(geom, toX, toY) {
  if (sdfRoundedBox(toX - geom.cx, toY - geom.cy, geom, 0) < 0) {
    throw new Error('To(X, Y) cannot be inside geom')
  }
  let inX = geom.cx
  let inY = geom.cy
  let outX = toX
  let outY = toY
  let midX, midY
  let d
  do {
    midX = (inX + outX) / 2
    midY = (inY + outY) / 2
    d = sdfRoundedBox(midX - geom.cx, midY - geom.cy, geom, 0)
    if (d < 0) {
      inX = midX
      inY = midY
    } else {
      outX = midX
      outY = midY
    }
  } while (Math.abs(d) > 0.1)

  return {
    x: midX,
    y: midY,
  }
}

function inv2D(matrix) {
  const [a, b, c, d] = matrix
  const det = a * d - b * c
  return [d / det, -b / det, -c / det, a / det]
}

function getAbsoluteGeometry(element, parent) {
  let x = 0
  let y = 0
  element = getElement(element)
  let el = element
  const parentElement = getElement(parent)
  while (el !== parentElement) {
    x += el.offsetLeft
    y += el.offsetTop
    el = el.offsetParent
  }
  const computedStyle = window.getComputedStyle(element)
  const radiusTopRight = computedStyle.borderTopRightRadius
  const radiusTopLeft = computedStyle.borderTopLeftRadius
  const radiusBottomRight = computedStyle.borderBottomRightRadius
  const radiusBottomLeft = computedStyle.borderBottomLeftRadius
  const transform = computedStyle.transform
  let matrix = [1, 0, 0, 1]
  if (transform !== 'none')
    matrix = transform
      .split('(')[1]
      .split(')')[0]
      .split(',')
      .map((s) => parseFloat(s.trim()))
      .slice(0, 4)

  let radiusTopRightValue = 0
  if (radiusTopRight.endsWith('px'))
    radiusTopRightValue = parseInt(radiusTopRight.slice(0, -2), 10)
  else if (radiusTopRight.endsWith('%'))
    radiusTopRightValue =
      (parseInt(radiusTopRight.slice(0, -1), 10) *
        Math.min(element.offsetWidth, element.offsetHeight)) /
      100
  else console.log('WARNING: use pixel or % for border-radius')

  let radiusTopLeftValue = 0
  if (radiusTopLeft.endsWith('px'))
    radiusTopLeftValue = parseInt(radiusTopLeft.slice(0, -2), 10)
  else if (radiusTopLeft.endsWith('%'))
    radiusTopLeftValue =
      (parseInt(radiusTopLeft.slice(0, -1), 10) *
        Math.min(element.offsetWidth, element.offsetHeight)) /
      100
  else console.log('WARNING: use pixel or % for border-radius')

  let radiusBottomRightValue = 0
  if (radiusBottomRight.endsWith('px'))
    radiusBottomRightValue = parseInt(radiusBottomRight.slice(0, -2), 10)
  else if (radiusBottomRight.endsWith('%'))
    radiusBottomRightValue =
      (parseInt(radiusBottomRight.slice(0, -1), 10) *
        Math.min(element.offsetWidth, element.offsetHeight)) /
      100
  else console.log('WARNING: use pixel for border-radius')

  let radiusBottomLeftValue = 0
  if (radiusBottomLeft.endsWith('px'))
    radiusBottomLeftValue = parseInt(radiusBottomLeft.slice(0, -2), 10)
  else if (radiusBottomLeft.endsWith('%'))
    radiusBottomLeftValue =
      (parseInt(radiusBottomLeft.slice(0, -1), 10) *
        Math.min(element.offsetWidth, element.offsetHeight)) /
      100
  else console.log('WARNING: use pixel for border-radius')

  const geom = {
    x,
    y,
    width: element.offsetWidth,
    height: element.offsetHeight,
    cx: x + element.offsetWidth / 2,
    cy: y + element.offsetHeight / 2,
    radiusTopRight: Math.min(
      radiusTopRightValue,
      element.offsetWidth / 2,
      element.offsetHeight / 2,
    ),
    radiusTopLeft: Math.min(
      radiusTopLeftValue,
      element.offsetWidth / 2,
      element.offsetHeight / 2,
    ),
    radiusBottomRight: Math.min(
      radiusBottomRightValue,
      element.offsetWidth / 2,
      element.offsetHeight / 2,
    ),
    radiusBottomLeft: Math.min(
      radiusBottomLeftValue,
      element.offsetWidth / 2,
      element.offsetHeight / 2,
    ),
    transform: matrix,
    xmin: x,
    ymin: y,
    xmax: x + element.offsetWidth,
    ymax: y + element.offsetHeight,
  }

  return geom
}

function combineBoundingBoxes(bb1, bb2) {
  if (!bb1 && !bb2) throw new Error("Both BB can't be undefined")
  if (!bb1) return bb2
  if (!bb2) return bb1

  return {
    xmin: Math.min(bb1.xmin, bb2.xmin),
    ymin: Math.min(bb1.ymin, bb2.ymin),
    xmax: Math.max(bb1.xmax, bb2.xmax),
    ymax: Math.max(bb1.ymax, bb2.ymax),
  }
}

function drawLine(x1, y1, x2, y2, color, width, parent) {
  const svg = getSVG(parent)
  const path = createPath(`M ${x1} ${y1} L ${x2} ${y2}`, 'none', color, width)
  svg.appendChild(path)
}

function drawCircle(x, y, radius, color, parent) {
  const svg = getSVG(parent)
  const shape = createSVGElement('circle')
  shape.setAttributeNS(null, 'cx', x)
  shape.setAttributeNS(null, 'cy', y)
  shape.setAttributeNS(null, 'r', radius)
  shape.setAttributeNS(null, 'fill', color)
  svg.appendChild(shape)
}

function drawRect(xmin, ymin, xmax, ymax, color, parent) {
  const width = xmax - xmin
  const height = ymax - ymin
  const svg = getSVG(parent)
  const shape = createSVGElement('rect')
  shape.setAttributeNS(null, 'x', xmin)
  shape.setAttributeNS(null, 'y', ymin)
  shape.setAttributeNS(null, 'width', width)
  shape.setAttributeNS(null, 'height', height)
  shape.setAttributeNS(null, 'stroke', color)
  shape.setAttributeNS(null, 'fill', 'none')
  svg.appendChild(shape)
}

function line(source, destination, color, width, startArrow, endArrow, parent) {
  const sourceElement = getElement(source)
  const destinationElement = getElement(destination)
  const sourceGeometry = getAbsoluteGeometry(sourceElement, parent)
  const destinationGeometry = getAbsoluteGeometry(destinationElement, parent)
  const contactSource = contactBox(
    sourceGeometry,
    destinationGeometry.cx,
    destinationGeometry.cy,
  )
  const contactDestination = contactBox(
    destinationGeometry,
    sourceGeometry.cx,
    sourceGeometry.cy,
  )
  drawLine(
    contactSource.x,
    contactSource.y,
    contactDestination.x,
    contactDestination.y,
    color,
    width,
    parent,
  )
  const size = 5
  const angle =
    (180 *
      Math.atan2(
        contactDestination.y - contactSource.y,
        contactDestination.x - contactSource.x,
      )) /
    Math.PI
  startArrow(
    contactSource.x,
    contactSource.y,
    angle + 180,
    color,
    size,
    width,
    parent,
  )
  endArrow(
    contactDestination.x,
    contactDestination.y,
    angle,
    color,
    size,
    width,
    parent,
  )
}

function HVLine(
  source,
  destination,
  color,
  width,
  startArrow,
  endArrow,
  parent,
) {
  const sourceElement = getElement(source)
  const destinationElement = getElement(destination)
  const sourceGeometry = getAbsoluteGeometry(sourceElement, parent)
  const destinationGeometry = getAbsoluteGeometry(destinationElement, parent)
  const corner = {
    cx: destinationGeometry.cx,
    cy: sourceGeometry.cy,
  }
  const contactSource = contactBox(sourceGeometry, corner.cx, corner.cy)
  const contactDestination = contactBox(
    destinationGeometry,
    corner.cx,
    corner.cy,
  )
  //drawLine(contactSource.x, contactSource.y, corner.cx, corner.cy, color, width, parent)
  //drawLine(corner.cx, corner.cy, contactDestination.x, contactDestination.y, color, width, parent)
  const radius = 10
  const hdir = contactDestination.x > contactSource.x ? 1 : -1
  const vdir = contactDestination.y > contactSource.y ? 1 : -1
  const svg = getSVG(parent)
  const path = createPath(
    `M ${contactSource.x} ${contactSource.y} L ${corner.cx - hdir * radius} ${corner.cy} A ${radius} ${radius} 0 0 ${hdir * vdir < 0 ? 0 : 1} ${corner.cx} ${corner.cy + vdir * radius} L ${contactDestination.x} ${contactDestination.y}`,
    'none',
    color,
    width,
  )
  svg.appendChild(path)
  const size = 5
  startArrow(
    contactSource.x,
    contactSource.y,
    sourceGeometry.cx < destinationGeometry.cx ? 180 : 0,
    color,
    size,
    width,
    parent,
  )
  endArrow(
    contactDestination.x,
    contactDestination.y,
    sourceGeometry.cy < destinationGeometry.cy ? 90 : 270,
    color,
    size,
    width,
    parent,
  )
}

export function arrow(x, y, angle, color, size, width, parent) {
  const svg = getSVG(parent)
  const path = createPath(
    `M ${-size} ${-size} L ${0} ${0} L ${-size} ${+size}`,
    'none',
    color,
    width,
  )
  path.setAttributeNS(
    null,
    'transform',
    `translate(${x} ${y}) rotate(${angle})`,
  )
  svg.appendChild(path)
}

export function noArrow(x, y, angle, color, size, width, parent) {}

export function backArrow(x, y, angle, color, size, width, parent) {
  const svg = getSVG(parent)
  const path = createPath(
    `M ${0} ${-size} L ${-1.5 * size} ${0} L ${0} ${+size}`,
    'white',
    color,
    width,
  )
  path.setAttributeNS(
    null,
    'transform',
    `translate(${x} ${y}) rotate(${angle})`,
  )
  svg.appendChild(path)
}

export function aggregation(x, y, angle, color, size, width, parent) {
  const svg = getSVG(parent)
  const path = createPath(
    `M ${-size} ${-size / 2} L ${0} ${0} L ${-size} ${+size / 2} L ${-2 * size} ${0} Z`,
    'white',
    color,
    width,
  )
  path.setAttributeNS(
    null,
    'transform',
    `translate(${x} ${y}) rotate(${angle})`,
  )
  svg.appendChild(path)
}

export function composition(x, y, angle, color, size, width, parent) {
  const svg = getSVG(parent)
  const path = createPath(
    `M ${-size} ${-size / 2} L ${0} ${0} L ${-size} ${+size / 2} L ${-2 * size} ${0} Z`,
    color,
    color,
    width,
  )
  path.setAttributeNS(
    null,
    'transform',
    `translate(${x} ${y}) rotate(${angle})`,
  )
  svg.appendChild(path)
}

export function inheritance(x, y, angle, color, size, width, parent) {
  const svg = getSVG(parent)
  const path = createPath(
    `M ${-1.6 * size} ${-size} L ${0} ${0} L ${-1.6 * size} ${+size} Z`,
    'white',
    color,
    width,
  )
  path.setAttributeNS(
    null,
    'transform',
    `translate(${x} ${y}) rotate(${angle})`,
  )
  svg.appendChild(path)
}

function setup(root, width, height) {
  const grid = document.createElement('div')
  grid.classList.add('grid')
  grid.style.width = String(width) + 'px'
  grid.style.height = String(height) + 'px'
  grid.style.position = 'relative'
  root.appendChild(grid)
  return grid
}

function Node(content) {
  content = content || ''
  const div = document.createElement('div')
  div.classList.add('node')
  const content_div = document.createElement('div')
  content_div.classList.add('content')
  content_div.innerHTML = content
  div.appendChild(content_div)

  const that = {
    elem: div,
    content: content_div,
    classes: (cls) => {
      if (cls && cls.length > 0) {
        if (!Array.isArray(cls)) cls = cls.split(' ')
        for (const cl of cls) {
          div.classList.add(cl)
        }
      } else {
        div.className = ''
      }
      return that
    },
    move: (row, column) => {
      that.row = row
      that.column = column
      div.style.gridColumnStart = column
      div.style.gridRowStart = row
      return that
    },
    belowOf: (node, inc) => {
      inc = inc || 1
      that.move(node.row + inc, node.column)
      return that
    },
    aboveOf: (node, inc) => {
      inc = inc || 1
      that.move(node.row - inc, node.column)
      return that
    },
    rightOf: (node, inc) => {
      inc = inc || 1
      that.move(node.row, node.column + inc)
      return that
    },
    leftOf: (node, inc) => {
      inc = inc || 1
      that.move(node.row, node.column - inc)
      return that
    },
    absolute: (node, dx, dy) => {
      node = getElement(node)
      //that.elem.removeAttribute('style')
      delete that.column
      delete that.row
      that.elem.remove()
      node.content.appendChild(that.elem)
      that.elem.style.position = 'absolute'
      that.elem.style.top = `${node.content.offsetHeight / 2 - that.elem.offsetHeight / 2 + dy}px` //`${node.content.offsetHeight/2 + dy - that.elem.offsetHeight/2}px`
      that.elem.style.left = `${node.content.offsetWidth / 2 - that.elem.offsetWidth / 2 + dx}px` //`${node.content.offsetWidth/2 + dx - that.elem.offsetWidth/2}px`
      return that
    },
    width: (value) => {
      that.elem.style.width = `${value}px`
      return that
    },
    height: (value) => {
      that.elem.style.height = `${value}px`
      return that
    },
  }

  that.move(1, 1)

  return that
}

function isNode(obj) {
  return obj.elem !== undefined
}

function charToArrow(c) {
  if (c === '>' || c === '<') return arrow
  if (c === 'i') return inheritance
  if (c === 'a') return aggregation
  if (c === 'c') return composition
  if (c === 'b') return backArrow
  return noArrow
}

function linePattern(pattern) {
  if (pattern.length === 2) {
    return {
      line: pattern,
      start: noArrow,
      end: noArrow,
    }
  }
  if (pattern.length === 3) {
    if (pattern[0] === '-' || pattern[0] === '|') {
      return {
        line: pattern.slice(0, 2),
        start: noArrow,
        end: charToArrow(pattern[2]),
      }
    } else {
      return {
        line: pattern.slice(1),
        start: charToArrow(pattern[0]),
        end: noArrow,
      }
    }
  }
  if (pattern.length === 4) {
    return {
      line: pattern.slice(1, 3),
      start: charToArrow(pattern[0]),
      end: charToArrow(pattern[3]),
    }
  }
}

export async function Draw(parent, width, height) {
  await document.fonts.ready
  parent = getElement(parent || document.body)
  parent.classList.add('draw-wrapper')

  const grid = setup(parent, width, height)
  let stroke_width = 1
  let stroke_color = 'black'
  const nodes = []

  const that = {
    stroke: (width, color) => {
      stroke_width = width || 1
      stroke_color = color || 'black'
      return that
    },
    line: (start, pattern, end) => {
      if (isNode(start)) start = start.elem
      else start = getElement(start)

      if (isNode(end)) end = end.elem
      else end = getElement(end)

      pattern = pattern || '--'
      pattern = linePattern(pattern)

      const f = () => {
        if (pattern.line === '--')
          line(
            start,
            end,
            stroke_color,
            stroke_width,
            pattern.start,
            pattern.end,
            grid,
          )
        if (pattern.line === '-|')
          HVLine(
            start,
            end,
            stroke_color,
            stroke_width,
            pattern.start,
            pattern.end,
            grid,
          )
        if (pattern.line === '|-')
          HVLine(
            end,
            start,
            stroke_color,
            stroke_width,
            pattern.end,
            pattern.start,
            grid,
          )
      }
      f()
      toRedraw.push(f)
      return that
    },
    polyline: (arr) => {
      for (let i = 0; i < arr.length - 2; i += 2) {
        const start = arr[i]
        const line = arr[i + 1]
        const end = arr[i + 2]
        that.line(start, line, end)
      }
      return that
    },
    node: (content) => {
      const n = Node(content)
      grid.appendChild(n.elem)
      nodes.push(n)
      return n
    },
    dummy: () => {
      return that.node().classes('dummy')
    },
    diamond: () => {
      return that.node().classes('diamond')
    },
    start: () => {
      return that.node().classes('start')
    },
    end: () => {
      return that.node().classes('end')
    },
    round: (content) => {
      return that.node(content).classes('round')
    },
    rect: (content) => {
      return that.node(content).classes('rect')
    },
    ellipse: (content) => {
      return that.node(content).classes('ellipse')
    },
    done: () => {
      let bb = undefined
      for (const node of nodes) {
        const geom = getAbsoluteGeometry(node.elem, grid)
        bb = combineBoundingBoxes(bb, geom)
      }
      grid.style.left = `${width / 2 - (bb.xmin + bb.xmax) / 2}px`
      grid.style.top = `${height / 2 - (bb.ymin + bb.ymax) / 2}px`
    },
  }

  return that
}

export default Draw
