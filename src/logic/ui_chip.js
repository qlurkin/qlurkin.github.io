import {step} from './config.js'
import {UiConnector} from './connector.js'
import { draggable } from './draggable.js'
import { showMenu } from './menu.js'


export function UiChip(canvas, label, inputs, outputs, color) {
    let _x = 0
    let _y = 0

    if(!color) color = 'yellow'

    const group = canvas.group()

    const text = group.text(label.replace(' ', '\n'))
    const boxWidth = Math.ceil((text.bbox().width+20)/step) * step

    const inputsHeight = (Object.keys(inputs).length+1) * step
    const outputsHeight = (Object.keys(outputs).length+1) * step
    const connectorsHeight = Math.max(inputsHeight, outputsHeight)
    const textHeight = Math.ceil((text.bbox().height)/step) * step
    const boxHeight = Math.max(connectorsHeight, textHeight)

    const rect = group.rect(boxWidth, boxHeight).fill(color)
    rect.after(text) // Put text after rect

    const uiConnectors = []

    let connectorRelativeY = -(inputs.length - 1) * step
    for(const connector of inputs) {
        uiConnectors.push(UiConnector(group, -boxWidth/2, connectorRelativeY, connector))
        connectorRelativeY += step*2
    }

    connectorRelativeY = -(outputs.length - 1) * step
    for(const connector of outputs) {
        uiConnectors.push(UiConnector(group, boxWidth/2, connectorRelativeY, connector))
        connectorRelativeY += step*2
    }

    const that = {
        x: () => _x,
        y: () => _y,
        on: (eventType, handler) => {
            rect.on(eventType, handler)
        },
        off: (eventType, handler) => {
            rect.off(eventType, handler)
        },
        destroy: () => {
            for(const uiConnector of uiConnectors) {
                uiConnector.destroy()
            }
            group.remove()
        },
        move: (x, y) => {
            _x = x
            _y = y
            //const boxX = x
            //const boxY = y + (inputs.length-1) * step - boxHeight / 2
            rect.center(x, y)
            text.cx(rect.cx())
            text.cy(rect.cy())
            for(const uiConnector of uiConnectors) {
                uiConnector.move(x, y)
            }
            return that
        }
    }

    draggable(that)

    that.on('contextmenu', event => {
        showMenu(event.offsetX, event.offsetY, [
            {label: 'Delete', action: () => {that.destroy()}},
            {label: 'Move', action: () => {that.startDrag()}}
        ])
        event.preventDefault()
    })

    return that
}