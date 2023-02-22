import { SVG } from './svg.esm.js'
import { step, gridSize } from './config.js'

export function innerWidth() {
    return step * (gridSize-1)
}

export function innerHeight() {
    return step * (gridSize-1)
}

export function offsetX() {
    return 18 + 20
}

export function offsetY() {
    return step + 10
}

export function outerWidth() {
    return innerWidth() + 2*offsetX()
}

export function gridX(x) {
  return (x-offsetX()) / step
}

export function gridY(y) {
  return (y-offsetY()) / step
}

export function grid2X(x) {
  return (x * step) + offsetX()
}

export function grid2Y(y) {
  return (y * step) + offsetY()
}

export function outerHeight() {
    return innerHeight() + 2*offsetY()
}

export function snapX(x) {
    return Math.round((x-offsetX())/step)*step + offsetX()
}

export function snapY(y) {
    return Math.round((y-offsetY())/step)*step + offsetY()
}

export const canvas = SVG().addTo('#simulation').size(outerWidth(), outerHeight())

function init() {
    canvas.clear()
    document.body.style.width = `${outerWidth()}px`
    const border = canvas.rect(outerWidth(), outerHeight()).fill('#222')
    const back = canvas.rect(outerWidth()-20, outerHeight()-20).cx(border.cx()).cy(border.cy()).fill('#555')
    const outline = canvas.rect(innerWidth()+2*18, innerHeight()+2*step+2).cx(border.cx()).cy(border.cy()).fill({opacity: 0}).stroke({color: '#222', width: 2})
    const workspace = canvas.rect(innerWidth()+step, innerHeight()+step).move(offsetX()-step/2, offsetY()-step/2).fill({opacity: 0})
    const grid = canvas.group().id('grid')
    for(let i = 0; i < gridSize; i++) {
        for(let j = 0; j < gridSize; j++) {
            grid.circle(1).center(i*step+offsetX(), j*step+offsetY()).fill('#222')
        }
    }
    const inputSide = canvas.rect(20, outerHeight()-20).move(0, 10).id('ins').fill({color: 'red', opacity: 0})
    const outputSide = canvas.rect(20, outerHeight()-20).move(outerWidth()-20, 10).id('outs').fill({color: 'red', opacity: 0})
    const wires = canvas.group().id('wires')

    return {
        inputSide, outputSide, workspace, wires
    }
}

export const {inputSide, outputSide, workspace, wires} = init()
