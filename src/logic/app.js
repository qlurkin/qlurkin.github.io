import {canvas, inputSide, outputSide, workspace, snapX, snapY } from './canvas.js'
import AND from './AND.js'
import NOT from './NOT.js'
import INPUT from './INPUT.js'
import OUTPUT from './OUTPUT.js'
import WIRE from './WIRE.js'
import free_connector from './CONNECT.js'
import { clear, fromJson, getCurrentColor, getCurrentDescription, getCurrentName, setCurrentColor, setCurrentDescription, setCurrentName } from './current.js'
import { loadLibrary, saveCurrent } from './library.js'
import { colorPicker } from './colorPicker.js'
import { modal } from './modal.js'

workspace.on('click', event => {
    if(startWire) {
        const fc = free_connector.create(canvas, event.offsetX, event.offsetY)
        WIRE.create(startWire, fc.uiConnector)
        startWire = fc.uiConnector
    }
})

inputSide.on('click', event => {
    const y = event.offsetY-1

    INPUT.create(canvas, y)    
    event.stopPropagation()
})

outputSide.on('click', event => {
    const y = event.offsetY-1

    OUTPUT.create(canvas, y)    
    event.stopPropagation()
})

let startWire = null
const ghostLine = canvas.line(0, 0, 0, 0).stroke({width: 3, color: 'black', opacity: 0}).addClass('ghost')
function moveGhostLine(event) {
    ghostLine.plot(startWire.x(), startWire.y(), snapX(event.offsetX), snapY(event.offsetY))
}
function abortWire() {
    startWire = null
    ghostLine.stroke({opacity: 0})
    workspace.off('mousemove', moveGhostLine)
}

canvas.on('connector_clicked', event => {
    const connector = event.detail
    if(!startWire) {
        startWire = connector
        ghostLine.plot(0, 0, 0, 0).stroke({opacity: 0.6})
        workspace.on('mousemove', moveGhostLine)
    }
    else {
        WIRE.create(startWire, connector)
        abortWire()
    }
})

canvas.on('escape', () => {
    if(startWire) abortWire()
})

document.getElementById('AND').addEventListener('click', event => {
    AND.create(canvas, -100, -100).startDrag()
})

document.getElementById('NOT').addEventListener('click', event => {
    NOT.create(canvas, -100, -100).startDrag()
})

document.getElementById('SAVE').addEventListener('click', event => {
  /*if(getCurrentName() === null) {
    const name = prompt("chip name ?")
    setCurrentName(name)
  }
  saveCurrent()*/
  modal(document.getElementById('chip-modal'), {name: getCurrentName(), description: getCurrentDescription(), color: getCurrentColor()}, data => {
    setCurrentName(data.name)
    setCurrentColor(data.color)
    setCurrentDescription(data.description)
    saveCurrent()
  })
})

document.getElementById('CLEAR').addEventListener('click', event => {
  clear()
})

function getAbsoluteGeometry(element, parent) {
  let x = 0
  let y = 0
  let el = element
  while(el !== parent) {
      x += el.offsetLeft
      y += el.offsetTop
      el = el.offsetParent
  }
  return {x, y}
}

window.addEventListener('keydown', event => {
    if (event.code === 'Escape') {
        canvas.fire('escape')
    }
})


colorPicker(document.querySelector('#chip-modal form #color-picker'), 100, 50, 65, (r, g, b) => {
  const color = `rgb(${r}, ${g}, ${b})`
  const input = document.querySelector('#chip-modal form #color-input')
  input.value = color
  input.style.backgroundColor = color
})

loadLibrary()
fromJson(localStorage.getItem('current'))

// let ghost = null
// let state = 'normal'
// let wireStart = null

// function nextKey(obj) {
//     return String(Math.max(...Object.keys(obj).map(x => parseInt(x, 10)))+1)
// }

// function insert(obj, value) {
//     const key = nextKey(obj)
//     obj[key] = value
//     return key
// }

// function Chip(label) {
//     return {
//         label,
//         elements: [],
//         nextId: 1
//     }
// }

