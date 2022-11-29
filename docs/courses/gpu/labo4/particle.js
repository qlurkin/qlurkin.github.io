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

    that.verlet = function (dt, accFn) {
        for (let k of ['x', 'y', 'z']) {
            const a = accFn(that.position)
            that.position[k] += that.velocity[k] * dt + 0.5 * a[k] * dt * dt
            const aa = accFn(that.position)
            that.velocity[k] += (a[k] + aa[k])/2 * dt
        }
    }

    return that
}
