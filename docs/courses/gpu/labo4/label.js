import * as THREE from './three.module.js'

function makeLabelCanvas(size, name) {
   const borderSize = 2;
   const ctx = document.createElement('canvas').getContext('2d');
   const font = `${size}px monospace`;
   ctx.font = font;
   // measure how long the name will be
   const doubleBorderSize = borderSize * 2;
   const width = ctx.measureText(name).width + doubleBorderSize;
   const height = size + doubleBorderSize;
   ctx.canvas.width = width;
   ctx.canvas.height = height;

   // need to set font again after resizing canvas
   ctx.font = font;
   ctx.textBaseline = 'top';

   ctx.fillStyle = 'transparent';
   ctx.fillRect(0, 0, width, height);
   ctx.fillStyle = 'black';
   ctx.fillText(name, borderSize, borderSize);

   return ctx.canvas;
}

export function createLabel(text) {
   const canvas = makeLabelCanvas(60, text)
   const texture = new THREE.CanvasTexture(canvas)
   texture.minFilter = THREE.LinearFilter
   texture.wrapS = THREE.ClampToEdgeWrapping
   texture.wrapT = THREE.ClampToEdgeWrapping

   const labelMaterial = new THREE.SpriteMaterial({
      map: texture,
      side: THREE.DoubleSide,
      transparent: true,
   })

   const label = new THREE.Sprite(labelMaterial)
   label.scale.set(0.1*text.length, 0.2, 0.2)

   return label
}