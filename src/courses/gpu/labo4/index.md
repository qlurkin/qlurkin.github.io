---
title: Lab 4 - Simulation on CPU
---

In this session we will start simulating some particles. We will start by doing it on the CPU to understand how these simulations work. In the next sessions we will see how to calculate them on GPU

## Animate a particle

A particle is simply a point which has a position $(x, y, z)$ and a velocity $(v_x, v_y, v_z)$. To animate it, you just have to update its position at each *frame*.

$$ \begin{array}{rcl} x & = & x + \Delta t \cdot v_x \\ y & = & y + \Delta t \cdot v_y \\ z & = & z + \Delta t \cdot v_z\end{array} $$

In `wgpu-bootstrap`, You can update the state of the App by implementing the `update` method of the `Application` trait. This method receive the $\Delta t$ as parameter.

### Exercice

To draw multiple particles we will use wgpu instances. It is possible to draw multiple instances of the same vertex buffer in one draw call. In order to draw each instance at its own position we add an instance buffer that contains data for each instance such position or any other meaningfull data.

In `wgpu-bootstrap`, there is a `Particle` struct that contains the position and velocity of a particle. This struct has a `desc` method that let you use it as an Instance Buffer. With `Particle` as instance buffer, you can use the position of the particle in your shader to translate the vertices used to display that particle.

Make a program that update the Particle Instance Buffer at each frame.

## Collision

When a collision is detected, the particle is reflected with respect to the normal to the collision surface. So it is the direction of the velocity vector of the particle that changes.

The detection of the collision and the calculation of the normal depend on the collision surface. For a plane with equation $ ax + by + cz + d = 0 $ the normal is $(a, b, c)$. Such a plane separates the space in 2 regions: The region where the expression $ ax + by + cz + d $ is positive and the one where it is negative. We generally choose the positive region as the allowed area for the particle and we detect a collision as soon as it passes in the negative region.

Once the collision is detected, the particle is in the "forbidden zone". It is usually necessary to move it back into the allowed area before letting the simulation continue.

It is of course possible to detect collisions with other primitives than planes.

### Exercice

Place your particles in a box and let it bounce on the 6 faces. A box can be implemented by 6 planes or by [a suitable SDF *(Signed Distance Field)* function](https://www.iquilezles.org/www/articles/boxfunctions/boxfunctions.htm).

<figure id="cube2"></figure>
<script type='module' src='exercice3.js'> </script>

## Gravité

Gravity is more an acceleration than a force. It directly modifies the speed of the particles:

$$ \begin{array}{rcl} v_x & = & v_x + \Delta t \cdot g_x \\ v_y & = & v_y + \Delta t \cdot g_y \\ v_z & = & v_z + \Delta t \cdot g_z\end{array} $$

### Exercice

Update your program to add gravity.

<figure id="cube3"></figure>
<script type='module' src='exercice4.js'> </script>


