import { Connector } from './connector.js'
import { UiChip } from './ui_chip.js'
import { grid2X, grid2Y, gridX, gridY } from './canvas.js'
import { dirty } from './current.js'


function LED(canvas) {
  const connector = Connector('in')

  const group = canvas.group()
  group.polyline([
    [15, 15],
    [3, 35],
    [5, 38],
    [8, 32],
    [11, 38],
    [14, 32],
    [17, 38],
    [20, 32],
    [25, 32],
    [25, 35],
    [21, 35],
    [29, 35]
  ]).fill('none').stroke({width: 2, color: 'black'})
  group.polyline([[22, 38], [28, 38]]).fill('none').stroke({width: 2, color: 'black'})
  const circle = group.circle(30).move(0, 0)


  function observer(state) {
      if(state) {
        circle.fill('red')
      }
      else {
        circle.fill('black')
      }
  }
  
  connector.connect(observer)
  
  return {
    inputs: [connector],
    outputs: [],
    group,
    width: 30,
    height: 40,
    destroy: () => {
      connector.disconnect(observer)
      connector.destroy()
      group.remove()
    }
  }
}


function ui(canvas, x, y, logic, id) {
  const element = UiChip(canvas, 'LED', logic, '#aaa', id).move(x, y)
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
