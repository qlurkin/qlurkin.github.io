---
title: Lab 4
subtitle: Instances and Imgui
type: deck
typst: true
---

## Instances{.code}

```python
# ...
from scipy.spatial.transform import Rotation

class App:

  # ...

  def __init__(self):
    # ...
    self.instance_count = 10
    # ...
    instance_data = b""
    for _ in range(self.instance_count):
        trans = np.eye(4)
        trans[:3, 3] = np.random.uniform(-5, 5, 3)

        rot = np.eye(4)
        rot[:3, :3] = Rotation.random().as_matrix()

        instance_data += (trans @ rot).T.astype(np.float32).tobytes()

    self.instance_buffer = self.device.create_buffer_with_data(
        data=instance_data, usage=wgpu.BufferUsage.VERTEX
    )
    # ...
    instance_buffer_descriptor = {
        "array_stride": 4 * 4 * 4,
        "step_mode": wgpu.VertexStepMode.instance,
        "attributes": [
            {
                "format": wgpu.VertexFormat.float32x4,
                "offset": 0,
                "shader_location": 3,
            },
            {
                "format": wgpu.VertexFormat.float32x4,
                "offset": 4 * 4,
                "shader_location": 4,
            },
            {
                "format": wgpu.VertexFormat.float32x4,
                "offset": 8 * 4,
                "shader_location": 5,
            },
            {
                "format": wgpu.VertexFormat.float32x4,
                "offset": 12 * 4,
                "shader_location": 6,
            },
        ],
    }

    self.pipeline = self.device.create_render_pipeline(
        # ...
        vertex={
            "module": shader_module,
            "entry_point": "vs_main",
            "buffers": [vertex_buffer_descriptor, instance_buffer_descriptor],
        },
        # ...
    )

  def loop(self):
    # ...
    render_pass.set_vertex_buffer(1, self.instance_buffer)
    # ...
    render_pass.draw_indexed(36, self.instance_count)
```

## Instances Shader{.code}

```wgsl
struct RenderParams {
    light: vec4<f32>,
    view: mat4x4<f32>,
    proj: mat4x4<f32>,
};

@group(0) @binding(0) var<uniform> params: RenderParams;
@group(0) @binding(1) var texture: texture_2d<f32>;
@group(0) @binding(2) var samplr: sampler;

struct VertexInput {
    @location(0) position: vec3<f32>,
    @location(1) normal: vec3<f32>,
    @location(2) uv: vec2<f32>,
};

struct InstanceInput {
    @location(3) c0: vec4<f32>,
    @location(4) c1: vec4<f32>,
    @location(5) c2: vec4<f32>,
    @location(6) c3: vec4<f32>,
}

struct VertexOutput {
    @builtin(position) clip: vec4<f32>,
    @location(0) position: vec3<f32>,
    @location(1) normal: vec3<f32>,
    @location(2) uv: vec2<f32>,
};

@vertex
fn vs_main(in: VertexInput, instance: InstanceInput) -> VertexOutput {
    let model = mat4x4<f32>(instance.c0, instance.c1, instance.c2, instance.c3);
    var out: VertexOutput;
    out.clip = params.proj * params.view * model * vec4<f32>(in.position, 1.0);
    out.position = in.position;
    out.normal = in.normal;
    out.uv = in.uv;
    return out;
}

@fragment
fn fs_main(in: VertexOutput) -> @location(0) vec4<f32> {
    let light_dir = normalize(params.light.xyz - in.position);
    let shading = clamp(dot(light_dir, normalize(in.normal)), 0.1, 1.0);
    let color = textureSample(texture, samplr, in.uv);
    return vec4<f32>(color.xyz * shading, 1.0);
}
```

## Imgui

```terminal
> pip install imgui-bundle
```

## Imgui{.code}

```python
# ...
import random
from imgui_bundle import imgui  # Before rendercanvas
from rendercanvas.auto import RenderCanvas, loop
from wgpu.utils.imgui import ImguiRenderer

class App:

  # ...

  def __init__(self):
    # ...
    self.imgui_renderer = ImguiRenderer(self.device, self.canvas)

  def loop(self):
    # ...
    self.imgui_renderer.render()

  def update_gui(self):
    imgui.begin("Window", None)
    imgui.text("Example Text")
    if imgui.button("Hello"):
        print("World")
    imgui.end()

  def run(self):
    self.canvas.request_draw(self.loop)
    self.imgui_renderer.set_gui(self.update_gui)
    loop.run()
```

## Exercices

[Exercices](../lab4_exo/)
