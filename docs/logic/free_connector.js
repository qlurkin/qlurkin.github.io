import { snapX, snapY } from './canvas.js'
import {step} from './config.js'
import {UiConnector} from './connector.js'
import { draggable } from './draggable.js'
import { showMenu } from './menu.js'
import { Connector } from './connector.js'

function free_connector() {
    const connector = Connector()

    return {
        connector
    }
}

function ui(canvas, logic) {
    let _x = 0
    let _y = 0

    const group = canvas.group()

    const uiConnector = UiConnector(group, 0, 0, logic.connector)

    const that = {
        uiConnector,
        x: () => _x,
        y: () => _y,
        on: (eventType, handler) => {
            uiConnector.on(eventType, handler)
        },
        off: (eventType, handler) => {
            uiConnector.off(eventType, handler)
        },
        destroy: () => {
            uiConnector.destroy()
            group.remove()
        },
        move: (x, y) => {
            x = snapX(x)
            y = snapY(y)
            _x = x
            _y = y
            uiConnector.move(x, y)
            return that
        }
    }

    draggable(that, false)

    that.on('contextmenu', event => {
        showMenu(event.offsetX, event.offsetY, [
            {label: 'Delete', action: () => {that.destroy()}},
            {label: 'Move', action: () => {that.startDrag()}}
        ])
        event.preventDefault()
    })

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