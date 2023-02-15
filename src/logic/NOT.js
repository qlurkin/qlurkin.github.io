import { timing } from './config.js'
import { Connector } from './connector.js'
import { UiChip } from './ui_chip.js'

export function NOT() {
    const in0 = Connector()
    const out = Connector()

    const observer = () => {
        const a = in0.getState()
        setTimeout(() => {
            out.setState(!a)
        }, timing)
    }

    in0.connect(observer)

    return {
        inputs: [in0],
        outputs: [out]
    }
}

function ui(canvas, x, y, logic) {
    UiChip(canvas, 'NOT', x, y, logic.inputs, logic.outputs, '#f55')
}

function create(canvas, x, y) {
    const logic = NOT()
    ui(canvas, x, y, logic)
}

export default {
    logic: NOT,
    ui,
    create,
}