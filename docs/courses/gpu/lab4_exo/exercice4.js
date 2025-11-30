import * as THREE from './three.module.js'
import { OrbitControls } from './OrbitControls.js'
import { createLabel } from './label.js'
import { Particle } from './particle.js'
import { box } from './box.js'

const width = 1200
const height = 800

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 1000)
camera.position.set(6.25, 2.75, 1.22)
camera.up.set(0, 0, 1)

const renderer = new THREE.WebGLRenderer({antialias: true})
renderer.setClearColor( 0xffffff, 1)
renderer.setSize(width, height)
document.getElementById('cube3').appendChild(renderer.domElement)

const controls = new OrbitControls( camera, renderer.domElement )

const geometry = new THREE.BoxGeometry()
const wireframe = new THREE.EdgesGeometry( geometry );
const line = new THREE.LineSegments( wireframe, new THREE.LineBasicMaterial( { color: 0x0000ff, linewidth: 2 } ) );
const redMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000 } )
const cube = new THREE.Mesh( wireframe, new THREE.LineBasicMaterial( { color: 0x0000ff, linewidth: 2 } ))

const sphere = new THREE.OctahedronGeometry(0.05, 2)
const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } )

const particles = []
for(let i=0; i<10; i++) {
    const point = Particle(Math.random()/2, Math.random()/2, Math.random()/2, Math.random(), Math.random(), Math.random(), sphere, material)
    scene.add(point)
    particles.push(point)
}

scene.add(line)

renderer.domElement.style=''

const animate = function () {
    requestAnimationFrame( animate )
    controls.update()
    const dt = 0.016
    for(let point of particles) {
        point.update(dt)
        //point.verlet(dt, () => new THREE.Vector3(0.0, 0.0, -9.81))
        box(point, new THREE.Vector3(0.45, 0.45, 0.45))
        point.velocity.z += -9.81 * dt
    }
    renderer.render( scene, camera )
}

animate()
