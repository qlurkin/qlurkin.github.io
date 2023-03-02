import { UiChip } from './ui_chip.js'
import { grid2X, grid2Y, gridX, gridY } from './canvas.js'
import { dirty } from './current.js'

function TEXT(canvas, text) {
  const group = canvas.group()
  group.text(text).move(0, 0)
  return Promise.resolve({
    text,
    inputs: [],
    outputs: [],
    group,
    width: group.bbox().width,
    height: group.bbox().height,
    destroy: () => {
      group.remove()
    }
  })
}

function ui(canvas, x, y, logic, id) {
  const element = UiChip(canvas, 'TEXT', logic, '#f7fa48', id).move(x, y)
  element.type = 'TEXT'
  element.toObj = () => {
    return {
      id: element.id,
      type: element.type,
      text: logic.text,
      x: gridX(element.x()),
      y: gridY(element.y())
    }
  }

  return element
}

function create(canvas, x, y, text) {
  return TEXT(canvas, text).then(logic => {
    const elem = ui(canvas, x, y, logic)
    dirty()
    return elem
  })
}

function logicFromObj(canvas, obj) {
  return TEXT(canvas, obj.text)
}

function createFromObj(canvas, obj) {
  return logicFromObj(canvas, obj).then(logic => {
    return ui(canvas, grid2X(obj.x), grid2Y(obj.y), logic, obj.id)
  })
}

export default {
  logic: TEXT,
  ui,
  create,
  logicFromObj,
  createFromObj,
}
