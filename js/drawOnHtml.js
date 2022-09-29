function getElement(element) {
    if(element === undefined) {
        return document.body
    }
    if(typeof element === "string") {
        return document.querySelector(element)
    }
    else return element
}

function getSVG(parent) {
    const parentElement = getElement(parent)
    let svg = parentElement.querySelector('.svg-drawOnHtml')
    if (svg === null) {
        svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
        svg.setAttribute('class', 'svg-drawOnHtml')
        svg.setAttribute('style', 'position:absolute;top:0px;left:0px')
        svg.setAttribute('width', parentElement.clientWidth)
        svg.setAttribute('height', parentElement.clientHeight)
        svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink")
        parentElement.appendChild(svg)
    }
    return svg
}

function contactBox(cx, cy, width, height, radiusTopRight, radiusBottomRight, radiusTopLeft, radiusBottomLeft, toX, toY) {
    let inX = cx
    let inY = cy
    let outX = toX
    let outY = toY
    let midX, midY
    do {
        midX = (inX + outX) / 2
        midY = (inY + outY) / 2
        d = sdfRoundedBox(midX-cx, midY-cy, width, height, radiusTopRight, radiusBottomRight, radiusTopLeft, radiusBottomLeft)
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
        console.log(el)
        x += el.offsetLeft
        y += el.offsetTop
        el = el.offsetParent
    }
    const borderRadius = window.getComputedStyle(element).borderRadius
    const radiusTopRight = window.getComputedStyle(element).borderTopRightRadius
    const radiusTopLeft = window.getComputedStyle(element).borderTopLeftRadius
    const radiusBottomRight = window.getComputedStyle(element).borderBottomRightRadius
    const radiusBottomLeft = window.getComputedStyle(element).borderBottomLeftRadius
    if(!radiusTopRight.endsWith('px')) console.log("WARNING: use pixel for border-radius")
    if(!radiusTopLeft.endsWith('px')) console.log("WARNING: use pixel for border-radius")
    if(!radiusBottomRight.endsWith('px')) console.log("WARNING: use pixel for border-radius")
    if(!radiusBottomLeft.endsWith('px')) console.log("WARNING: use pixel for border-radius")
    return {
        x,
        y,
        width: element.offsetWidth,
        height: element.offsetHeight,
        cx: x + element.offsetWidth/2,
        cy: y + element.offsetHeight/2,
        radiusTopRight: parseInt(radiusTopRight.slice(0, -2), 10),
        radiusTopLeft: parseInt(radiusTopLeft.slice(0, -2), 10),
        radiusBottomRight: parseInt(radiusBottomRight.slice(0, -2), 10),
        radiusBottomLeft: parseInt(radiusBottomLeft.slice(0, -2), 10)
    };
}

function drawLine(x1, y1, x2, y2, color, width, parent) {
    var svg = getSVG(parent);
    var shape = document.createElementNS("http://www.w3.org/2000/svg", "path");
    var path=`M ${x1} ${y1} L ${x2} ${y2}`
    shape.setAttributeNS(null, "d", path);
    shape.setAttributeNS(null, "fill", "none");
    shape.setAttributeNS(null, "stroke", color);
    shape.setAttributeNS(null, "stroke-width", width);
    svg.appendChild(shape);
}

function drawCircle(x, y, radius, color, parent) {
    const svg = getSVG(parent);
    const shape = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    shape.setAttributeNS(null, "cx", x);
    shape.setAttributeNS(null, "cy", y);
    shape.setAttributeNS(null, "r",  radius);
    shape.setAttributeNS(null, "fill", color);
    svg.appendChild(shape);
}

function drawArrow(source, destination, color, width, startArrow, endArrow, parent) {
    const sourceElement = getElement(source)
    const destinationElement = getElement(destination)
    const sourceGeometry = getAbsoluteGeometry(sourceElement, parent)
    const destinationGeometry = getAbsoluteGeometry(destinationElement, parent)
    contactSource = contactBox(sourceGeometry.cx, sourceGeometry.cy, sourceGeometry.width, sourceGeometry.height, sourceGeometry.radiusTopRight, sourceGeometry.radiusBottomRight, sourceGeometry.radiusTopLeft, sourceGeometry.radiusBottomLeft, destinationGeometry.cx, destinationGeometry.cy)
    contactDestination = contactBox(destinationGeometry.cx, destinationGeometry.cy, destinationGeometry.width, destinationGeometry.height, destinationGeometry.radiusTopRight, destinationGeometry.radiusBottomRight, destinationGeometry.radiusTopLeft, destinationGeometry.radiusBottomLeft, sourceGeometry.cx, sourceGeometry.cy)
    drawLine(contactSource.x, contactSource.y, contactDestination.x, contactDestination.y, color, width, parent)
    const size = 10
    const angle = 180*Math.atan2(contactDestination.y - contactSource.y, contactDestination.x - contactSource.x)/Math.PI
    startArrow(contactSource.x, contactSource.y, angle+180, color, size, width, parent)
    endArrow(contactDestination.x, contactDestination.y, angle, color, size, width, parent)
}

