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
        g.setAttribute('transform', 'translate(0.5,0.5)')
        g.setAttribute('class', 'center-pixel')
        svg.appendChild(g)
    }
    const g = svg.querySelector('.center-pixel')
    return g
}

function sdfRoundedBox(x, y, geom) {
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
        d = sdfRoundedBox(midX-geom.cx, midY-geom.cy, geom)
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
    const radiusTopRight = window.getComputedStyle(element).borderTopRightRadius
    const radiusTopLeft = window.getComputedStyle(element).borderTopLeftRadius
    const radiusBottomRight = window.getComputedStyle(element).borderBottomRightRadius
    const radiusBottomLeft = window.getComputedStyle(element).borderBottomLeftRadius
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
        radiusBottomLeft: Math.min(parseInt(radiusBottomLeft.slice(0, -2), 10), element.offsetWidth/2, element.offsetHeight/2)
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
    const size = 10
    const angle = 180*Math.atan2(contactDestination.y - contactSource.y, contactDestination.x - contactSource.x)/Math.PI
    startArrow(contactSource.x, contactSource.y, angle+180, color, size, width, parent)
    endArrow(contactDestination.x, contactDestination.y, angle, color, size, width, parent)
}

export function simpleArrow(x, y, angle, color, size, width, parent) {
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

export function Context(context) {
    if(context === undefined) context = {
        parent: document.body,
        width: 1,
        color: "black",
        startTarget: null,
        startArrow: noArrow,
        endTarget: null,
        endArrow: noArrow
    }

    return {
        parent: (parent) => {
            const newContext = { ...context }
            newContext.parent = parent
            return Context(newContext)
        },
        stroke: (width, color) => {
            const newContext = { ...context }
            newContext.width = width
            newContext.color = color
            return Context(newContext)
        },
        start: (target, arrow) => {
            const newContext = { ...context }
            newContext.startTarget = target
            newContext.startArrow = arrow
            return Context(newContext)
        },
        end: (target, arrow) => {
            const newContext = { ...context }
            newContext.endTarget = target
            newContext.endArrow = arrow
            return Context(newContext)
        },
        line: () => {
            const f = () => {
                line(context.startTarget, context.endTarget, context.color, context.width, context.startArrow, context.endArrow, context.parent)
            }
            f()
            toRedraw.push(f)
            return Context(context)
        }
    }
}