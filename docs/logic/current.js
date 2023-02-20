import { gridX, gridY } from "./canvas.js"

const elements = []

function nextId() {
  if(elements.length === 0) return "e0"
  return `e${Math.max(...elements.map(elm => parseInt(elm.id.slice(1), 10)))+1}`  
}

export function nextInput() {
  const inputs = elements.filter(elm => elm.type === 'INPUT')
  if(inputs.length === 0) return "in0"
  return `in${Math.max(...inputs.map(elm => parseInt(elm.getLabel().slice(2), 10)))+1}`
}

export function nextOutput() {
  const outputs = elements.filter(elm => elm.type === 'OUTPUT')
  if(outputs.length === 0) return "out0"
  return `out${Math.max(...outputs.map(elm => parseInt(elm.getLabel().slice(3), 10)))+1}`
}

export function addElement(element) {
  const id = nextId()
  element.id = id
  elements.push(element)
  setTimeout(() => {
    console.log(toJson())
  }, 100)
}

export function removeElement(element) {
  const index = elements.findIndex(item => item == element)
  elements.splice(index, 1)
  setTimeout(() => {
    console.log(toJson())
  }, 100)
}

export function toJson() {
  const res = []
  for(const elm of elements) {
    const obj = {
      id: elm.id,
      type: elm.type,
    }

    if(elm.type !== 'WIRE') {
      obj.x = gridX(elm.x())
      obj.y = gridY(elm.y())
    }
    else {
      obj.ends = []
      for(const end of elm.ends) {
        obj.ends.push({
          element: end.element.id,
          connector: end.getLabel()
        })
      }
    }

    res.push(obj)
  }
  return res
}