// const chips = {
//     'AND': {
//         label: 'AND',
//         elements: [
//             {type: 'input', y: 0, label: 'in0', id: 'in0'},
//             {type: 'input', y: 1, label: 'in1', id: 'in1'},
//             {type: 'output', y: 0, label: 'out', id: 'out'},
//         ]
//     },
//     'NOT': {
//         label: 'NOT',
//         elements: [
//             {type: 'input', y: 0, label: 'in0', id: 'in0'},
//             {type: 'output', y: 0, label: 'out', id: 'out'},
//         ]
//     }
// }

// const current_chip = Chip('')

// function addElement(element) {
//     element.id = `c${current_chip.nextId}`
//     current_chip.elements.push(element)
//     current_chip.nextId++
// }

// function addInput(y, label) {
//     addElement({
//         type: 'input',
//         y,
//         label
//     })
// }

// function addOutput(y, label) {
//     addElement({
//         type: 'output',
//         y,
//         label
//     })
// }

// function addChip(x, y, chipId) {
//     addElement({
//         type: 'chip',
//         x,
//         y,
//         chipId
//     })
// }

// function addWire(elemId1, connId1, elemId2, connId2) {
//     addElement({
//         type: 'wire',
//         ends: [
//             `${elemId1}-${connId1}`,
//             `${elemId2}-${connId2}`,
//         ]
//     })
// }

// function createInterfaceLogic(elem) {
//     const connectors =  {}
//     connectors[`${elem.id}-0`] = Connector()
//     return connectors
// }

// function createWireLogic(wire, connectors) {
//     Wire(connectors[wire.ends[0]], connectors[wire.ends[1]])
// }

// function createChipLogic(chip) {
//     const inputs = {}
//     const outputs = {}

//     if(chip.chipId == 'AND') {
//         const And = AND()
//         inputs[`${chip.id}-in0`] = And.in0
//         inputs[`${chip.id}-in1`] = And.in1
//         outputs[`${chip.id}-out`] = And.out
//     }
//     else if(chip.chipId == 'NOT') {
//         const Not = NOT()
//         inputs[`${chip.id}-in0`] = Not.in0
//         outputs[`${chip.id}-out`] = Not.out
//     }
//     else {
//         const subConnectors = {}
//         const chipElements = chips[chip.chipId].elements
//         for(const element of chipElements) {
//             if(element.type == 'input') {
//                 const connectors = createInterfaceLogic(element)
//                 Object.assign(subConnectors, connectors)
//                 inputs[`${chip-id}-${element-id}`] = Object.values(connectors)[0]
//             }
//             if(element.type == 'output') {
//                 const connector = createInterfaceLogic(element)
//                 Object.assign(subConnectors, connectors)
//                 outputs[`${chip-id}-${element-id}`] = Object.values(connectors)[0]
//             }
//             else if(element.type == 'chip') {
//                 const connectors = createChipLogic(element, subConnectors)
//                 Object.assign(subConnectors, connectors.inputs)
//                 Object.assign(subConnectors, connectors.outputs)
//             }
//             else if(element.type == 'wire') {
//                 createWireLogic(element, subConnectors)
//             }
//         }
//     }

//     return {
//         inputs,
//         outputs
//     }
// }


// function init(chip) {
//     svg.clear()
//     const back = svg.rect(width, height).fill('#222')
//     const canvas = svg.rect(width-20, height-20).move(10, 10).fill('#555')
//     const inSide = svg.rect(10, height-20).move(0, 10).id('ins').fill('#222')
//     const outSide = svg.rect(10, height-20).move(width-10, 10).id('outs').fill('#222')

//     inSide.on('mouseover', event => {
//         state = 'addingInput'
//         const color = '#444'
//         ghost = svg.group()
//         ghost.rect(8, 20).fill(color).addClass('ghost')
//         ghost.circle(20).move(10, 0).fill(color)
//     })

//     inSide.on('mousemove', event => {
//         ghost.move(2, event.offsetY - 10)
//     })

