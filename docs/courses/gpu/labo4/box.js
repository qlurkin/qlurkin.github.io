import * as THREE from './three.module.js'

function maxcomp(vec) {
    return Math.max(vec.x, vec.y, vec.z)
}

function msign(vec) {
    const res = new THREE.Vector3(0, 0, 0);
    for(let k of ['x', 'y', 'z']) {
        if(vec[k] > 0) res[k] = 1
        else res[k] = -1
    }
    return res
}

function abs(vec) {
    const res = new THREE.Vector3(0, 0, 0);
    for(let k of ['x', 'y', 'z']) {
        res[k] = Math.abs(vec[k])
    }
    return res
}

function max(vec, value) {
    const res = new THREE.Vector3(0, 0, 0);
    for(let k of ['x', 'y', 'z']) {
        res[k] = Math.max(vec[k], value)
    }
    return res
}

function add(v1, v2) {
    const res = new THREE.Vector3(0, 0, 0);
    for(let k of ['x', 'y', 'z']) {
        res[k] = v1[k] + v2[k]
    }
    return res
}

function mult(v1, v2) {
    const res = new THREE.Vector3(0, 0, 0);
    for(let k of ['x', 'y', 'z']) {
        res[k] = v1[k] * v2[k]
    }
    return res
}

function opposite(vec) {
    const res = new THREE.Vector3(0, 0, 0);
    for(let k of ['x', 'y', 'z']) {
        res[k] = -vec[k]
    }
    return res
}

function normalize(vec) {
    const res = vec.clone()
    res.normalize()
    return res
}

function step(v1, v2) {
    const res = new THREE.Vector3(0, 0, 0);
    for(let k of ['x', 'y', 'z']) {
        if(v1[k] < v2[k]) res[k] = 0
        else res[k] = 1
    }
    return res
}

function xyz(vec) {
    return new THREE.Vector3(vec.x, vec.y, vec.z);
}

function yzx(vec) {
    return new THREE.Vector3(vec.y, vec.z, vec.x);
}

function zxy(vec) {
    return new THREE.Vector3(vec.z, vec.x, vec.y);
}

function dot(v1, v2) {
    return v1.dot(v2)
}

function multScalar(scalar, vec) {
    const res = vec.clone()
    res.multiplyScalar(scalar)
    return res
}

function boxDistance(p, rad) {
    const d = add(abs(p), opposite(rad))
    return max(d,0.0).length() + Math.min(maxcomp(d),0.0)
}

function boxGradient(p, rad) {
    const d = add(abs(p), opposite(rad))
    const s = msign(p)
    const g = maxcomp(d)
    return mult(s, ((g>0.0) ? normalize(max(d,0.0)) : step(yzx(d),xyz(d))*step(zxy(d),xyz(d))))
}

export function box(particle, rad) {
    const distance = - boxDistance(particle.position, rad)

    if(distance < 0) {
        const gradient = opposite(boxGradient(particle.position, rad))
        const reflect = add(particle.velocity, opposite(multScalar(2*dot(particle.velocity, gradient), gradient)))
        particle.velocity.set(reflect.x, reflect.y, reflect.z)
        particle.position.add(multScalar(-1.9*distance, gradient))
    }
}