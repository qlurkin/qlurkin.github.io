import { timing } from './config.js'
import { Connector } from './connector.js'
import { UiChip } from './ui_chip.js'
import { grid2X, grid2Y, gridX, gridY } from './canvas.js'
import { dirty } from './current.js'


function LED(canvas) {
  const connector = Connector('in')

  const group = canvas.group()
  const circle = group.circle(30).move(0, 0)
  
  connector.connect(state => {
    setTimeout(() => {
      if(state) {
        circle.fill('red')
      }
      else {
        circle.fill('black')
      }
    }, timing())
  })
  
  return {
    inputs: [connector],
    outputs: [],
    group,
    width: 30,
    height: 30
  }
}


function ui(canvas, x, y, logic, id) {
  const element = UiChip(canvas, 'LED', logic.inputs, logic.outputs, logic.group, '#222', id).move(x, y)
  element.type = 'LED'
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
  const logic = LED(canvas)
  const elem = ui(canvas, x, y, logic)
  dirty()
  return elem
}

function logicFromObj(_obj) {
  return LED()
}

function createFromObj(canvas, obj) {
  const logic = LED(canvas)
  return ui(canvas, grid2X(obj.x), grid2Y(obj.y), logic, obj.id)
}

export default {
  logic: AND,
  ui,
  create,
  logicFromObj,
  createFromObj,
}
