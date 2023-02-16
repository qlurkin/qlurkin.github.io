import { observable } from './observable.js'
import { canvas } from './canvas.js'

export function Connector() {
    const state = observable(false)

    return {
        getState: state.getValue,
        setState: state.setValue,
        connect: state.observe,
        disconnect: state.forget,
        set: () => {
            state.setValue(true)
        },
        reset: () => {
            state.setValue(false)
        },
        toggle: () => {
            state.setValue(!state.getValue())
        },
        destroy: () => {}
    }
}

export function UiConnector(group, rx, ry, connector) {
    const circle = group.circle(10).addClass('connector')
    const position = observable({x: rx, y: ry})

    connector.connect(state => {
        if(state) {
            circle.fill('red')
        }
        else {
            circle.fill('black')
        }
    })

    const that =  {
        connector,
        x: () => position.getValue().x,
        y: () => position.getValue().y,
        on: (eventType, handler) => {
            circle.on(eventType, handler)
        },
        off: (eventType, handler) => {
            circle.off(eventType, handler)
        },
        connect: position.observe,
        disconnect: position.forget,
        destroy: () => {
            circle.fire('destroy')
            circle.remove()
            connector.destroy()
        }
    }

    that.move = (x, y) => {
        position.setValue({x: rx+x, y: ry+y})
        circle.center(rx + x, ry + y)
        return that
    }

    circle.on('click', event => {
        canvas.fire('connector_clicked', that)
        event.stopPropagation()
    })

    return that
}