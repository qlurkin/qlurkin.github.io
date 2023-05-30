
function norm(v) {
  return Math.sqrt(v[0] * v[0] + v[1] * v[1])
}

function add(v1, v2) {
  return [v1[0]+v2[0], v1[1]+v2[1]]
}

function scale(v, k) {
  return [k*v[0], k*v[1]]
}

function neg(v) {
  return scale(v, -1)
}

function sub(v1, v2) {
  return add(v1, neg(v2))
}

export function brush(cb, radius, friction) {
  if(friction === undefined) friction = 0
  let position = [0, 0]
  function update(point, both) {
    if(both) {
      position = point
      cb(point)
      return
    }

    const pos2pt = sub(point, position)
    const length = norm(pos2pt)
    if(length > radius) {
      position = add(position, scale(pos2pt, (1-friction)*(length-radius)/length))
      cb(position)
      return
    }
  }
  return update
}
