import WIRE from "./WIRE.js"
import { Connector } from './connector.js'
import { getCompound } from "./library.js"
import { UiChip } from './ui_chip.js'
import { dirty } from "./current.js"
import { gridX, gridY, grid2X, grid2Y } from "./canvas.js"

function COMPOUND(objs) {
  const elements = {}
  const inputObjs = objs.filter(obj => obj.type === 'INPUT').sort((a, b) => a.y - b.y)
  const inputs = []
  for(const obj of inputObjs) {
    const connector = Connector(obj.label)
    elements[obj.id] = {}
    elements[obj.id][obj.label] = connector
    inputs.push(connector)
  }

  const outputObjs = objs.filter(obj => obj.type === 'OUTPUT').sort((a, b) => a.y - b.y)
  const outputs = []
  for(const obj of outputObjs) {
    const connector = Connector(obj.label)
    elements[obj.id] = {}
    elements[obj.id][obj.label] = connector
    outputs.push(connector)
  }

  const otherObjs = objs.filter(obj => (obj.type !== 'OUTPUT') && (obj.type !== 'INPUT') && (obj.type !== 'WIRE'))
  const promises = []
  for(const obj of otherObjs) {
    promises.push(import(`./${obj.type}.js`)
      .then(ELM => {
        const logic = ELM.default.logicFromObj(obj)
        elements[obj.id] = {}
        for(const connector of logic.inputs.concat(logic.outputs)) {
          elements[obj.id][connector.getLabel()] = connector
        }
      })
      .catch(err => {
        console.log(err)
      })
    )
  }

  Promise.all(promises)
    .then(() => {
      const wireObjs = objs.filter(obj => obj.type === 'WIRE')
      for(const obj of wireObjs) {
        WIRE.logic(
          elements[obj.ends[0].element][obj.ends[0].connector],
          elements[obj.ends[1].element][obj.ends[1].connector],
        )
      }
    })
    .catch(() => {console.log('Error creating some elements')})

  return {
    inputs,
    outputs,
  }
}

function ui(canvas, name, x, y, logic, id) {
  const element = UiChip(canvas, name, logic.inputs, logic.outputs, 'green', id).move(x, y)
  element.type = 'COMPOUND'
  element.name = name
  element.toObj = () => {
    return {
      id: element.id,
      type: element.type,
      name: element.name,
      x: gridX(element.x()),
      y: gridY(element.y())
    }
  }

  return element
}

function create(canvas, name, x, y) {
  const objs = getCompound(name)
  const logic = COMPOUND(objs)
  const elem = ui(canvas, name, x, y, logic)
  dirty()
  return elem
}

function logicFromObj(obj) {
  const objs = getCompound(obj.name)
  const logic = COMPOUND(objs)
  return logic
}

function createFromObj(canvas, obj) {
  const logic = logicFromObj(obj)
  return ui(canvas, obj.name, grid2X(obj.x), grid2Y(obj.y), logic, obj.id)
}

export default {
  logic: COMPOUND,
  ui,
  create,
  logicFromObj,
  createFromObj,
}
