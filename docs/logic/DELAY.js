import { Connector } from './connector.js'
import { UiChip } from './ui_chip.js'
import { grid2X, grid2Y, gridX, gridY } from './canvas.js'
import { dirty } from './current.js'

export function DELAY() {
  const in0 = Connector('in')
  const out = Connector('out')

  function compute() {
      const a = in0.getState()
      out.setState(a)
  }

  function observer() {
    setTimeout(compute, 0)
  }

  function outObserver() {
    setTimeout(compute, 100)
  }

  in0.connect(observer)
  out.connect(outObserver)

  return Promise.resolve({
    inputs: [in0],
    outputs: [out],
    destroy: () => {
      in0.disconnect(observer)
      out.disconnect(outObserver)
      in0.destroy()
      out.destroy()
    }
  })
}

function ui(canvas, x, y, logic, id) {
  const element = UiChip(canvas, 'DELAY', logic, '#f55', id).move(x, y)
  element.type = 'DELAY'
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
  return DELAY().then(logic => {
    const elem = ui(canvas, x, y, logic)
    dirty()
    return elem
  })
}

function logicFromObj(_canvas, _obj) {
  return DELAY()
}

function createFromObj(canvas, obj) {
  return logicFromObj(canvas, obj).then(logic => {
    return ui(canvas, grid2X(obj.x), grid2Y(obj.y), logic, obj.id)
  })
}

export default {
  logic: DELAY,
  ui,
  create,
  logicFromObj,
  createFromObj,
}
