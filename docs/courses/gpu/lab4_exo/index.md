---
title: Lab 4
subtitle: Simulation
typst: true
---

In this session we will start simulating some particles.

## Frame time

A particle is simply a point which has a position $(x, y, z)$ and a velocity
$(v_x, v_y, v_z)$. To animate it, you just have to update its position at each
_frame_.

$$x &= x + Delta t dot v_x \ y &= y + Delta t dot v_y \ z &= z + Delta t dot v_z$$

You can see that you need to get the $Delta t$ between two frames. You can
measure it with the function `perf_counter()` from the module time.

### Exercice

Show the measured frame time in an `imgui` window.

## Animate some particles

You can create a `particles` buffer that contains the position and the velocity
of each particle.

To draw multiple particles we will use wgpu instances. In order to draw each
instance at its own position we will use the particles buffer as an instance
buffer.

### Exercice

Make a program that update the **Particle Instance Buffer** at each frame.

## Collision

When a collision is detected, the particle is reflected with respect to the
normal to the collision surface. So it is the direction of the velocity vector
of the particle that changes.

The detection of the collision and the calculation of the normal depend on the
collision surface. For a plane with equation $a x + b y + c z + d = 0$ the
normal is $(a, b, c)$. Such a plane separates the space in 2 regions: The region
where the expression $a x + b y + c z + d$ is positive and the one where it is
negative. We generally choose the positive region as the allowed area for the
particle and we detect a collision as soon as it passes in the negative region.

Once the collision is detected, the particle is in the "forbidden zone". It is
usually necessary to move it back into the allowed area before letting the
simulation continue. this is called "resolving" the collision.

It is of course possible to detect collisions with other primitives than planes.

### Exercice

Place your particles in a box and let it bounce on the 6 faces. A box can be
implemented by 6 planes or by
[a suitable SDF _(Signed Distance Field)_ function](https://www.iquilezles.org/www/articles/boxfunctions/boxfunctions.htm).

<figure id="cube2"></figure>
<script type='module' src='exercice3.js'> </script>

## Gravity

Gravity is more an acceleration than a force. It directly modifies the speed of
the particles:

$$v_x &= v_x + Delta t dot g_x \ v_y &= v_y + Delta t dot g_y \ v_z &= v_z + Delta t dot g_z$$

### Exercice

Update your program to add gravity.

<figure id="cube3"></figure>
<script type='module' src='exercice4.js'> </script>
