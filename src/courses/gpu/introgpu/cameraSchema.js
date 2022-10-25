import * as THREE from './three.module.js'
import { OrbitControls } from './OrbitControls.js'
import { createLabel } from './label.js'

const width = 1200
const height = 800

function createPolyLine(points, color) {
   const lineGeometry = new THREE.BufferGeometry().setFromPoints( points )
   const line = new THREE.Line(
      lineGeometry,
      new THREE.LineBasicMaterial({
         color: color
      }))
   return line
}

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 1000)
camera.position.set(5, 2.13, -4.45)

const renderer = new THREE.WebGLRenderer({antialias: true})
renderer.setClearColor( 0xffffff, 1)
renderer.setSize(width, height)
document.getElementById('3d').appendChild(renderer.domElement)

const controls = new OrbitControls( camera, renderer.domElement )
controls.target.set(0, 0, -1)

const geometry = new THREE.BoxGeometry();
const redMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
const cube = new THREE.Mesh( geometry, redMaterial );

const pointGeometry = new THREE.SphereGeometry( 0.03, 32, 16 )
const origin = new THREE.Mesh(pointGeometry, redMaterial)
const real = new THREE.Mesh(pointGeometry, redMaterial)
real.position.set(0.5, 0.5, -2)
const image = new THREE.Mesh(pointGeometry, redMaterial)
image.position.set(0.25, 0.25, -1)
const plane = new THREE.Mesh(new THREE.PlaneGeometry( 1, 1 ), new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.DoubleSide, opacity: 0.7, transparent: true}))
plane.position.set(0, 0, -1)

const line = createPolyLine([
   new THREE.Vector3(0, 0, 0),
   new THREE.Vector3(0.5, 0.5, 0-2)
], 0x009000)

const border = createPolyLine([
   new THREE.Vector3(-0.51, -0.51, -1),
   new THREE.Vector3(-0.51, 0.51, -1),
   new THREE.Vector3(0.51, 0.51, -1),
   new THREE.Vector3(0.51, -0.51, -1),
   new THREE.Vector3(-0.51, -0.51, -1)
], 0x000000)

const realCoordinate = createPolyLine([
   new THREE.Vector3(0, 0, -2),
   new THREE.Vector3(0.5, 0, -2),
   new THREE.Vector3(0.5, 0.5, -2),
], 0x0000ff)

const imageCoordinate = createPolyLine([
   new THREE.Vector3(0, 0, -1.01),
   new THREE.Vector3(0.25, 0, -1.01),
   new THREE.Vector3(0.25, 0.25, -1.01),
], 0x0000ff)

const axeCam = createPolyLine([
   new THREE.Vector3(0, 0, 0),
   new THREE.Vector3(0, 0, -2),
], 0x000000)

const labelX = createLabel('x')
labelX.position.set(1.2, 0, 0)

const labelY = createLabel('y')
labelY.position.set(0, 1.2, 0)

const labelZ = createLabel('-z')
labelZ.position.set(0, 0, -3.2)

const labelP = createLabel('p')
labelP.position.set(0.5, 0.5, -2.2)

const labelPP = createLabel('p\'')
labelPP.position.set(0.25, 0.45, -1.2)

const axeCamArrow = new THREE.ArrowHelper( new THREE.Vector3( 0, 0, -1 ), new THREE.Vector3( 0, 0, -2 ), 1, 0x000000 )

const axeX = new THREE.ArrowHelper( new THREE.Vector3( 1, 0, 0 ), new THREE.Vector3( 0, 0, 0 ), 1, 0x000000 )

const axeY = new THREE.ArrowHelper( new THREE.Vector3( 0, 1, 0 ), new THREE.Vector3( 0, 0, 0 ), 1, 0x000000 )

scene.add(labelP)
scene.add(labelPP)
scene.add(labelX)
scene.add(labelY)
scene.add(labelZ)
scene.add( axeX )
scene.add( axeY )
scene.add( axeCamArrow )
scene.add(axeCam)
scene.add(imageCoordinate)
scene.add(realCoordinate)
scene.add(border)
scene.add(line)
scene.add(origin)
scene.add(plane)
scene.add(real)
scene.add(image)

renderer.domElement.style=''

const animate = function () {
   requestAnimationFrame( animate )
   controls.update();
   renderer.render( scene, camera )
}

animate()