function HSLToRGB(h,s,l) {
  // Must be fractions of 1
  s /= 100
  l /= 100

  let c = (1 - Math.abs(2 * l - 1)) * s
  let x = c * (1 - Math.abs((h / 60) % 2 - 1))
  let m = l - c/2
  let r = 0
  let g = 0
  let b = 0

  if (0 <= h && h < 60) {
    r = c
    g = x
    b = 0
  } else if (60 <= h && h < 120) {
    r = x
    g = c
    b = 0
  } else if (120 <= h && h < 180) {
    r = 0
    g = c
    b = x
  } else if (180 <= h && h < 240) {
    r = 0
    g = x
    b = c
  } else if (240 <= h && h < 300) {
    r = x
    g = 0
    b = c
  } else if (300 <= h && h < 360) {
    r = c
    g = 0
    b = x
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return {r, g, b}
}
export function colorPicker(parent, width, height, luminance, callback) {
  const canvas = document.createElement('canvas')
  parent.appendChild(canvas)
  canvas.setAttribute('width', String(width))
  canvas.setAttribute('height', String(height))
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  const image = ctx.createImageData(width, height)
  const data = image.data
  for(let x=0; x<width; x++) {
    for(let y=0; y<height; y++) {
      const h = x/width*360
      const s = y/height*100
      const {r, g, b} = HSLToRGB(h, s, luminance)

      data[(y*width+x)*4+0] = r
      data[(y*width+x)*4+1] = g
      data[(y*width+x)*4+2] = b
      data[(y*width+x)*4+3] = 255
    }
  }
  ctx.putImageData(image, 0, 0)

  function pick(event) {
    const bounding = canvas.getBoundingClientRect();
    const x = event.clientX - bounding.left;
    const y = event.clientY - bounding.top;
    const pixel = ctx.getImageData(x, y, 1, 1);
    const data = pixel.data;

    callback(data[0], data[1], data[2])
  }

  canvas.addEventListener('click', event => pick(event))
}
