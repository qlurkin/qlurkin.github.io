import WIRE from "./WIRE.js"
import { Connector } from './connector.js'
import { getCompound } from "./library.js"
import { UiChip } from './ui_chip.js'
import { dirty } from "./current.js"
import { gridX, gridY, grid2X, grid2Y } from "./canvas.js"

function COMPOUND(canvas, objs) {
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
  const logics = []
  for(const obj of otherObjs) {
    promises.push(import(`./${obj.type}.js`)
      .then(ELM => {
        console.log(obj)
        return ELM.default.logicFromObj(canvas, obj).then(logic => {
          logic.ui = {
            x: obj.x,
            y: obj.y
          }
          logics.push(logic)
          elements[obj.id] = {}
          for(const connector of logic.inputs.concat(logic.outputs)) {
            elements[obj.id][connector.getLabel()] = connector
          }
        })
      })
      .catch(err => {
        console.log(err)
      })
    )
  }

  const that = {
    inputs,
    outputs,
    destroy: () => {
      for(const logic of logics) {
        logic.destroy()
      }
      if(that.group) that.group.remove()
    },
  }

  return Promise.all(promises)
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
    .then(() => {
      const displayables = logics
        .filter(logic => !!logic.group)
        .sort((a, b) => {Math.sqrt(a.ui.x*a.ui.x+a.ui.y*a.ui.y) - Math.sqrt(b.ui.x*b.ui.x+b.ui.y*b.ui.y)})

      console.log(displayables)

      if(displayables.length > 0) {
        console.log('CACA')
        const origin = displayables[0]

        const group = canvas.group()
        for(const displayable of displayables) {
          group.add(displayable.group)
          displayable.group.transform({
            scale: 0.5,
            translateX: (grid2X(displayable.ui.x) - grid2X(origin.ui.x))/2,
            translateY: (grid2Y(displayable.ui.y) - grid2Y(origin.ui.y))/2
          })
        }

        const offsetX = group.bbox().x
        const offsetY = group.bbox().y

        for(const displayable of displayables) {
          displayable.group.transform({
            translateX: -offsetX,
            translateY: -offsetY,
          }, true) // relative transform
        }

        that.group = group
        that.width = group.bbox().width
        that.height = group.bbox().height
      }

      return that
    })
}

function ui(canvas, name, x, y, logic, color, id) {
  const element = UiChip(canvas, name, logic, color, id).move(x, y)
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
  const save = getCompound(name)
  return COMPOUND(canvas, save.elements).then(logic => {
    const elem = ui(canvas, name, x, y, logic, save.color)
    dirty()
    return elem
  })
}

function logicFromObj(canvas, obj) {
  const save = getCompound(obj.name)
  return COMPOUND(canvas, save.elements)
}

function createFromObj(canvas, obj) {
  const save = getCompound(obj.name)
  return COMPOUND(canvas, save.elements).then(logic => {
    return ui(canvas, obj.name, grid2X(obj.x), grid2Y(obj.y), logic, save.color, obj.id)
  })
}

export default {
  logic: COMPOUND,
  ui,
  create,
  logicFromObj,
  createFromObj,
}
