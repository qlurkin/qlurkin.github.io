import { grid2X, grid2Y, snapX, snapY } from './canvas.js'
import { UiConnector } from './connector.js'
import { draggable } from './draggable.js'
import { showMenu } from './menu.js'
import { Connector } from './connector.js'
import { addElement, dirty, removeElement } from './current.js'
import { gridX, gridY } from './canvas.js'

function free_connector() {
  const connector = Connector('')

  return {
    connector,
    // BERK
    inputs: [connector],
    outputs: []
  }
}

function ui(canvas, logic, id) {
  let _x = 0
  let _y = 0
  const that = {}

  const group = canvas.group()

  const uiConnector = UiConnector(group, 0, 0, that, logic.connector)

  that.type = 'CONNECT',
  that.uiConnector = uiConnector
  that.x = () => _x
  that.y = () => _y
  that.on = (eventType, handler) => {
    uiConnector.on(eventType, handler)
  }
  that.off = (eventType, handler) => {
    uiConnector.off(eventType, handler)
  }
  that.destroy = () => {
    uiConnector.destroy()
    group.remove()
    removeElement(that)
  }
  that.move = (x, y) => {
    x = snapX(x)
    y = snapY(y)
    _x = x
    _y = y
    uiConnector.move(x, y)
    return that
  }
  that.toObj = () => {
    return {
      id: that.id,
      type: that.type,
      x: gridX(that.x()),
      y: gridY(that.y())
    }
  }
  that.getConnector = _label => {
    return uiConnector
  }
  
  that.startDrag = () => { console.log('Not draggable yet') }
  draggable(that, false)

  that.onStartDrag = () => {
    uiConnector.ghost(true)
  }

  that.afterDrop = () => {
    uiConnector.ghost(false)
  }

  that.on('contextmenu', event => {
    showMenu(event.offsetX, event.offsetY, [
      {label: 'Delete', action: () => {that.destroy()}},
      {label: 'Move', action: () => {that.startDrag()}}
    ])
    event.preventDefault()
  })

  addElement(that, id)
  return that
}

function create(canvas, x, y) {
  const logic = free_connector()
  const elem = ui(canvas, logic).move(x, y)
  dirty()
  return elem
}

function logicFromObj(_obj) {
  return free_connector()
}

function createFromObj(canvas, obj) {
  const logic = logicFromObj(obj)
  return ui(canvas, logic, obj.id).move(grid2X(obj.x), grid2Y(obj.y))
}

export default {
  logic: free_connector,
  ui,
  create,
  logicFromObj,
  createFromObj,
}
