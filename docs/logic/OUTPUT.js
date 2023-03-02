import { Connector, UiConnector } from './connector.js'
import { outerWidth, snapY } from './canvas.js'
import { draggable } from './draggable.js'
import { showMenu } from './menu.js'
import { addElement, dirty, nextOutput, removeElement } from './current.js'
import { gridX, gridY, grid2X, grid2Y } from './canvas.js'
import { prompt } from './modal.js'

function Output(label) {
  const connector = Connector(label)

  return Promise.resolve({
    connector,
    destroy: () => {
      connector.destroy()
    }
  })
}

function ui(canvas, logic, id) {
  let _y = 0
  const that = {}
  const group = canvas.group()
  const line = group.line(outerWidth()-20, _y, outerWidth()-36, _y).stroke({color: 'black', width: 3})
  const big = group.circle(20)
  const uiConnector = UiConnector(group, -18, 0, that, logic.connector)

  logic.connector.connect(state => {
    if(state) {
      big.fill('red')
      line.stroke({color: 'red', width: 3})
    }
    else {
      big.fill('black')
      line.stroke({color: 'black', width: 3})
    }
  })

  big.on('click', event => {
    event.stopPropagation()
  })

  function destroy() {
    //logic.connector.destroy()
    uiConnector.destroy()
    group.remove()
    removeElement(that)
  }

  that.type = 'OUTPUT'
  that.destroy = destroy
  that.x = () => uiConnector.x()
  that.y = () => _y
  that.on = (eventType, handler) => {
    big.on(eventType, handler)
  }
  that.off = (eventType, handler) => {
    big.off(eventType, handler)
  },
  that.move = (_, y) => {
    y = snapY(y)
    _y = y
    line.plot(outerWidth()-20, y, outerWidth()-36, y)
    uiConnector.move(outerWidth()-20, y)
    big.center(outerWidth()-20, y)
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
    prompt("Output Label", uiConnector.getLabel(), value => {
      if(value) uiConnector.setLabel(value)
      dirty()
    })
  }

  big.on('contextmenu', event => {
    showMenu(event.offsetX, event.offsetY, [
      {label: 'Delete', action: () => {destroy()}},
      {label: 'Move', action: () => {that.startDrag()}},
      {label: 'Rename', action: () => {rename()}}
    ])
    event.preventDefault()
  })

  addElement(that, id)
  return that
}

function create(canvas, y) {
  return Output(nextOutput()).then(logic => {
    const elem = ui(canvas, logic).move(0, y)
    dirty()
    return elem
  })
}

function logicFromObj(_canvas, obj) {
  return Output(obj.label)
}

function createFromObj(canvas, obj) {
  return logicFromObj(canvas, obj).then(logic => {
    return ui(canvas, logic, obj.id).move(grid2X(obj.x), grid2Y(obj.y))
  })
}

export default {
  logic: Output,
  ui,
  create,
  logicFromObj,
  createFromObj,
}