function simpleArrow(x, y, angle, color, size, width, parent) {
    var svg = getSVG(parent);
    var shape = document.createElementNS("http://www.w3.org/2000/svg", "path");
    var path=`M ${-size} ${-size} L ${0} ${0} L ${-size} ${+size}`
    shape.setAttributeNS(null, "d", path);
    shape.setAttributeNS(null, "fill", "none");
    shape.setAttributeNS(null, "stroke", color);
    shape.setAttributeNS(null, "stroke-width", width);
    shape.setAttributeNS(null, "transform", `translate(${x} ${y}) rotate(${angle})`);
    svg.appendChild(shape);
}

function noArrow(x, y, angle, color, size, width, parent) {}

function backArrow(x, y, angle, color, size, width, parent) {
    var svg = getSVG(parent);
    var shape = document.createElementNS("http://www.w3.org/2000/svg", "path");
    var path=`M ${0} ${-size} L ${-1.5*size} ${0} L ${0} ${+size}`
    shape.setAttributeNS(null, "d", path);
    shape.setAttributeNS(null, "fill", "white");
    shape.setAttributeNS(null, "stroke", color);
    shape.setAttributeNS(null, "stroke-width", width);
    shape.setAttributeNS(null, "transform", `translate(${x} ${y}) rotate(${angle})`);
    svg.appendChild(shape);
}

function aggregation(x, y, angle, color, size, width, parent) {
    var svg = getSVG(parent);
    var shape = document.createElementNS("http://www.w3.org/2000/svg", "path");
    var path=`M ${-size} ${-size/2} L ${0} ${0} L ${-size} ${+size/2} L ${-2*size} ${0} Z`
    shape.setAttributeNS(null, "d", path);
    shape.setAttributeNS(null, "fill", "white");
    shape.setAttributeNS(null, "stroke", color);
    shape.setAttributeNS(null, "stroke-width", width);
    shape.setAttributeNS(null, "transform", `translate(${x} ${y}) rotate(${angle})`);
    svg.appendChild(shape);
}

function composition(x, y, angle, color, size, width, parent) {
    var svg = getSVG(parent);
    var shape = document.createElementNS("http://www.w3.org/2000/svg", "path");
    var path=`M ${-size} ${-size/2} L ${0} ${0} L ${-size} ${+size/2} L ${-2*size} ${0} Z`
    shape.setAttributeNS(null, "d", path);
    shape.setAttributeNS(null, "fill", color);
    shape.setAttributeNS(null, "stroke", color);
    shape.setAttributeNS(null, "stroke-width", width);
    shape.setAttributeNS(null, "transform", `translate(${x} ${y}) rotate(${angle})`);
    svg.appendChild(shape);
}

function inheritance(x, y, angle, color, size, width, parent) {
    var svg = getSVG(parent);
    var shape = document.createElementNS("http://www.w3.org/2000/svg", "path");
    var path=`M ${-1.6*size} ${-size} L ${0} ${0} L ${-1.6*size} ${+size} Z`
    shape.setAttributeNS(null, "d", path);
    shape.setAttributeNS(null, "fill", "white");
    shape.setAttributeNS(null, "stroke", color);
    shape.setAttributeNS(null, "stroke-width", width);
    shape.setAttributeNS(null, "transform", `translate(${x} ${y}) rotate(${angle})`);
    svg.appendChild(shape);
}

function sdfRoundedBox(x, y, width, height, radiusTopRight, radiusBottomRight, radiusTopLeft, radiusBottomLeft) {
    radiusBottomRight = x > 0 ? radiusBottomRight : radiusBottomLeft
    radiusTopRight = x > 0 ? radiusTopRight : radiusTopLeft
    radiusBottomRight = y > 0 ? radiusBottomRight : radiusTopRight
    const qx = Math.abs(x) - width/2 + radiusBottomRight
    const qy = Math.abs(y) - height/2 + radiusBottomRight
    return Math.min(Math.max(qx, qy), 0.0) + Math.sqrt(Math.pow(Math.max(qx, 0), 2) + Math.pow(Math.max(qy, 0), 2)) - radiusBottomRight
}


function stroke(parent, width, color) {
    return {
        start: (target, arrow) => {},
        end: (target, arrow) => {}
    }
}

function parent(parent) {
    return {
        stroke: (width, color) => stroke(parent, width, color)
    }
}

function Context(context) {
    console.log(context)
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
            drawArrow(context.startTarget, context.endTarget, context.color, context.width, context.startArrow, context.endArrow, context.parent)
            return Context(context)
        }
    }
}