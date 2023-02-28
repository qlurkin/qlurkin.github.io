import { Connector, UiConnector } from './connector.js'
import { observable } from './observable.js'
import { showMenu } from './menu.js'
import { draggable } from './draggable.js'
import { grid2X, grid2Y, snapY } from './canvas.js'
import { addElement, dirty, nextInput, removeElement } from './current.js'
import { gridX, gridY } from './canvas.js'
import { prompt } from './modal.js'
import { addJob } from './randomExecutionQueue.js'

function Input(label) {
  let state = observable(false)

  const connector = Connector(label)

  function observer() {
    setTimeout(() => {
      connector.setState(state.getValue())
    }, 100)
  }

  connector.connect(observer)

  return {
    connector,
    set: () => {
      state.setValue(true)
      connector.set()
    },
    reset: () => {
      state.setValue(false)
      connector.reset()
    },
    toggle: () => {
      state.setValue(!state.getValue())
      connector.setState(state.getValue())
    },
    connect: state.observe,
    disconnect: state.forget,
    destroy: () => {
      connector.disconnect(observer)
      connector.destroy()
      state.clear()
    }
  }
}

function ui(canvas, logic, id) {
  let _y = 0
  const that = {}
  const group = canvas.group()
  const line = group.line(20, _y, 38, _y).stroke({color: 'black', width: 3})
  const big = group.circle(20).addClass('input')
  const uiConnector = UiConnector(group, 18, 0, that, logic.connector)

  function observer(state) {
    if(state) {
      big.fill('red')
      line.stroke({color: 'red', width: 3})
    }
    else {
      big.fill('black')
      line.stroke({color: 'black', width: 3})
    }
  }

  logic.connect(observer)

  function click(event) {
    logic.toggle()
    event.stopPropagation()
  } 

  big.on('click', click)

  function destroy() {
    logic.disconnect(observer)
    big.off('click', click)
    uiConnector.destroy()
    group.remove()
    removeElement(that)
  }

  that.type = 'INPUT'
  that.destroy = destroy
  that.x = () => uiConnector.x()
  that.y = () => _y
  that.on = (eventType, handler) => {
    big.on(eventType, handler)
  }
  that.off = (eventType, handler) => {
    big.off(eventType, handler)
  }
  that.move = (_, y) => {
    y = snapY(y)
    _y = y
    line.plot(20, y, 36, y)
    uiConnector.move(20, y)
    big.center(20, y)
  }
  that.getLabel = () => {
    return uiConnector.getLabel()
  }
  that.toObj = () => {
    return {
      id: that.id,
      type: that.type,
      label: uiConnector.getLabel(),
      x: gridX(that.x()),
      y: gridY(that.y())
    }
  }
  that.getConnector = _label => {
    return uiConnector
  }

  draggable(that, false)

  function rename() {
    prompt("Input Label", uiConnector.getLabel(), value => {
      if(value) uiConnector.setLabel(value)
      dirty()
    })
  }

  big.on('contextmenu', event => {
    showMenu(event.offsetX, event.offsetY, [
      {label: 'Delete', action: () => {destroy()}},
      {label: 'Move', action: () => {that.startDrag()}},
      {label: 'Rename', action: () => {rename()}},
    ])
    event.preventDefault()
  })

  addElement(that, id)
  return that
}

function create(canvas, y) {
  const logic = Input(nextInput())
  const elem = ui(canvas, logic).move(0, y)
  dirty()
  return elem
}

function logicFromObj(obj) {
  return Input(obj.label)
}

function createFromObj(canvas, obj) {
  const logic = logicFromObj(obj)
  const elem = ui(canvas, logic, obj.id).move(grid2X(obj.x), grid2Y(obj.y))
  return elem
}

export default {
  logic: Input,
  ui,
  create,
  logicFromObj,
  createFromObj,
}
