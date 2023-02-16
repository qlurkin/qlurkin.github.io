import { Color } from './svg.esm.js'

export function Wire(a, b) {
    function aObserver(state) {
        b.setState(state)
    }
    a.connect(aObserver)

    function bObserver(state) {
        a.setState(state)
    }
    b.connect(bObserver)

    return {
        destroy: () => {
            a.disconnect(aObserver)
            b.disconnect(bObserver)
            a.reset()
            b.reset()
        },
        ends: [a, b]
    }
}

function ui(canvas, uiConnector0, uiConnector1, wire) {
    const line = canvas.line(uiConnector0.x(), uiConnector0.y(), uiConnector1.x(), uiConnector1.y())
    const width = 2

    function observer() {
        let count = 0
        if(uiConnector0.connector.getState()) {
            count += 1
        }
        if(uiConnector1.connector.getState()) {
            count += 1
        }
        line.stroke({width, color: (new Color({r: (count/2)*255, g:0, b:0})).toHex()})
    }

    uiConnector0.connector.connect(observer)
    uiConnector1.connector.connect(observer)

    function positionObserver() {
        line.plot(uiConnector0.x(), uiConnector0.y(), uiConnector1.x(), uiConnector1.y())
    }

    uiConnector0.connect(positionObserver)
    uiConnector1.connect(positionObserver)

    function destroyObserver() {
        uiConnector0.connector.disconnect(observer)
        uiConnector1.connector.disconnect(observer)
        uiConnector0.disconnect(positionObserver)
        uiConnector1.disconnect(positionObserver)
        uiConnector0.off('destroy', destroyObserver)
        uiConnector1.off('destroy', destroyObserver)
        wire.destroy()
        line.remove()
    }

    uiConnector0.on('destroy', destroyObserver)
    uiConnector1.on('destroy', destroyObserver)

    const that = {
        ends: [
            uiConnector0,
            uiConnector1
        ]
    }

    return that
}

function create(canvas, uiConnector0, uiConnector1) {
    const logic = Wire(uiConnector0.connector, uiConnector1.connector)
    return ui(canvas, uiConnector0, uiConnector1, logic)
}

export default {
    logic: Wire,
    ui,
    create
}