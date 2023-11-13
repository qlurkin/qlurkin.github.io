---
title: Lab 5
subtitle: Simulation on CPU
typst: true
---

In this session we will start simulating some particles. We will start by doing it on the CPU to understand how these simulations work. At the end you will try to do it on the GPU.

To help us, we will use the [`wgpu-bootstrap`](https://github.com/qlurkin/wgpu-bootstrap) library.

## Animate a particle

A particle is simply a point which has a position $$(x, y, z)$$ and a velocity $$(v_x, v_y, v_z)$$. To animate it, you just have to update its position at each *frame*.

$$ x &= x + Delta t dot v_x \ y &= y + Delta t dot v_y \ z &= z + Delta t dot v_z $$

In `wgpu-bootstrap`, You can update the state of the App by implementing the `update` method of the `App` trait. This method receive the $$Delta t$$ as parameter.

You can create a `Particle` struct that contains the position and the speed of a particle.

### Exercice

To draw multiple particles we will use wgpu instances. It is possible to draw multiple instances of the same vertex buffer in one draw call. In order to draw each instance at its own position we add an instance buffer that contains data for each instance such position or any other meaningfull data.

In `wgpu-bootstrap`, there is an example of instances usage. You can start from it to make an instance buffer from a vector of `Particle`. 

Make a program that update the Particle Instance Buffer at each frame.

To write in an already existing buffer, we must send the new data with the [`Queue`](https://docs.rs/wgpu/latest/wgpu/struct.Queue.html#method.write_buffer). There is an example of that in the [`OrbitCamera`](https://github.com/qlurkin/wgpu-bootstrap/blob/main/src/util/orbit_camera.rs) of `wgpu-bootstrap`.

## Collision

When a collision is detected, the particle is reflected with respect to the normal to the collision surface. So it is the direction of the velocity vector of the particle that changes.

The detection of the collision and the calculation of the normal depend on the collision surface. For a plane with equation $$a x + b y + c z + d = 0$$ the normal is $$(a, b, c)$$. Such a plane separates the space in 2 regions: The region where the expression $$a x + b y + c z + d$$ is positive and the one where it is negative. We generally choose the positive region as the allowed area for the particle and we detect a collision as soon as it passes in the negative region.

Once the collision is detected, the particle is in the "forbidden zone". It is usually necessary to move it back into the allowed area before letting the simulation continue. this is called "resolving" the collision.

It is of course possible to detect collisions with other primitives than planes.

### Exercice

Place your particles in a box and let it bounce on the 6 faces. A box can be implemented by 6 planes or by [a suitable SDF *(Signed Distance Field)* function](https://www.iquilezles.org/www/articles/boxfunctions/boxfunctions.htm).

<figure id="cube2"></figure>
<script type='module' src='exercice3.js'> </script>

## Gravity

Gravity is more an acceleration than a force. It directly modifies the speed of the particles:

$$ v_x &= v_x + Delta t dot g_x \ v_y &= v_y + Delta t dot g_y \ v_z &= v_z + Delta t dot g_z $$

### Exercice

Update your program to add gravity.

<figure id="cube3"></figure>
<script type='module' src='exercice4.js'> </script>

## Compute shader

Use a Compute Shader to run the simulation. You must create a Compute Pipeline and the associated Bind Groups. Get inspired by your Game of Life project where you already created a Compute Pipeline.
