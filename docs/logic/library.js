import { clear, fromObj, toObj } from "./current.js"
import { showMenu } from "./menu.js"
import { getAbsoluteGeometry } from "./utils.js"
import COMPOUND from "./COMPOUND.js"
import { canvas, offsetX } from "./canvas.js"

const chips = {}

function saveLibrary() {
  localStorage.setItem('library', JSON.stringify(chips))
}

export function loadLibrary() {
  Object.assign(chips, JSON.parse(localStorage.getItem('library')))
  console.log(chips)
  showButtons()
}

export function saveCurrent() {
  //if(chips[name]) throw Error(`Name (${name}) already used !`)
  const obj = toObj()
  chips[obj.name] = obj
  clear()
  showButtons()
  saveLibrary()
}

export function edit(name) {
  clear()
  const save = getCompound(name)
  fromObj(save)
}

export function deleteCompound(name) {
  delete chips[name]
  showButtons()
  saveLibrary()
}

export function showButtons() {
  const root = document.getElementById('compounds')
  root.innerHTML = ''
  for(const name in chips) {
    const button = document.createElement('button')
    button.innerText = name
    button.addEventListener('contextmenu', event => {
      const {x, y} = getAbsoluteGeometry(event.target, document.body)
      showMenu(event.offsetX+x, event.offsetY+y, [
        {label: 'Delete', action: () => {deleteCompound(name)}},
        {label: 'Edit', action: () => {edit(name)}}
      ])
      event.preventDefault()
    })
    button.addEventListener('click', event => {
      COMPOUND.create(canvas, name, event.offsetX, event.offsetY).startDrag()
    })
    root.appendChild(button)
  }
}

export function getCompound(name) {
  return chips[name]
}