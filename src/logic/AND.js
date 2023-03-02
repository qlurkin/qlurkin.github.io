import { Connector } from './connector.js'
import { UiChip } from './ui_chip.js'
import { grid2X, grid2Y, gridX, gridY } from './canvas.js'
import { dirty } from './current.js'
import { addJob } from './randomExecutionQueue.js'

function AND() {
  const in0 = Connector('in0')
  const in1 = Connector('in1')
  const out = Connector('out')

  function compute() {
      const a = in0.getState()
      const b = in1.getState()
      out.setState(a && b)
  }

  function observer() {
    addJob(compute)
  }

  function outObserver() {
    setTimeout(compute, 100)
  }



  in0.connect(observer)
  in1.connect(observer)
  out.connect(outObserver)

  return Promise.resolve({
    inputs: [in0, in1],
    outputs: [out],
    destroy: () => {
        in0.disconnect(observer)
        in1.disconnect(observer)
        out.disconnect(outObserver)
        in0.destroy()
        in1.destroy()
        out.destroy()
    }
  })
}

function ui(canvas, x, y, logic, id) {
  const element = UiChip(canvas, 'AND', logic, '#f7fa48', id).move(x, y)
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
  return AND().then(logic => {
    const elem = ui(canvas, x, y, logic)
    dirty()
    return elem
  })
}

function logicFromObj(_canvas, _obj) {
  return AND()
}

function createFromObj(canvas, obj) {
  return logicFromObj(canvas, obj).then(logic => {
    return ui(canvas, grid2X(obj.x), grid2Y(obj.y), logic, obj.id)
  })
}

export default {
  logic: AND,
  ui,
  create,
  logicFromObj,
  createFromObj,
}
