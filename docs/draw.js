const toRedraw = []

addEventListener('resize', (event) => {
    const svgs = document.querySelectorAll('.svg-drawOnHtml')
    svgs.forEach((svg) => {
        svg.remove()
    })
    for(let f of toRedraw) {
        f()
    }
});

function getElement(element) {
    if(element === undefined) {
        return document.body
    }
    if(typeof element === "string") {
        return document.querySelector(element)
    }
    else return element
}

function createSVGElement(tagname) {
    return document.createElementNS("http://www.w3.org/2000/svg", tagname)
}

function createPath(path, fillColor, strokeColor, strokeWidth) {
    const shape = createSVGElement("path")
    shape.setAttributeNS(null, "d", path)
    shape.setAttributeNS(null, "fill", fillColor)
    shape.setAttributeNS(null, "stroke", strokeColor)
    shape.setAttributeNS(null, "stroke-width", strokeWidth)
    return shape
}

function getSVG(parent) {
    const parentElement = getElement(parent)
    let svg = parentElement.querySelector('.svg-drawOnHtml')
    if (svg === null) {
        svg = createSVGElement("svg")
        svg.setAttribute('class', 'svg-drawOnHtml')
        svg.setAttribute('style', 'position:absolute;top:0px;left:0px')
        svg.setAttribute('width', parentElement.clientWidth)
        svg.setAttribute('height', parentElement.clientHeight)
        svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink")
        parentElement.appendChild(svg)

        const g = createSVGElement("g")
        g.setAttribute('transform', 'translate(-0.5, -0.5)')
        g.setAttribute('class', 'center-pixel')
        svg.appendChild(g)
    }
    const g = svg.querySelector('.center-pixel')
    return g
}

function sdfRoundedBox(x, y, geom) {
    const matrix = inv2D(geom.transform)
    const new_x = matrix[0]*x + matrix[1]*y
    const new_y = matrix[2]*x + matrix[3]*y
    x = new_x
    y = new_y
    const radiusBottom = x > 0 ? geom.radiusBottomRight : geom.radiusBottomLeft
    const radiusTop = x > 0 ? geom.radiusTopRight : geom.radiusTopLeft
    const radius = y > 0 ? radiusBottom : radiusTop
    const qx = Math.abs(x) - geom.width/2 + radius
    const qy = Math.abs(y) - geom.height/2 + radius
    return Math.min(Math.max(qx, qy), 0.0) + Math.sqrt(Math.pow(Math.max(qx, 0), 2) + Math.pow(Math.max(qy, 0), 2)) - radius
}

function contactBox(geom, toX, toY) {
    let inX = geom.cx
    let inY = geom.cy
    let outX = toX
    let outY = toY
    let midX, midY
    let d
    do {
        midX = (inX + outX) / 2
        midY = (inY + outY) / 2
        d = sdfRoundedBox(midX-geom.cx, midY-geom.cy, geom, 0)
        if(d < 0) {
            inX = midX
            inY = midY
        }
        else {
            outX = midX
            outY = midY
        }
    } while(Math.abs(d) > 0.1)

    return {
        x: midX,
        y: midY,
    }
}

function inv2D(matrix) {
    const [a, b, c, d] = matrix
    const det = a*d-b*c
    return [d/det, -b/det, -c/det, a/det]
}

