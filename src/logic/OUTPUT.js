import { Connector, UiConnector } from './connector.js'
import { width } from './config.js'

function Output() {
    const connector = Connector()

    return {
        connector
    }
}

function ui(canvas, y, logic) {
    const group = canvas.group()
    const line = group.line(width-20, y, width-36, y).stroke({color: 'black', width: 3})
    UiConnector(group, -16, 0, logic.connector).move(width-20, y)
    const big = group.circle(20).center(width-20, y)

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
}

function create(canvas, y) {
    const logic = Output()
    ui(canvas, y, logic)
}

export default {
    logic: Output,
    ui,
    create,
}