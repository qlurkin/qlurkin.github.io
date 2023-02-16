import { Connector, UiConnector } from './connector.js'
import { observable } from './observable.js'

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

function ui(canvas, y, logic) {
    const group = canvas.group()
    const line = group.line(20, y, 36, y).stroke({color: 'black', width: 3})
    UiConnector(group, 16, 0, logic.connector).move(20, y)
    const big = group.circle(20).center(20, y).addClass('input')

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

    return {
        destroy: () => {
            logic.disconnect(observer)
            big.off('click', click)
            group.remove()
        }
    }
}

function create(canvas, y) {
    const logic = Input()
    return ui(canvas, y, logic)
}

export default {
    logic: Input,
    ui,
    create,
}