//     inSide.on('mouseleave', event => {
//         ghost.remove()
//         state = 'normal'
//     })

//     outSide.on('mouseover', event => {
//         state = 'addingOutput'
//         const color = '#444'
//         ghost = svg.group()
//         ghost.rect(8, 20).move(20, 0).fill(color).addClass('ghost')
//         ghost.circle(20).fill(color)
//     })

//     outSide.on('mousemove', event => {
//         ghost.transform({
//             translateX: width - 30,
//             translateY: event.offsetY - 10
//         })
//     })

//     outSide.on('mouseleave', event => {
//         ghost.remove()
//         state = 'normal'
//     })


    
// }

// // Sync SVG with elements
// // new element are created
// // existing element are untouched
// // old element are removed



// function renderElement(element) {
//     const connectors = {}
//     if(element.type == 'input') {
//         const conns = createInterfaceLogic(element, connectors)
//         Object.assign(connectors, conns)
//         UiInput(element, Object.values(conns)[0])
//     }
//     else if(element.type == 'output') {
//         const conns = createInterfaceLogic(element, connectors)
//         Object.assign(connectors, conns)
//         UiOutput(element, Object.values(conns)[0])
//     }
//     else if(element.type == 'wire') {
//         createWireLogic(element, connectors)
//         const end0 = document.getElementById(element.ends[0])
//         const end1 = document.getElementById(element.ends[1])
//         const x0 = parseInt(end0.getAttribute('cx'), 10)
//         const y0 = parseInt(end0.getAttribute('cy'), 10)
//         const x1 = parseInt(end1.getAttribute('cx'), 10)
//         const y1 = parseInt(end1.getAttribute('cy'), 10)
//         UiWire(x0, y0, connectors[element.ends[0]], x1, y1, connectors[element.ends[1]])
//     }
//     else if(element.type == 'chip') {
//         const conns = createChipLogic(element)
//         Object.assign(connectors, conns.inputs)
//         Object.assign(connectors, conns.outputs)
//         UiChip(element, conns.inputs, conns.outputs)
//     }
// }

// function render(elements, connectors) {
//     if(!connectors) {
//         connectors = {}
//     }
    
//     const rendered = [...document.querySelectorAll('g')].map(node => node.id).filter(id => id.length > 0)
    
//     for(const element of elements) {
//         if(rendered.includes(element.id)) {
//             const index = rendered.findIndex(item => item == element.id)
//             rendered.splice(index, 1)
//         }
//         else {
//             renderElement(element, connectors)
//         }
//     }
//     for(const id in rendered) {
//         svg.findOne(`#${id}`).remove()
//     }

//     return connectors
// }

// function UiConnector(x, y, group, connector, id) {
//     const that =  {
//         x,
//         y,
//         connector,
//         toJson: () => {}
//     }

//     const circle = group.circle(8).center(x, y).id(id).addClass('connector')

//     circle.on('click', event => {
//         if(!wireStart) {
//             wireStart = that
//         }
//         else {
//             Wire(wireStart.connector, that.connector)
//             UiWire(wireStart.x, wireStart.y, wireStart.connector, that.x, that.y, that.connector)
//             wireStart = null
//         }
//         event.stopPropagation()
//     })

//     const observer = state => {
//         if(state) {
//             circle.fill('red')
//         }
//         else {
//             circle.fill('black')
//         }
//     }

//     connector.connect(observer)

//     return that
// }

// function UiInput(element, connector) {
//     const y = element.y
//     const group = svg.group().id(element.id)
//     const rect = group.rect(8, 20).center(5, y).fill('black')
//     const big_circle = group.circle(20).center(22, y).fill('black')
//     //const small_circle = elem.circle(8).move(35, 6).fill('black')
//     const uiConnector = UiConnector(42, y, group, connector, `${element.id}-0`)

//     big_circle.on('click', event => {
//         connector.toggle()
//         event.stopPropagation()
//     })

//     const observer = state => {
//         if(state) {
//             big_circle.fill('red')
//         }
//         else {
//             big_circle.fill('black')
//         }
//     }

