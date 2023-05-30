import { SVG } from 'https://cdnjs.cloudflare.com/ajax/libs/svg.js/3.1.2/svg.esm.min.js' 
import { catmullRom2bezier } from './simplify.js'
import { brush as make_brush } from './brush.js'


var draw = SVG().addTo('body').size(300, 300)

let current_stroke = null
let current_stroke_array = null
let current_color = 'rgb(0, 0, 0)'
let current_width = 4

function render_stroke(points, stroke) {
  stroke.clear()
  if(points.length == 1) {
    stroke
      .circle(current_width)
      .fill(current_color)
      .center(points[0][0], points[0][1])
  }
  else if(points.length == 2) {
    stroke
      .polyline(points)
      .fill('none')
      .stroke({ color: current_color, width: current_width, linecap: 'round', linejoin: 'round' })
  }
  else {
    const path_string = catmullRom2bezier(points)
    stroke
      .path(path_string)
      .fill('none')
      .stroke({ color: current_color, width: current_width, linecap: 'round', linejoin: 'round' })
  }
}

const brush = make_brush(point => {
  if(current_stroke) {
    current_stroke_array.push(point)
    render_stroke(current_stroke_array, current_stroke)
  }
}, 5)

draw.on('pointermove', event => {
  brush([event.offsetX, event.offsetY])
})

draw.on('pointerdown', event => {
  current_stroke_array = []
  current_stroke = draw.group()
  brush([event.offsetX, event.offsetY], true)
})

draw.on('pointerup', event => {
  brush([event.offsetX, event.offsetY], true)
  
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
