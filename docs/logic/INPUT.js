import { Connector, UiConnector } from './connector.js'
import { observable } from './observable.js'
import { showMenu } from './menu.js'
import { draggable } from './draggable.js'
import { snapY } from './canvas.js'

function Input() {
    let state = observable(false)
    
    const connector = Connector()

    connector.connect(() => {
        setTimeout(() => {
            connector.setState(state.getValue())
        })
    })

    return {
        connector,
        set: () => {
            state.setValue(true)
            connector.set()
        },
        reset: () => {
            state.setValue(false)
            connector.reset()
        },
        toggle: () => {
            state.setValue(!state.getValue())
            connector.setState(state.getValue())
        },
        connect: state.observe,
        disconnect: state.forget
    }
}

function ui(canvas, logic) {
    let _y = 0
    const group = canvas.group()
    const line = group.line(20, _y, 38, _y).stroke({color: 'black', width: 3})
    const uiConnector = UiConnector(group, 18, 0, logic.connector)
    const big = group.circle(20).addClass('input')

    function observer(state) {
        if(state) {
            big.fill('red')
            line.stroke({color: 'red', width: 3})
        }
        else {
            big.fill('black')
            line.stroke({color: 'black', width: 3})
        }
    }

    logic.connect(observer)

    function click(event) {
        logic.toggle()
        event.stopPropagation()
    } 

    big.on('click', click)

    function destroy() {
        logic.disconnect(observer)
        big.off('click', click)
        uiConnector.destroy()
        group.remove()
    }

    const that = {
        destroy,
        x: () => 20,
        y: () => _y,
        on: (eventType, handler) => {
            big.on(eventType, handler)
        },
        off: (eventType, handler) => {
            big.off(eventType, handler)
        },
        move: (x, y) => {
            y = snapY(y)
            _y = y
            line.plot(20, y, 36, y)
            uiConnector.move(20, y)
            big.center(20, y)
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
    const logic = Input()
    return ui(canvas, logic).move(0, y)
}

export default {
    logic: Input,
    ui,
    create,
}