//     connector.connect(observer)

//     const that = {
//         y,
//         toJson: () => {}
//     }

//     return that
// }

// function UiOutput(element, connector) {
//     const y = element.y
//     const group = svg.group().id(element.id)
//     const rect = group.rect(8, 20).center(width-10, y).fill('black')
//     const big_circle = group.circle(20).center(width-30, y).fill('black')
//     const uiConnector = UiConnector(width-50, y, group, connector, `${element.id}-0`)

//     big_circle.on('click', event => {
//         connector.toggle()
//         event.stopPropagation()
//     })

//     const observer = state => {
//         if(state) {
//             big_circle.fill('red')
//         }
//         else {
//             big_circle.fill('black')
//         }
//     }

//     connector.connect(observer)

//     const that = {
//         y,
//         toJson: () => {}
//     }

//     return that
// }

// function UiWire(x0, y0, connector0, x1, y1, connector1) {
//     const line = svg.line(x0, y0, x1, y1)
//     const width = 2

//     const observer = () => {
//         let count = 0
//         if(connector0.getState()) {
//             count += 1
//         }
//         if(connector1.getState()) {
//             count += 1
//         }
//         line.stroke({width, color: (new Color({r: (count/2)*255, g:0, b:0})).toHex()})
//     }

//     connector0.connect(observer)
//     connector1.connect(observer)

//     const that = {
//         toJson: () => {}
//     }

//     return that
// }

// function UiChip(chip, inputs, outputs) {
//     const group = svg.group().id(chip.id)

//     const chipData = chips[chip.chipId]
//     const label = chipData.label

//     const text = group.text(label.replace(' ', '\n'))
//     const width = Math.ceil((text.bbox().width+10)/step) * step

//     const inputHeight = (Object.keys(inputs).length + 1) * step
//     const outputHeight = (Object.keys(outputs).length + 1) * step
//     const connectorsHeight = Math.max(inputHeight, outputHeight)
//     const textHeight = Math.ceil((text.bbox().height+10)/step) * step

//     const height = Math.max(connectorsHeight, textHeight)
//     const inputsX = chip.x
//     const outputsX = chip.x + width
//     const connectorsStartY = chip.y
//     const boxX = chip.x
//     const boxY = chip.y - Math.floor((height-connectorsHeight)/step/2)*step

//     const rect = group.rect(width, height).move(boxX, boxY).fill('yellow')
//     rect.after(text) // Put text after rect
//     text.cx(rect.cx())
//     text.cy(rect.cy())

//     const sortedInputIds = chipData.elements.filter(elem => elem.type == 'input').sort((a, b) => a.y - b.y).map(elem => elem.id)
//     const sortedOutputIds = chipData.elements.filter(elem => elem.type == 'output').sort((a, b) => a.y - b.y).map(elem => elem.id)
//     let connectorY = connectorsStartY
//     for(const inputId of sortedInputIds) {
//         const id = `${chip.id}-${inputId}`
//         const connector = inputs[id]
//         UiConnector(inputsX, connectorY, group, connector, id)
//         connectorY += step
//     }

//     connectorY = connectorsStartY
//     for(const outputId of sortedOutputIds) {
//         const id = `${chip.id}-${outputId}`
//         const connector = outputs[id]
//         UiConnector(outputsX, connectorY, group, connector, id)
//         connectorY += step
//     }
// }

// svg.on('click', event => {
//     const x = event.offsetX-1
//     const y = event.offsetY-1
//     switch(state) {
//         case 'normal':
//             //UiConnector(x, y)
//             addChip(x, y, 'AND')
//             render(current_chip.elements)
//             break
//         case 'addingOutput':
//             break
//         case 'addingInput':
//             //UiInput(y)
//             addInput(y, '')
//             render(current_chip.elements)
//             break
//         default:
//             throw Error("Switch with Unhandled State")
//     }

//     event.stopPropagation()
//     event.preventDefault()
// })

// svg.on('dblclick', event => {
//     event.preventDefault()
//     event.stopPropagation()
// })

// init()
