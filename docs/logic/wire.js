import {timing} from './config.js'
import { Color } from './svg.esm.js'


export function Wire(a, b) {
    if(a.getState() || b.getState()) {
        a.set()
        b.set()
    }

    const observer = state => {
        setTimeout(() => {
            a.setState(state)
            b.setState(state)
        }, timing)
    }

    a.connect(observer)
    b.connect(observer)

    return {
        remove: () => {
            a.disconnect(observer)
            b.disconnect(observer)
        },
        ends: [a, b]
    }
}

function ui(canvas, uiConnector0, uiConnector1) {
    const line = canvas.line(uiConnector0.x, uiConnector0.y, uiConnector1.x, uiConnector1.y)
    const width = 2

    const observer = () => {
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

    const that = {
        ends: [
            uiConnector0,
            uiConnector1
        ]
    }

    return that
}

function create(canvas, uiConnector0, uiConnector1) {
    Wire(uiConnector0.connector, uiConnector1.connector)
    const uiWire = ui(canvas, uiConnector0, uiConnector1)
    uiConnector0.uiWires.push(uiWire)
    uiConnector1.uiWires.push(uiWire)
}

export default {
    logic: Wire,
    ui,
    create
}