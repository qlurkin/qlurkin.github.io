import { timing } from './config.js'
import { Connector } from './connector.js'
import { UiChip } from './ui_chip.js'

function AND() {
    const in0 = Connector()
    const in1 = Connector()
    const out = Connector()

    const observer = () => {
        const a = in0.getState()
        const b = in1.getState()
        setTimeout(() => {
            out.setState(a && b)
        }, timing)
    }

    in0.connect(observer)
    in1.connect(observer)
    out.connect(observer)

    return {
        inputs: [in0, in1],
        outputs: [out]
    }
}

function ui(canvas, x, y, logic) {
    return UiChip(canvas, 'AND', logic.inputs, logic.outputs).move(x, y)
}

function create(canvas, x, y) {
    const logic = AND()
    return ui(canvas, x, y, logic)
}

export default {
    logic: AND,
    ui,
    create,
}