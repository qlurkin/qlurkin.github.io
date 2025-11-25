---
title: Lab 3
subtitle: Render Pipeline
type: deck
typst: true
---

## The Render Pipeline

![The Render Pipeline](./render.drawio.svg)

## Vertex Buffers

- Data attached to **each Vertex**
- Vertex Shader Thread can only acces **one** Vertex's Data
- Examples:
  - position
  - normal
  - color
  - texture coordinates
  - ...
- Can be indexed by an Index Buffer

```python
vertex_data = np.array(
    [
        #   x,    y,    z,   xn,   yn,   zn,    u,    v
        [ 0.5,  0.5,  0.5,  0.0,  0.0,  1.0,  0.0,  0.0],
        [-0.5,  0.5,  0.5,  0.0,  0.0,  1.0,  0.0,  1.0],
        [-0.5, -0.5,  0.5,  0.0,  0.0,  1.0,  1.0,  1.0],
        [ 0.5, -0.5,  0.5,  0.0,  0.0,  1.0,  1.0,  0.0],

        [ 0.5,  0.5,  0.5,  1.0,  0.0,  0.0,  0.0,  0.0],
        [ 0.5, -0.5,  0.5,  1.0,  0.0,  0.0,  0.0,  1.0],
        [ 0.5, -0.5, -0.5,  1.0,  0.0,  0.0,  1.0,  1.0],
        [ 0.5,  0.5, -0.5,  1.0,  0.0,  0.0,  1.0,  0.0],

        [ 0.5,  0.5, -0.5,  0.0,  0.0, -1.0,  0.0,  0.0],
        [ 0.5, -0.5, -0.5,  0.0,  0.0, -1.0,  0.0,  1.0],
        [-0.5, -0.5, -0.5,  0.0,  0.0, -1.0,  1.0,  1.0],
        [-0.5,  0.5, -0.5,  0.0,  0.0, -1.0,  1.0,  0.0],

        [-0.5,  0.5,  0.5, -1.0,  0.0,  0.0,  0.0,  0.0],
        [-0.5,  0.5, -0.5, -1.0,  0.0,  0.0,  0.0,  1.0],
        [-0.5, -0.5, -0.5, -1.0,  0.0,  0.0,  1.0,  1.0],
        [-0.5, -0.5,  0.5, -1.0,  0.0,  0.0,  1.0,  0.0],

        [ 0.5,  0.5,  0.5,  0.0,  1.0,  0.0,  0.0,  0.0],
        [ 0.5,  0.5, -0.5,  0.0,  1.0,  0.0,  0.0,  1.0],
        [-0.5,  0.5, -0.5,  0.0,  1.0,  0.0,  1.0,  1.0],
        [-0.5,  0.5,  0.5,  0.0,  1.0,  0.0,  1.0,  0.0],

        [ 0.5, -0.5,  0.5,  0.0, -1.0,  0.0,  0.0,  0.0],
        [-0.5, -0.5,  0.5,  0.0, -1.0,  0.0,  0.0,  1.0],
        [-0.5, -0.5, -0.5,  0.0, -1.0,  0.0,  1.0,  1.0],
        [ 0.5, -0.5, -0.5,  0.0, -1.0,  0.0,  1.0,  0.0],
    ],
    dtype=np.float32,
)
```

## Vertex Shader

- One thread per Vertex

  ![Vertices](./Vertex.svg){.third}

- Must produce:
  - Vertex position in **Clip Space**
  - Any data needed for the Fragment Shader

## Espaces

- Vertex positions go through multiple **transformations**:
  - Object Space
  - World Space
  - Camera Space
  - Clipping Space

## Espace Object

- Axes attached to the object

```js{.script}
import * as THREE from './three.module.js'
import { OrbitControls } from './OrbitControls.js'
import { createLabel } from './label.js'

console.log(id)
const figure = document.createElement("figure")
document.getElementById(id).appendChild(figure)

const width = 1280
const height = 600

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 1000)
camera.position.set(6.25, 2.75, 1.22)
camera.up.set(0, 0, 1)

const renderer = new THREE.WebGLRenderer({antialias: true})
renderer.setClearColor( 0xffffff, 1)
renderer.setSize(width, height)
figure.appendChild(renderer.domElement)

const controls = new OrbitControls( camera, renderer.domElement )

const geometry = new THREE.BoxGeometry()
const wireframe = new THREE.EdgesGeometry( geometry );
const line = new THREE.LineSegments(
  wireframe, new THREE.LineBasicMaterial( { color: 0x0000ff, linewidth: 2 } )
);
const redMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000 } )
const cube = new THREE.Mesh(
  wireframe, new THREE.LineBasicMaterial( { color: 0x0000ff, linewidth: 2 } )
)

const axeZ = new THREE.ArrowHelper(
  new THREE.Vector3( 0, 0, 1 ), new THREE.Vector3( 0, 0, 0 ), 1, 0x000000
)
const axeX = new THREE.ArrowHelper(
  new THREE.Vector3( 1, 0, 0 ), new THREE.Vector3( 0, 0, 0 ), 1, 0x000000
)
const axeY = new THREE.ArrowHelper(
  new THREE.Vector3( 0, 1, 0 ), new THREE.Vector3( 0, 0, 0 ), 1, 0x000000
)

const labelX = createLabel('x')
labelX.position.set(1.2, 0, 0)

const labelY = createLabel('y')
labelY.position.set(0, 1.2, 0)

const labelZ = createLabel('z')
labelZ.position.set(0, 0, 1.2)

scene.add(line)
scene.add(axeX)
scene.add(axeY)
scene.add(axeZ)
scene.add(labelX)
scene.add(labelY)
scene.add(labelZ)

renderer.domElement.style=''

const animate = function () {
    requestAnimationFrame( animate )
    controls.update();
    renderer.render( scene, camera )
}

animate()
```

