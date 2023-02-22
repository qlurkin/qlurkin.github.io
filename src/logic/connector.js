import { observable } from './observable.js'
import { canvas as rootCanvas } from './canvas.js'

export function Connector(label) {
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
        destroy: () => {},
        getLabel: () => label,
        setLabel: value => {
            label = value
        }
    }
}

export function UiConnector(canvas, rx, ry, element, connector) {
    let ghost = false
    const group = canvas.group()
    const circle = group.circle(10).addClass('connector')
    const label = group.text('').font({fill: '#ccc', size: 10}).addClass('connector-label')
    const labelBox = group.rect(0, 0).addClass('connector-label')
    labelBox.after(label)

    function placeLabel(value) {
        label.text(value)
        labelBox.size(label.bbox().width+2, label.bbox().height)
    }
    placeLabel(connector.getLabel())
    
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
        element,
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
            group.remove()
            connector.destroy()
        },
        ghost: value => {
            ghost = value
        },
        getLabel: connector.getLabel,
        setLabel: value => {
            connector.setLabel(value)
            placeLabel(value)
            that.move(that.x()-rx, that.y()-ry)
        } 
    }

    that.move = (x, y) => {
        position.setValue({x: rx+x, y: ry+y})
        circle.center(rx + x, ry + y)
        labelBox.center(rx + x, ry + y - labelBox.height()/2-5)
        label.cx(labelBox.cx()).cy(labelBox.cy())
        return that
    }

    circle.on('click', event => {
        if(ghost) return
        rootCanvas.fire('connector_clicked', that)
        event.stopPropagation()
    })

    return that
}
