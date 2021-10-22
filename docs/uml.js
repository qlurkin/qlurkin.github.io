import {SVG, Point} from 'https://cdnjs.cloudflare.com/ajax/libs/svg.js/3.1.1/svg.esm.min.js'

export { SVG, Point }

export function arrow(context) {
   const size = 5
   context.polyline([[-size, -size], [0, 0], [-size, +size]]).fill('none').stroke({color: 'black'})
}

export function backArrow(context) {
   const size = 5
   context.line(0, 0, -1.5*size, 0).stroke({color: 'white', width: 2})
   context.polyline([[-size/2, -size], [-1.5*size, 0], [-size/2, +size]]).fill('none').stroke({color: 'black'})
}

export function aggregation(context) {
   const size = 5
   context.polygon([[-size, -size/2], [0, 0], [-size, +size/2], [-2*size, 0]]).fill('white').stroke({color: 'black'})
}

export function composition(context) {
   const size = 5
   context.polygon([[-size, -size/2], [0, 0], [-size, +size/2], [-2*size, 0]]).fill('black').stroke({color: 'black'})
}

export function inheritance(context) {
   const size = 5
   context.polygon([[-size*1.6, -size], [0, 0], [-size*1.6, +size]]).fill('white').stroke({color: 'black'})
}

function extremity(context, origin, box, arrow) {
   const endRatio = box.height / box.width
   const deltaX = box.cx - origin.x
   const deltaY = box.cy - origin.y
   const plSlope = deltaY / deltaX

   const tp = new Point(box.cx, box.cy)
   if(Math.abs(plSlope) < endRatio) {
      if(deltaX < 0) {
         tp.x += box.width/2
         tp.y += plSlope*box.width/2
      }
      else {
         tp.x -= box.width/2
         tp.y -= plSlope*box.width/2
      }
   }
   else {
      if(deltaY < 0) {
         tp.y += box.height/2
         tp.x += box.height/2/plSlope
      }
      else {
         tp.y -= box.height/2
         tp.x -= box.height/2/plSlope
      }
   }

   const angle = Math.atan2(deltaY, deltaX)*180/Math.PI
   
   const group = context.group()
   group.transform({
      origin: {x: 0, y:0},
      rotate: angle,
      translateX: tp.x,
      translateY: tp.y
   })
   arrow(group)
}

export function connect(context, start, startExtremity, end, endExtremity) {
   const startBB = start.rbox(context)
   const endBB = end.rbox(context)
   const startPoint = new Point(startBB.cx, startBB.cy)
   const endPoint = new Point(endBB.cx, endBB.cy)
   const pl = context.polyline([[startPoint.x, startPoint.y], [endPoint.x, endPoint.y]]).fill('none').stroke({ color: 'black', linecap: 'round', linejoin: 'round' })
   
   if(endExtremity)
      extremity(context, startPoint, endBB, endExtremity)
   if(startExtremity)
      extremity(context, endPoint, startBB, startExtremity)

   end.before(start)
   start.before(pl)
}

export function textBoxes(context, textss, point, background, radius) {
   const group = context.group()

   const heights = []
   const widths = []
   const svgTextss = []

   // Create Texts and compute sizes
   for(let texts of textss) {
      const svgTexts = texts.map(t => group.text(t))
      let height = 10
      if(svgTexts.length > 0)
         height += svgTexts.length * svgTexts[0].bbox().height
      heights.push(height)
      widths.push(svgTexts.map(text => text.bbox().width).reduce((a, b) => Math.max(a, b), 0) + 20)
      svgTextss.push(svgTexts)
   }
   const width = widths.reduce((a, b) => Math.max(a, b), 0)
   const height = heights.reduce((a, b) => a + b, 0)

   // Draw border
   const rect = group.rect().size(width, height).radius(radius).stroke({color: "black"}).fill(background).center(0, 0)
   rect.front()

   // place texts
   let currentY = -height/2 + 5
   const currentX = -width/2+10
   for(let svgTexts of svgTextss) {
      for(let svgText of svgTexts) {
         svgText.move(currentX, currentY)
         currentY += svgText.bbox().height
         svgText.front()
      }
      currentY += 5 + 5
   }

   // Draw separator lines
   currentY = -height/2
   for(let i=0; i<heights.length-1; i++) {
      currentY += heights[i]
      group.line(-width/2, currentY, width/2, currentY).stroke({color: "black"})
   }

   // Center First Part
   for(let svgText of svgTextss[0]) {
      svgText.cx(0)
   }

   group.transform({
      translateX: point.x,
      translateY: point.y
   })

   return group
}

export function drawClass(context, name, attributs, methods, point) {
   const textss = [[name], attributs, methods]
   return textBoxes(context, textss, point, 'white', 0)
}

export function drawObject(context, name, values, point) {
   const textss = [[name], values]
   return textBoxes(context, textss, point, 'yellow', 4)
}

export function drawVariable(context, name, point) {
   const group = context.group()

   const svgText = group.text(name)
   const lineHeight = svgText.bbox().height + 5
   const nameWidth = svgText.bbox().width

   const wrapper = group.rect().size(2*nameWidth+lineHeight + 10, lineHeight).center(0, 0).fill('none').stroke({width: 0})
   group.rect().size(lineHeight, lineHeight).center(0, 0).fill('none').stroke({color: 'black'})
   group.circle(5).center(0, 0).fill('black')
   svgText.front()

   svgText.x(-wrapper.width()/2)
   svgText.cy(0)

   group.transform({
      translateX: point.x,
      translateY: point.y
   })

   return group
}
