import { timing } from './config.js'
import { Connector } from './connector.js'
import { UiChip } from './ui_chip.js'
import { grid2X, grid2Y, gridX, gridY } from './canvas.js'
import { dirty } from './current.js'

function AND() {
  const in0 = Connector('in0')
  const in1 = Connector('in1')
  const out = Connector('out')

  const observer = () => {
    setTimeout(() => {
      const a = in0.getState()
      const b = in1.getState()
      out.setState(a && b)
    }, timing())
  }

  in0.connect(observer)
  in1.connect(observer)
  out.connect(observer)

  return {
    inputs: [in0, in1],
    outputs: [out]
  }
}

function ui(canvas, x, y, logic, id) {
  const element = UiChip(canvas, 'AND', logic.inputs, logic.outputs, 'yellow', id).move(x, y)
  element.type = 'AND'
  element.toObj = () => {
    return {
      id: element.id,
      type: element.type,
      x: gridX(element.x()),
      y: gridY(element.y())
    }
  }

  return element
}

function create(canvas, x, y) {
  const logic = AND()
  const elem = ui(canvas, x, y, logic)
  dirty()
  return elem
}

function logicFromObj(_obj) {
  return AND()
}

function createFromObj(canvas, obj) {
  const logic = logicFromObj(obj)
  return ui(canvas, grid2X(obj.x), grid2Y(obj.y), logic, obj.id)
}

export default {
  logic: AND,
  ui,
  create,
  logicFromObj,
  createFromObj,
}
