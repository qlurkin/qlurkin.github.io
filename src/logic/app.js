import {canvas, inputSide, outputSide, workspace, snapX, snapY } from './canvas.js'
import AND from './AND.js'
import NOT from './NOT.js'
import INPUT from './INPUT.js'
import OUTPUT from './OUTPUT.js'
import WIRE from './WIRE.js'
import LED from './LED.js'
import DELAY from './DELAY.js'
import free_connector from './CONNECT.js'
import { clear, fromJson, getCurrentColor, getCurrentDescription, getCurrentName, setCurrentColor, setCurrentDescription, setCurrentName } from './current.js'
import { loadLibrary, saveCurrent } from './library.js'
import { colorPicker } from './colorPicker.js'
import { form_modal, prompt } from './modal.js'
import TEXT from './TEXT.js'

workspace.on('click', event => {
  if(startWire) {
    free_connector.create(canvas, event.offsetX, event.offsetY).then(fc => {
      WIRE.create(startWire, fc.uiConnector)
      startWire = fc.uiConnector
    })
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

document.getElementById('AND').addEventListener('click', _event => {
  AND.create(canvas, -100, -100).then(elem => {
    elem.startDrag()
  })
})

document.getElementById('NOT').addEventListener('click', _event => {
  NOT.create(canvas, -100, -100).then(elem => {
    elem.startDrag()
  })
})

document.getElementById('DELAY').addEventListener('click', _event => {
  DELAY.create(canvas, -100, -100).then(elem => {
    elem.startDrag()
  })
})

document.getElementById('LED').addEventListener('click', _event => {
  LED.create(canvas, -100, -100).then(elem => {
    elem.startDrag()
  })
})

document.getElementById('TEXT').addEventListener('click', _event => {
  prompt('The text ?', '', value => {
    TEXT.create(canvas, -100, -100, value).then(elem => {
      elem.startDrag()
    })
  })
})

document.getElementById('SAVE').addEventListener('click', _event => {
  /*if(getCurrentName() === null) {
    const name = prompt("chip name ?")
    setCurrentName(name)
  }
  saveCurrent()*/
  form_modal(document.getElementById('chip-modal'), {name: getCurrentName(), description: getCurrentDescription(), color: getCurrentColor()}, data => {
    setCurrentName(data.name)
    setCurrentColor(data.color)
    setCurrentDescription(data.description)
    saveCurrent()
  })
})

document.getElementById('CLEAR').addEventListener('click', _event => {
  clear()
})

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
