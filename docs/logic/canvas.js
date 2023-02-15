import { SVG, Color } from './svg.esm.js'
import {width, height} from './config.js'

const canvas = SVG().addTo('#simulation').size(width, height)

export function init() {
    canvas.clear()
    canvas.rect(width, height).fill('#222')
    canvas.rect(width-20, height-20).move(10, 10).fill('#555')
    canvas.rect(width-40, height-10).center(width/2, height/2).fill({opacity: 0}).stroke({color: '#222', width: 2})
    const inputSide = canvas.rect(20, height-20).move(0, 10).id('ins').fill({opacity: 0})
    const outputSide = canvas.rect(20, height-20).move(width-20, 10).id('outs').fill({opacity: 0})
    const wires = canvas.group()

    return {
        canvas, inputSide, outputSide, wires
    }
}