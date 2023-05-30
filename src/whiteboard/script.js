import { SVG } from 'https://cdnjs.cloudflare.com/ajax/libs/svg.js/3.1.2/svg.esm.min.js' 
import { catmullRom2bezier, simplify } from './simplify.js'

var draw = SVG().addTo('body').size(300, 300)

let current_stroke = null
let current_stroke_array = null
let current_color = 'rgb(0, 0, 0)'
let current_width = 4

draw.on('mousemove', event => {
  if(current_stroke) {
    current_stroke_array.push([event.offsetX, event.offsetY])
    current_stroke.plot(current_stroke_array)
  }
})

draw.on('mousedown', event => {
  current_stroke_array = [[event.offsetX, event.offsetY]]
  current_stroke = draw
    .polyline(current_stroke_array)
    .fill('none')
    .stroke({ color: current_color, width: current_width, linecap: 'round', linejoin: 'round' })
})

draw.on('mouseup', () => {
  current_stroke_array = simplify(current_stroke_array)
  if(current_stroke_array.length == 1) {
    current_stroke.remove()
    draw.circle(current_width).fill(current_color).center(current_stroke_array[0][0], current_stroke_array[0][1])
  }
  else if(current_stroke_array.length == 2) {
    current_stroke.plot(current_stroke_array)
  }
  else {
    const path_string = catmullRom2bezier(current_stroke_array)
    current_stroke.remove()
    draw
      .path(path_string)
      .fill('none')
      .stroke({ color: current_color, width: current_width, linecap: 'round', linejoin: 'round' })
  }

  current_stroke = null
  current_stroke_array = null
})

function removeSelected(selector) {
  document.querySelectorAll(selector).forEach(elem => {
    elem.classList.remove('selected')
  })
}

document.querySelectorAll('.size').forEach(elem => {
  elem.addEventListener('click', event => {
    const width = parseInt(elem.querySelector('circle').getAttribute('r'), 10)*2
    current_width = width
    removeSelected('.size')
    elem.classList.add('selected')
  })
})

document.querySelectorAll('.color').forEach(elem => {
  elem.addEventListener('click', event => {
    const color = elem.querySelector('circle').getAttribute('fill')
    current_color = color
    removeSelected('.color')
    elem.classList.add('selected')
  })
})

document.querySelector('.undo').addEventListener('click', () => {
  if(draw.children().length == 0) return
  draw.last().remove()
})

document.querySelector('.clear').addEventListener('click', () => {
  draw.clear()
})
