import { timing } from './config.js'
import { Connector } from './connector.js'
import { UiChip } from './ui_chip.js'

export function NOT() {
    const in0 = Connector('in')
    const out = Connector('out')

    const observer = () => {
        const a = in0.getState()
        setTimeout(() => {
            out.setState(!a)
        }, timing)
    }

    in0.connect(observer)
    out.connect(observer)

    return {
        inputs: [in0],
        outputs: [out]
    }
}

function ui(canvas, x, y, logic) {
    return UiChip(canvas, 'NOT', logic.inputs, logic.outputs, '#f55').move(x, y)
}

function create(canvas, x, y) {
    const logic = NOT()
    return ui(canvas, x, y, logic)
}

export default {
    logic: NOT,
    ui,
    create,
}