import { Connector, UiConnector } from './connector.js'

function Input() {
    const connector = Connector()

    return {
        connector
    }
}

function ui(canvas, y, logic) {
    const group = canvas.group()
    const line = group.line(20, y, 36, y).stroke({color: 'black', width: 3})
    UiConnector(group, 36, y, logic.connector)
    const big = group.circle(20).center(20, y).addClass('input')

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
        logic.connector.toggle()
        event.stopPropagation()
    })
}

function create(canvas, y) {
    const logic = Input()
    ui(canvas, y, logic)
}

export default {
    logic: Input,
    ui,
    create,
}