// square distance between 2 points
function getSqDist(p1, p2) {
  const dx = p1[0] - p2[0]
  const dy = p1[1] - p2[1]

  return dx * dx + dy * dy
}

// square distance from a point to a segment
function getSqSegDist(p, p1, p2) {
  let x = p1[0]
  let y = p1[1]
  let dx = p2[0] - x
  let dy = p2[1] - y

  if (dx !== 0 || dy !== 0) {
    const t = ((p[0] - x) * dx + (p[1] - y) * dy) / (dx * dx + dy * dy)

    if (t > 1) {
      x = p2[0]
      y = p2[1]
    } else if (t > 0) {
      x += dx * t
      y += dy * t
    }
  }

  dx = p[0] - x
  dy = p[1] - y

  return dx * dx + dy * dy
}

// basic distance-based simplification
function simplifyRadialDist(points, sqTolerance) {
  let prevPoint = points[0]
  const newPoints = [prevPoint]
  let point

  for (var i = 1, len = points.length; i < len; i++) {
    point = points[i]

    if (getSqDist(point, prevPoint) > sqTolerance) {
      newPoints.push(point)
      prevPoint = point
    }
  }

  if (prevPoint !== point) newPoints.push(point)

  return newPoints
}

// simplification using optimized Douglas-Peucker algorithm with recursion elimination
function simplifyDouglasPeucker(points, sqTolerance) {
  const len = points.length
  const MarkerArray = typeof Uint8Array !== "undefined" ? Uint8Array : Array
  const markers = new MarkerArray(len)
  let first = 0
  let last = len - 1
  const stack = []
  const newPoints = []
  let i
  let maxSqDist
  let sqDist
  let index

  markers[first] = markers[last] = 1

  while (last) {
    maxSqDist = 0

    for (i = first + 1; i < last; i++) {
      sqDist = getSqSegDist(points[i], points[first], points[last])

      if (sqDist > maxSqDist) {
        index = i
        maxSqDist = sqDist
      }
    }

    if (maxSqDist > sqTolerance) {
      markers[index] = 1
      stack.push(first, index, index, last)
    }

    last = stack.pop()
    first = stack.pop()
  }

  for (i = 0; i < len; i++) {
    if (markers[i]) newPoints.push(points[i])
  }

  return newPoints
}

// both algorithms combined for awesome performance
export function simplify(points, tolerance, highestQuality) {
  if (points.length <= 1) return points

  const sqTolerance = tolerance !== undefined ? tolerance * tolerance : 1

  points = highestQuality ? points : simplifyRadialDist(points, sqTolerance)
  points = simplifyDouglasPeucker(points, sqTolerance)

  return points
}

export function catmullRom2bezier( points ) {
  var d = `M${points[0][0]},${points[0][1]}`;
  for (let i = 0; i < points.length-1; i++) {
    var p = [];
    if ( i == 0 ) {
      p.push(points[i])
      p.push(points[i])
      p.push(points[i+1])
      p.push(points[i+2])
    } else if ( i == points.length - 2 ) {
      p.push(points[i-1])
      p.push(points[i])
      p.push(points[i+1])
      p.push(points[i+1])
    } else {
      p.push(points[i-1])
      p.push(points[i])
      p.push(points[i+1])
      p.push(points[i+2])
    }

    // Catmull-Rom to Cubic Bezier conversion matrix 
    //    0       1       0       0
    //  -1/6      1      1/6      0
    //    0      1/6      1     -1/6
    //    0       0       1       0

    var bp = [];
    bp.push( { x: p[1][0],  y: p[1][1] } );
    bp.push( { x: ((-p[0][0] + 6*p[1][0] + p[2][0]) / 6), y: ((-p[0][1] + 6*p[1][1] + p[2][1]) / 6)} );
    bp.push( { x: ((p[1][0] + 6*p[2][0] - p[3][0]) / 6),  y: ((p[1][1] + 6*p[2][1] - p[3][1]) / 6) } );
    bp.push( { x: p[2][0],  y: p[2][1] } );

    d += "C" + bp[1].x + "," + bp[1].y + " " + bp[2].x + "," + bp[2].y + " " + bp[3].x + "," + bp[3].y + " ";
  }

  return d;
}
