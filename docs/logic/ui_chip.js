import { snapX, snapY } from './canvas.js'
import {step} from './config.js'
import {UiConnector} from './connector.js'
import { addElement, removeElement } from './current.js'
import { draggable } from './draggable.js'
import { showMenu } from './menu.js'
import { Color } from './svg.esm.js'
import { getForegroundColor } from './utils.js'


export function UiChip(canvas, label, inputs, outputs, color, id) {
    let _x = 0
    let _y = 0

    const that = {}

    const group = canvas.group()

    const {r, g, b} = (new Color(color)).rgb()
    const foreground = getForegroundColor(r, g, b)

    const text = group.text(label.replace(' ', '\n')).fill(foreground)
    const boxWidth = Math.ceil((text.bbox().width+20)/step) * step

    const inputsHeight = (Object.keys(inputs).length) * step * 2
    const outputsHeight = (Object.keys(outputs).length) * step * 2
    const connectorsHeight = Math.max(inputsHeight, outputsHeight)
    const textHeight = Math.ceil((text.bbox().height)/step) * step
    const boxHeight = Math.max(connectorsHeight, textHeight)

    const rect = group.rect(boxWidth, boxHeight).fill(color)
    rect.after(text) // Put text after rect

    const uiConnectors = []

    let connectorRelativeY = -(inputs.length - 1) * step
    for(const connector of inputs) {
        uiConnectors.push(UiConnector(group, -boxWidth/2, connectorRelativeY, that, connector))
        connectorRelativeY += step*2
    }

    connectorRelativeY = -(outputs.length - 1) * step
    for(const connector of outputs) {
        uiConnectors.push(UiConnector(group, boxWidth/2, connectorRelativeY, that, connector))
        connectorRelativeY += step*2
    }

    
    that.x = () => _x
    that.y = () => _y
    that.on = (eventType, handler) => {
            rect.on(eventType, handler)
        }
    that.off = (eventType, handler) => {
            rect.off(eventType, handler)
        }
    that.destroy = () => {
            for(const uiConnector of uiConnectors) {
                uiConnector.destroy()
            }
            group.remove()
            removeElement(that)
        }
    that.move = (x, y) => {
            x = snapX(x)
            y = snapY(y)
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
    that.getConnector = label => {
      return uiConnectors.find(conn => conn.getLabel() === label)
    }

    draggable(that)

    that.on('contextmenu', event => {
        showMenu(event.offsetX, event.offsetY, [
            {label: 'Delete', action: () => {that.destroy()}},
            {label: 'Move', action: () => {that.startDrag()}}
        ])
        event.preventDefault()
    })
    
    addElement(that, id)
    return that
}
