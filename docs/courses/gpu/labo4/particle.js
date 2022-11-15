import * as THREE from './three.module.js'

export function Particle(x, y, z, vx, vy, vz, geometry, material) {
    const that = new THREE.Mesh(geometry, material)
    that.position.set(x, y, z)

    that.velocity = new THREE.Vector3(vx, vy, vz)

    that.update = function (dt) {
        for (let k of ['x', 'y', 'z']) {
            that.position[k] += that.velocity[k] * dt
        }
    }

    return that
}