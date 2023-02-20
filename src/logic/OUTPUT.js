import { Connector, UiConnector } from './connector.js'
import { outerWidth, snapY } from './canvas.js'
import { draggable } from './draggable.js'
import { showMenu } from './menu.js'
import { addElement, nextOutput, removeElement } from './current.js'

function Output(label) {
    const connector = Connector(label)

    return {
        connector
    }
}

function ui(canvas, logic) {
    let _y = 0
    const that = {}
    const group = canvas.group()
    const line = group.line(outerWidth()-20, _y, outerWidth()-36, _y).stroke({color: 'black', width: 3})
    const uiConnector = UiConnector(group, -18, 0, that, logic.connector)
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
        //logic.connector.destroy()
        uiConnector.destroy()
        group.remove()
        removeElement(that)
    }

    that.type = 'OUTPUT'
    that.destroy = destroy
    that.x = () => uiConnector.x()
    that.y = () => _y
    that.on = (eventType, handler) => {
            big.on(eventType, handler)
        }
    that.off = (eventType, handler) => {
            big.off(eventType, handler)
        },
    that.move = (_, y) => {
            y = snapY(y)
            _y = y
            line.plot(outerWidth()-20, y, outerWidth()-36, y)
            uiConnector.move(outerWidth()-20, y)
            big.center(outerWidth()-20, y)
        }
    that.getLabel = () => {
      return uiConnector.getLabel()
    }

    draggable(that, false)

    function rename() {
        const value = prompt("Input Label", uiConnector.getLabel())
        if(value) uiConnector.setLabel(value)
    }

    big.on('contextmenu', event => {
        showMenu(event.offsetX, event.offsetY, [
            {label: 'Delete', action: () => {destroy()}},
            {label: 'Move', action: () => {that.startDrag()}},
            {label: 'Rename', action: () => {rename()}}
        ])
        event.preventDefault()
    })

    addElement(that)
    return that
}

function create(canvas, y) {
    const logic = Output(nextOutput())
    return ui(canvas, logic).move(0, y)
}

export default {
    logic: Output,
    ui,
    create,
}
