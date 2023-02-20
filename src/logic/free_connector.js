import { snapX, snapY } from './canvas.js'
import {UiConnector} from './connector.js'
import { draggable } from './draggable.js'
import { showMenu } from './menu.js'
import { Connector } from './connector.js'
import { addElement, removeElement } from './current.js'

function free_connector() {
    const connector = Connector('')

    return {
        connector
    }
}

function ui(canvas, logic) {
    let _x = 0
    let _y = 0
    const that = {}

    const group = canvas.group()

    const uiConnector = UiConnector(group, 0, 0, that, logic.connector)

    that.type = 'CONNECTOR',
    that.uiConnector = uiConnector
    that.x = () => _x
    that.y = () => _y
    that.on = (eventType, handler) => {
            uiConnector.on(eventType, handler)
        }
    that.off = (eventType, handler) => {
            uiConnector.off(eventType, handler)
        }
    that.destroy = () => {
            uiConnector.destroy()
            group.remove()
            removeElement(that)
        }
    that.move = (x, y) => {
            x = snapX(x)
            y = snapY(y)
            _x = x
            _y = y
            uiConnector.move(x, y)
            return that
        }

    draggable(that, false)

    that.onStartDrag = () => {
        uiConnector.ghost(true)
    }

    that.afterDrop = () => {
        uiConnector.ghost(false)
    }

    that.on('contextmenu', event => {
        showMenu(event.offsetX, event.offsetY, [
            {label: 'Delete', action: () => {that.destroy()}},
            {label: 'Move', action: () => {that.startDrag()}}
        ])
        event.preventDefault()
    })
    
    addElement(that)
    return that
}

function create(canvas, x, y) {
    const logic = free_connector()
    return ui(canvas, logic).move(x, y)
}

export default {
    logic: free_connector,
    ui,
    create,
}
