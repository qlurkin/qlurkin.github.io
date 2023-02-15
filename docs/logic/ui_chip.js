import {step} from './config.js'
import {UiConnector} from './connector.js'

export function UiChip(canvas, label, x, y, inputs, outputs, color) {
    if(!color) color = 'yellow'

    const group = canvas.group()

    const text = group.text(label.replace(' ', '\n'))
    const boxWidth = Math.ceil((text.bbox().width+20)/step) * step

    const inputsHeight = (Object.keys(inputs).length+1) * step
    const outputsHeight = (Object.keys(outputs).length+1) * step
    const connectorsHeight = Math.max(inputsHeight, outputsHeight)
    const textHeight = Math.ceil((text.bbox().height)/step) * step
    const boxHeight = Math.max(connectorsHeight, textHeight)

    const inputsX = x
    const outputsX = x + boxWidth
    const boxX = x
    const boxY = y + (inputs.length-1) * step - boxHeight / 2

    const rect = group.rect(boxWidth, boxHeight).move(boxX, boxY).fill(color)
    rect.after(text) // Put text after rect
    text.cx(rect.cx())
    text.cy(rect.cy())

    let connectorY = y
    for(const connector of inputs) {
        UiConnector(group, inputsX, connectorY, connector)
        connectorY += step*2
    }

    connectorY = boxY + boxHeight/2 - (outputs.length-1)*step
    for(const connector of outputs) {
        UiConnector(group, outputsX, connectorY, connector)
        connectorY += step*2
    }

    return {
        x, y,
        on: (eventType, handler) => {
            rect.on(eventType, handler)
        }
    }
}