## Projective Geometry

- Transition to projective geometry
  $$mat(x; y; z) arrow.r mat(k dot.c x; k dot.c y; k dot.c z; k)$$

  For all $k$. We often choose $k=1$

## World Space

- Transition from object space to world space

$$mat(x_w; y_w; z_w; t_w) = "ModelMatrix" dot.c mat(x_o; y_o; z_o; t_o)$$

- This matrix is a combination of translation, rotation ans scaling.

## Camera Space

- Transition from world space to camera space

$$mat(x_"cam"; y_"cam"; z_"cam"; t_"cam") = "ViewMatrix" dot.c mat(x_w; y_w; z_w; t_w)$$

- This matrix is a combination of translation and rotation. We sometimes combine
  the ModelMatrix and the ViewMatrix matrices.

$$"ModelViewMatrix" = "ViewMatrix" dot.c "ModelMatrix"$$

## View Matrix

```python
def look_at(
    eye: ArrayLike, target: ArrayLike, up: ArrayLike
) -> NDArray:
    """
    Convert world coordinates to camera coordinates where the camera
    point in the direction of -z axis.
    """
    eye = np.array(eye, dtype=np.float32)
    target = np.array(target, dtype=np.float32)
    up = np.array(up, dtype=np.float32)
    f = target - eye
    f = f / np.linalg.norm(f)
    s = np.cross(f, up)
    s = s / np.linalg.norm(s)
    u = np.cross(s, f)

    return np.array([[ s[0],  s[1],  s[2], -eye @ s],
                     [ u[0],  u[1],  u[2], -eye @ u],
                     [-f[0], -f[1], -f[2],  eye @ f],
                     [    0,     0,     0,        1]], dtype=np.float32)
```

## Clip Space

- Projection of the vertices by the camera.

$$mat(x_"clip"; y_"clip"; z_"clip"; t_"clip") = "ProjectionMatrix" dot.c mat(x_"cam"; y_"cam"; z_"cam"; t_"cam")$$

- Vertices outside the interval $([-t, t], [-t, t], [0, t], t)$ are **clipped**.

## Projection Matrix

```python
def perspective(
    fovy_deg: float, aspect: float, near: float, far: float)
) -> NDArray:
    """
    Convert camera coordinates to wgpu clip coordinates where x and y goes
    from -1.0 to 1.0 and z goes from 0.0 to 1.0.
    """

    angle = fovy_deg * np.pi / 180

    yspan = near * np.tan(angle)
    xspan = yspan * aspect

    c0r0 = 2 * near / xspan
    c1r1 = 2 * near / yspan
    c2r2 = -(far + near) / (far - near) / 2 - 0.5
    c3r2 = -far * near / (far - near)

    return np.array([[c0r0,    0,    0,    0],
                     [   0, c1r1,    0,    0],
                     [   0,    0, c2r2, c3r2],
                     [   0,    0,   -1,    0]], dtype=np.float32)
```

## Normalized Device Coordinates (NDC)

- We leave the projective geometry
- Not in Vertex Shader
- Called **perspective division**

$$mat(x_"ndc"; y_"ndc"; z_"ndc") = mat(x_"clip"/t_"clip"; y_"clip"/t_"clip"; z_"clip"/t_"clip")$$

## Rasterizer

- Get data from the Vertex Stage
- Compose Primitives [Triangles, Lines, Points, ...]{.small}
- Divide primitives into Fragments _(pixels)_

  ![Fragments](./Fragments.svg){.third}

- Interpolate data from the Vertex Stage across primitives

## Fragment Shader

- One thread per Fragment
- Compute the color of the fragment [The Shading]{.small}

## Depth Texture / z-buffer

- Store $z_"clip"$ for each pixel
- Enables **hidden surface removal** [avoid rendering a fragment that is behind
  the current rendered fragment at that pixel]{.small}
- Required for **3D rendering pipelines** [We cannot always render from back to
  front]{.small}

- Can be sampled in shaders for post-processing effects

## The Window

```terminal
> pip install rendercanvas glfw
```

```python
from rendercanvas.auto import RenderCanvas, loop
import wgpu

adapter = wgpu.gpu.request_adapter_sync(power_preference="high-performance")
device = adapter.request_device_sync()

canvas = RenderCanvas(
    size=(640, 480), title="WebGPU Example",
    update_mode="continuous", max_fps=60,
)
context = canvas.get_wgpu_context()
render_texture_format = context.get_preferred_format(device.adapter)
context.configure(device=device, format=render_texture_format)

@canvas.request_draw
def draw_frame():
    screen_texture = context.get_current_texture()
    # render in the screen_texture

loop.run()
```

## Shading

- Diffuse lighting
  - The most basic lighting model [The diffuse lighting corresponds to the light
    reflected in all directions by the illuminated surface. It does not depend
    on the point of view.]{.small}

:::row

::::span4

![Diffuse Lighting](./Diffuse.svg){.third2}

::::

::::span8

- $N$ is the normal vector to the surface.
- $L$ is the vector directed towards the light.

These two vectors are normalized.

The diffuse intensity reflected $I_d$ is calculated by

$$I_d = (L dot.c N)C_d$$

where is the diffuse color (i.e. the color of the object).

Colors are $(r, g, b)$ vectors.

::::

:::

## Texture Coordinates

![ ](./uv.drawio.svg)

## Cube{.code}

```python

```
