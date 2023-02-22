import { gridX, gridY, canvas } from "./canvas.js"

const elements = []

function nextId() {
  if(elements.length === 0) return "e0"
  return `e${Math.max(...elements.map(elm => parseInt(elm.id.slice(1), 10)))+1}`  
}

export function nextInput() {
  const inputs = elements.filter(elm => elm.type === 'INPUT')
  const nums = inputs.map(elm => parseInt(elm.getLabel().slice(2), 10)).filter(elm => !isNaN(elm))
  if(inputs.length === 0) return "in0"
  return `in${Math.max(...nums)+1}`
}

export function nextOutput() {
  const outputs = elements.filter(elm => elm.type === 'OUTPUT')
  const nums = outputs.map(elm => parseInt(elm.getLabel().slice(3), 10)).filter(elm => !isNaN(elm))
  if(outputs.length === 0) return "out0"
  return `out${Math.max(...nums)+1}`
}

export function findConnector(chipId, connectorLabel) {
  return elements.find(elm => elm.id === chipId).getConnector(connectorLabel)
}

export function addElement(element, id) {
  if(!id) id = nextId()
  element.id = id
  elements.push(element)
  dirty()
}

export function removeElement(element) {
  const index = elements.findIndex(item => item == element)
  elements.splice(index, 1)
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
  const res = []
  for(const elm of elements) {
    const obj = elm.toObj()
    res.push(obj)
  }
  return res
}

export function toJson() {
  return JSON.stringify(toObj())
}

export function fromObj(objs) {
  for(const obj of objs) {
    import(`./${obj.type}.js`)
      .then(ELM => {
        ELM.default.createFromObj(canvas, obj)
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export function clear() {
  for(const element of [...elements]) {
    if(element.type !== 'WIRE')
      element.destroy()
  }
}

export function fromJson(json) {
  fromObj(JSON.parse(json))
}
