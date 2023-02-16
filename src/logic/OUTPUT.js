import { Connector, UiConnector } from './connector.js'
import { width } from './config.js'
import { draggable } from './draggable.js'
import { showMenu } from './menu.js'

function Output() {
    const connector = Connector()

    return {
        connector
    }
}

function ui(canvas, logic) {
    let _y = 0
    const group = canvas.group()
    const line = group.line(width-20, _y, width-36, _y).stroke({color: 'black', width: 3})
    const uiConnector = UiConnector(group, -16, 0, logic.connector)
    const big = group.circle(20)

    logic.connector.connect(state => {
        if(state) {
            big.fill('red')
            line.stroke({color: 'red', width: 3})
        }
        else {
            big.fill('black')
            line.stroke({color: 'black', width: 3})
        }
    })

    big.on('click', event => {
        event.stopPropagation()
    })

    function destroy() {
        logic.connector.destroy()
        group.remove()
    }

    const that = {
        destroy,
        x: () => width-20,
        y: () => _y,
        on: (eventType, handler) => {
            big.on(eventType, handler)
        },
        off: (eventType, handler) => {
            big.off(eventType, handler)
        },
        move: (x, y) => {
            _y = y
            line.plot(width-20, y, width-36, y)
            uiConnector.move(width-20, y)
            big.center(width-20, y)
        }
    }

    draggable(that, false)

    big.on('contextmenu', event => {
        showMenu(event.offsetX, event.offsetY, [
            {label: 'Delete', action: () => {destroy()}},
            {label: 'Move', action: () => {that.startDrag()}}
        ])
        event.preventDefault()
    })

    return that
}

function create(canvas, y) {
    const logic = Output()
    return ui(canvas, logic).move(0, y)
}

export default {
    logic: Output,
    ui,
    create,
}