import { canvas } from "./canvas.js"

//const elements = []
let current = null

function new_current() {
  current = {
    name: null,
    description: "",
    elements: [],
    color: "#00FF00"
  }
}

new_current()

function nextId() {
  if(current.elements.length === 0) return "e0"
  return `e${Math.max(...current.elements.map(elm => parseInt(elm.id.slice(1), 10)))+1}`  
}

export function nextInput() {
  const inputs = current.elements.filter(elm => elm.type === 'INPUT')
  console.log(inputs)
  const nums = inputs.map(elm => parseInt(elm.getLabel().slice(2), 10)).filter(elm => !isNaN(elm))
  console.log(nums)
  if(nums.length === 0) return "in0"
  return `in${Math.max(...nums)+1}`
}

export function nextOutput() {
  const outputs = current.elements.filter(elm => elm.type === 'OUTPUT')
  const nums = outputs.map(elm => parseInt(elm.getLabel().slice(3), 10)).filter(elm => !isNaN(elm))
  if(nums.length === 0) return "out0"
  return `out${Math.max(...nums)+1}`
}

export function findConnector(chipId, connectorLabel) {
  return current.elements.find(elm => elm.id === chipId).getConnector(connectorLabel)
}

export function addElement(element, id) {
  if(!id) id = nextId()
  element.id = id
  current.elements.push(element)
  dirty()
}

export function removeElement(element) {
  const index = current.elements.findIndex(item => item == element)
  current.elements.splice(index, 1)
  dirty()
}

let cleaning = null

export function dirty() {
  if(cleaning) {
    clearTimeout(cleaning)
  }
  cleaning = setTimeout(() => {
    clean()
    cleaning = null
  }, 100)
}

function clean() {
  console.log(toObj())
  localStorage.setItem('current', toJson())
}

export function toObj() {
  const res = {
    name: current.name,
    description: current.description,
    elements: [],
    color: current.color
  }
  for(const elm of current.elements) {
    const obj = elm.toObj()
    res.elements.push(obj)
  }
  return res
}

export function toJson() {
  return JSON.stringify(toObj())
}

export function fromObj(save) {
  new_current()
  current.name = save.name
  current.description = save.description
  current.color = save.color
  let promise = Promise.resolve()
  for(const obj of save.elements) {
    promise = promise.then(() => import(`./${obj.type}.js`))
      .then(ELM => {
        ELM.default.createFromObj(canvas, obj)
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export function clear() {
  for(const element of [...current.elements]) {
    if(element.type !== 'WIRE')
      element.destroy()
  }
  new_current()
}

export function fromJson(json) {
  fromObj(JSON.parse(json))
}

export function getCurrentName() {
  return current.name
}

export function setCurrentName(value) {
  current.name = value
}

export function getCurrentColor() {
  return current.color
}

export function setCurrentColor(value) {
  current.color = value
}

export function getCurrentDescription() {
  return current.description
}

export function setCurrentDescription(value) {
  current.description = value
}
