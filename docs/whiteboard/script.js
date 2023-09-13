import { SVG } from 'https://cdnjs.cloudflare.com/ajax/libs/svg.js/3.1.2/svg.esm.min.js' 
import { catmullRom2bezier } from './simplify.js'
import { brush as make_brush } from './brush.js'


var draw = SVG().addTo('body').size(300, 300)
draw.addClass('drawing')

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
}, 2)

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
  elem.addEventListener('click', () => {
    const width = parseInt(elem.querySelector('circle').getAttribute('r'), 10)*2
    current_width = width
    removeSelected('.size')
    elem.classList.add('selected')
  })
})

document.querySelectorAll('.color').forEach(elem => {
  elem.addEventListener('click', () => {
    const color = elem.querySelector('circle').getAttribute('fill')
    current_color = color
    removeSelected('.color')
    elem.classList.add('selected')
  })
})

document.querySelectorAll('img').forEach(elem => { elem.ondragstart = () => false })

document.querySelector('.undo').addEventListener('click', () => {
  if(draw.children().length == 0) return
  draw.last().remove()
})

document.querySelector('.clear').addEventListener('click', () => {
  draw.clear()
})

function download(filename, text) {
  const element = document.createElement('a')
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
  element.setAttribute('download', filename)

  element.style.display = 'none'
  document.body.appendChild(element)

  element.click()

  document.body.removeChild(element)
}

document.querySelector('.download').addEventListener('click', () => {
  download('whiteboard.svg', `<?xml version="1.0" standalone="no"?><svg viewBox="0 0 ${window.innerWidth} ${window.innerHeight}" style="background-color:#ffffffff" width="${window.innerWidth}" height="${window.innerHeight}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink= "http://www.w3.org/1999/xlink">${document.querySelector('svg.drawing').innerHTML}</svg>`)
})