function getAbsoluteGeometry(element, parent) {
    let x = 0
    let y = 0
    element = getElement(element)
    let el = element
    const parentElement = getElement(parent)
    while(el !== parentElement) {
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
    if(transform !== 'none')
        matrix = transform.split('(')[1].split(')')[0].split(',').map(s => parseFloat(s.trim())).slice(0, 4)
    if(!radiusTopRight.endsWith('px')) console.log("WARNING: use pixel for border-radius")
    if(!radiusTopLeft.endsWith('px')) console.log("WARNING: use pixel for border-radius")
    if(!radiusBottomRight.endsWith('px')) console.log("WARNING: use pixel for border-radius")
    if(!radiusBottomLeft.endsWith('px')) console.log("WARNING: use pixel for border-radius")
    const geom =  {
        x,
        y,
        width: element.offsetWidth,
        height: element.offsetHeight,
        cx: x + element.offsetWidth/2,
        cy: y + element.offsetHeight/2,
        radiusTopRight: Math.min(parseInt(radiusTopRight.slice(0, -2), 10), element.offsetWidth/2, element.offsetHeight/2),
        radiusTopLeft: Math.min(parseInt(radiusTopLeft.slice(0, -2), 10), element.offsetWidth/2, element.offsetHeight/2),
        radiusBottomRight: Math.min(parseInt(radiusBottomRight.slice(0, -2), 10), element.offsetWidth/2, element.offsetHeight/2),
        radiusBottomLeft: Math.min(parseInt(radiusBottomLeft.slice(0, -2), 10), element.offsetWidth/2, element.offsetHeight/2),
        transform: matrix
    }

    return geom
}

function drawLine(x1, y1, x2, y2, color, width, parent) {
    const svg = getSVG(parent)
    const path = createPath(`M ${x1} ${y1} L ${x2} ${y2}`, "none", color, width)
    svg.appendChild(path)
}

function drawCircle(x, y, radius, color, parent) {
    const svg = getSVG(parent);
    const shape = createSVGElement("circle")
    shape.setAttributeNS(null, "cx", x);
    shape.setAttributeNS(null, "cy", y);
    shape.setAttributeNS(null, "r",  radius);
    shape.setAttributeNS(null, "fill", color);
    svg.appendChild(shape);
}

function line(source, destination, color, width, startArrow, endArrow, parent) {
    const sourceElement = getElement(source)
    const destinationElement = getElement(destination)
    const sourceGeometry = getAbsoluteGeometry(sourceElement, parent)
    const destinationGeometry = getAbsoluteGeometry(destinationElement, parent)
    const contactSource = contactBox(sourceGeometry, destinationGeometry.cx, destinationGeometry.cy)
    const contactDestination = contactBox(destinationGeometry, sourceGeometry.cx, sourceGeometry.cy)
    drawLine(contactSource.x, contactSource.y, contactDestination.x, contactDestination.y, color, width, parent)
    const size = 5
    const angle = 180*Math.atan2(contactDestination.y - contactSource.y, contactDestination.x - contactSource.x)/Math.PI
    startArrow(contactSource.x, contactSource.y, angle+180, color, size, width, parent)
    endArrow(contactDestination.x, contactDestination.y, angle, color, size, width, parent)
}

function HVLine(source, destination, color, width, startArrow, endArrow, parent) {
    const sourceElement = getElement(source)
    const destinationElement = getElement(destination)
    const sourceGeometry = getAbsoluteGeometry(sourceElement, parent)
    const destinationGeometry = getAbsoluteGeometry(destinationElement, parent)
    const corner = {
        cx: destinationGeometry.cx,
        cy: sourceGeometry.cy,
    }
    const contactSource = contactBox(sourceGeometry, corner.cx, corner.cy)
    const contactDestination = contactBox(destinationGeometry, corner.cx, corner.cy)
    drawLine(contactSource.x, contactSource.y, corner.cx, corner.cy, color, width, parent)
    drawLine(corner.cx, corner.cy, contactDestination.x, contactDestination.y, color, width, parent)
    const size = 5
    startArrow(contactSource.x, contactSource.y, sourceGeometry.cx < destinationGeometry.cx ? 180 : 0, color, size, width, parent)
    endArrow(contactDestination.x, contactDestination.y, sourceGeometry.cy < destinationGeometry.cy ? 90 : 270, color, size, width, parent)
}

export function arrow(x, y, angle, color, size, width, parent) {
    const svg = getSVG(parent)
    const path = createPath(`M ${-size} ${-size} L ${0} ${0} L ${-size} ${+size}`, "none", color, width)
    path.setAttributeNS(null, "transform", `translate(${x} ${y}) rotate(${angle})`)
    svg.appendChild(path)
}

export function noArrow(x, y, angle, color, size, width, parent) {}

export function backArrow(x, y, angle, color, size, width, parent) {
    const svg = getSVG(parent);
    const path = createPath(`M ${0} ${-size} L ${-1.5*size} ${0} L ${0} ${+size}`, "white", color, width)
    path.setAttributeNS(null, "transform", `translate(${x} ${y}) rotate(${angle})`)
    svg.appendChild(path)
}

export function aggregation(x, y, angle, color, size, width, parent) {
    const svg = getSVG(parent);
    const path = createPath(`M ${-size} ${-size/2} L ${0} ${0} L ${-size} ${+size/2} L ${-2*size} ${0} Z`, "white", color, width)
    path.setAttributeNS(null, "transform", `translate(${x} ${y}) rotate(${angle})`)
    svg.appendChild(path)
}

export function composition(x, y, angle, color, size, width, parent) {
    const svg = getSVG(parent);
    const path = createPath(`M ${-size} ${-size/2} L ${0} ${0} L ${-size} ${+size/2} L ${-2*size} ${0} Z`, color, color, width)
    path.setAttributeNS(null, "transform", `translate(${x} ${y}) rotate(${angle})`)
    svg.appendChild(path)
}

export function inheritance(x, y, angle, color, size, width, parent) {
    const svg = getSVG(parent);
    const path = createPath(`M ${-1.6*size} ${-size} L ${0} ${0} L ${-1.6*size} ${+size} Z`, "white", color, width)
    path.setAttributeNS(null, "transform", `translate(${x} ${y}) rotate(${angle})`)
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
    div.innerHTML = content
    
    const that = {
        elem: div,
        classes: cls => {
            if(cls && cls.length > 0) {
                if(!Array.isArray(cls))
                    cls = cls.split(' ')
                for(const cl of cls) {
                    div.classList.add(cl)
                }
            }
            else {
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
    }

    that.move(1, 1)

    return that
}

function isContext(obj) {
    return obj.startTarget !== undefined && obj.endTarget !== undefined
}

function isNode(obj) {
    return obj.elem !== undefined && obj.column !== undefined && obj.row !== undefined
}

function charToArrow(c) {
    if(c === '>' || c === '<')
        return arrow
    if(c === 'i')
        return inheritance
    if(c === 'a')
        return aggregation
    if(c === 'c')
        return composition
    if(c === 'b')
        return backArrow
    return noArrow
}

function linePattern(pattern) {
    if(pattern.length === 2) {
        return {
            line: pattern,
            start: noArrow,
            end: noArrow
        }
    }
    if(pattern.length === 3) {
        if(pattern[0] === '-' || pattern[0] === '|') {
            return {
                line: pattern.slice(0, 2),
                start: noArrow,
                end: charToArrow(pattern[2])
            }
        }
        else {
            return {
                line: pattern.slice(1),
                start: charToArrow(pattern[0]),
                end: noArrow
            }
        }
    }
    if(pattern.length === 4) {
        return {
            line: pattern.slice(1, 3),
            start: charToArrow(pattern[0]),
            end: charToArrow(pattern[3])
        }
    }
}

export function Context(context, width, height) {
    context = context || document.body
    if(!isContext(context)) {
        const parent = getElement(context)
        context = {
            parent,
            width,
            height,
            grid: setup(parent, width, height),
            width: 1,
            color: "black",
            startTarget: null,
            endTarget: null,
        }
    }

    const that = {
        stroke: (width, color) => {
            const newContext = { ...context }
            newContext.width = width || 1
            newContext.color = color || 'black'
            return Context(newContext)
        },
        start: (target) => {
            const newContext = { ...context }
            if(isNode(target))
                newContext.startTarget = target.elem
            else
                newContext.startTarget = getElement(target)
            return Context(newContext)
        },
        end: (target) => {
            const newContext = { ...context }
            if(isNode(target))
                newContext.endTarget = target.elem
            else
                newContext.endTarget = getElement(target)
            return Context(newContext)
        },
        line: (pattern) => {
            pattern = pattern || '--'
            pattern = linePattern(pattern)
            const f = () => {
                if(pattern.line === '--')
                    line(context.startTarget, context.endTarget, context.color, context.width, pattern.start, pattern.end, context.grid)
                if(pattern.line === '-|')
                    HVLine(context.startTarget, context.endTarget, context.color, context.width, pattern.start, pattern.end, context.grid)
                if(pattern.line === '|-')
                    HVLine(context.endTarget, context.startTarget, context.color, context.width, pattern.end, pattern.start, context.grid)
            }
            f()
            toRedraw.push(f)
            return Context(context)
        },
        polyline: arr => {
            for(let i=0; i<arr.length-2; i+=2) {
                const start = arr[i]
                const line = arr[i+1]
                const end = arr[i+2]
                that.start(start).end(end).line(line)
            }
        },
        node: (content) => {
            const n = Node(content)
            context.grid.appendChild(n.elem)
            return n
        },
        dummy: () => {
            return that.node().classes('dummy')
        },
        diamond: () => {
            return that.node().classes('diamond')
        },
        startNode: () => {
            return that.node().classes('start')
        },
        endNode: () => {
            return that.node().classes('end')
        },
        round: (content) => {
            return that.node(content).classes('round')
        },
        rect: (content) => {
            return that.node(content).classes('rect')
        }
    }

    return that
}

export default {Context, inheritance, composition, arrow, noArrow, backArrow, aggregation}