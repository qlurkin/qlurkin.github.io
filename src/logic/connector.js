import {emit} from './simulation.js'

export function Connector() {
    let state = false
    const observers = []

    const that = {
        getState: () => state,
        setState: value => {
            if(value == state) return
            state = value
            for(const observer of observers) {
                observer(state)
            }
        },
        connect: observer => {
            observers.push(observer)
            observer(state)
        },
        disconnect: observer => {
            const index = observers.findIndex(item => item == observer)
            observers.splice(index, 1)
        },
        set: () => {
            that.setState(true)
        },
        reset: () => {
            that.setState(false)
        },
        toggle: () => {
            that.setState(!that.getState())
        }
    }

    return that
}

export function UiConnector(group, x, y, connector) {
    const circle = group.circle(10).center(x, y).addClass('connector')

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
        x, y,
        on: (eventType, handler) => {
            circle.on(eventType, handler)
        },
        uiWires: []
    }

    circle.on('click', event => {
        emit('connector_clicked', that)
        event.stopPropagation()
    })

    return that
}