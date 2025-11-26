from rendercanvas.auto import RenderCanvas, loop
import wgpu
import numpy as np
from numpy.typing import ArrayLike, NDArray
import PIL.Image as Image


def look_at(eye: ArrayLike, target: ArrayLike, up: ArrayLike) -> NDArray:
    """
    Convert world coordinates to camera coordinates where the camera point in the direction of -z axis and up is the y axis.
    """
    eye = np.array(eye, dtype=np.float32)
    target = np.array(target, dtype=np.float32)
    up = np.array(up, dtype=np.float32)
    f = target - eye
    f = f / np.linalg.norm(f)
    s = np.cross(f, up)
    s = s / np.linalg.norm(s)
    u = np.cross(s, f)

    # fmt: off
    return np.array([[ s[0],  s[1],  s[2], -eye @ s],
                     [ u[0],  u[1],  u[2], -eye @ u],
                     [-f[0], -f[1], -f[2],  eye @ f],
                     [    0,     0,     0,        1]], dtype=np.float32)
    # fmt: on


def perspective(fovy_deg: float, aspect: float, near: float, far: float) -> NDArray:
    """
    Convert camera coordinates to wgpu clip coordinates where x and y goes from -1.0 to 1.0 and z goes from 0.0 to 1.0.
    """

    angle = fovy_deg * np.pi / 180

    yspan = near * np.tan(angle)
    xspan = yspan * aspect

    c0r0 = 2 * near / xspan
    c1r1 = 2 * near / yspan
    c2r2 = -(far + near) / (far - near) / 2 - 0.5
    c3r2 = -far * near / (far - near)

    # fmt: off
    return np.array([[c0r0,    0,    0,    0],
                     [   0, c1r1,    0,    0],
                     [   0,    0, c2r2, c3r2],
             [   0,    0,   -1,    0]], dtype=np.float32)
    # fmt: on


class App:
    def __init__(self):
        adapter = wgpu.gpu.request_adapter_sync(power_preference="high-performance")
        self.device = adapter.request_device_sync()

        self.size = (0, 0)

        self.canvas = RenderCanvas(
            size=(640, 480),
            title="WebGPU Example",
            update_mode="continuous",
            max_fps=60,
        )
        self.context = self.canvas.get_wgpu_context()

        render_texture_format = self.context.get_preferred_format(self.device.adapter)
        self.context.configure(device=self.device, format=render_texture_format)

        # fmt: off
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

        index_data = np.array(
            [
                0,  1,  2,  0,  2,  3,
                4,  5,  6,  4,  6,  7,
                8,  9, 10,  8, 10, 11,
                12, 13, 14, 12, 14, 15,
                16, 17, 18, 16, 18, 19,
                20, 21, 22, 20, 22, 23,
            ],
            dtype=np.uint32,
        )
        # fmt: on

        self.vertex_buffer = self.device.create_buffer_with_data(
            data=vertex_data, usage=wgpu.BufferUsage.VERTEX
        )

        self.index_buffer = self.device.create_buffer_with_data(
            data=index_data, usage=wgpu.BufferUsage.INDEX
        )

        bg_layout = self.device.create_bind_group_layout(
            entries=[
                {
                    "binding": 0,
                    "visibility": wgpu.ShaderStage.VERTEX | wgpu.ShaderStage.FRAGMENT,
                    "buffer": {"type": wgpu.BufferBindingType.uniform},
                },
                {
                    "binding": 1,
                    "visibility": wgpu.ShaderStage.FRAGMENT,
                    "texture": {},
                },
                {
                    "binding": 2,
                    "visibility": wgpu.ShaderStage.FRAGMENT,
                    "sampler": {},
                },
            ]
        )

        p_layout = self.device.create_pipeline_layout(bind_group_layouts=[bg_layout])

        self.render_params_buffer = self.device.create_buffer(
            size=4 * 4 + 2 * 4 * 4 * 4,
            usage=wgpu.BufferUsage.UNIFORM | wgpu.BufferUsage.COPY_DST,
        )

        img = Image.open("./texel_checker.png")
        texture_size = img.size + (1,)
        texture = self.device.create_texture(
            size=texture_size,
            format=wgpu.TextureFormat.rgba8unorm_srgb,
            usage=wgpu.TextureUsage.TEXTURE_BINDING | wgpu.TextureUsage.COPY_DST,
        )
        self.device.queue.write_texture(
            destination={
                "texture": texture,
            },
            data=np.asarray(img),
            data_layout={
                "bytes_per_row": img.size[0] * 4,
            },
            size=texture_size,
        )
        sampler = self.device.create_sampler()

        self.render_params_bind_group = self.device.create_bind_group(
            layout=bg_layout,
            entries=[
                {
                    "binding": 0,
                    "resource": {
                        "buffer": self.render_params_buffer,
                        "offset": 0,
                        "size": self.render_params_buffer.size,
                    },
                },
                {
                    "binding": 1,
                    "resource": texture.create_view(),
                },
                {
                    "binding": 2,
                    "resource": sampler,
                },
            ],
        )

        vertex_buffer_descriptor = {
            "array_stride": 8 * 4,
            "step_mode": wgpu.VertexStepMode.vertex,
            "attributes": [
                {
                    "format": wgpu.VertexFormat.float32x3,
                    "offset": 0,
                    "shader_location": 0,
                },
                {
                    "format": wgpu.VertexFormat.float32x3,
                    "offset": 3 * 4,
                    "shader_location": 1,
                },
                {
                    "format": wgpu.VertexFormat.float32x2,
                    "offset": 6 * 4,
                    "shader_location": 2,
                },
            ],
        }

        with open("./render.wgsl") as file:
            shader_module = self.device.create_shader_module(code=file.read())

        self.pipeline = self.device.create_render_pipeline(
            layout=p_layout,
            vertex={
                "module": shader_module,
                "entry_point": "vs_main",
                "buffers": [vertex_buffer_descriptor],
            },
            primitive={
                "topology": wgpu.PrimitiveTopology.triangle_list,
                "front_face": wgpu.FrontFace.ccw,
                "cull_mode": wgpu.CullMode.back,
            },
            depth_stencil={
                "format": wgpu.TextureFormat.depth32float,
                "depth_write_enabled": True,
                "depth_compare": wgpu.CompareFunction.less,
            },
            multisample=None,
            fragment={
                "module": shader_module,
                "entry_point": "fs_main",
                "targets": [
                    {
                        "format": render_texture_format,
                        "blend": {
                            "color": {},
                            "alpha": {},
                        },
                    },
                ],
            },
        )

    def loop(self):
        screen_texture: wgpu.GPUTexture = self.context.get_current_texture()  # type: ignore
        size = screen_texture.size
        if size[:2] != self.size:
            self.depth_texture = self.device.create_texture(
                size=size,
                format=wgpu.TextureFormat.depth32float,
                usage=wgpu.TextureUsage.RENDER_ATTACHMENT
                | wgpu.TextureUsage.TEXTURE_BINDING,
            )

        light_position = np.array([-10, 10, 10, 0], dtype=np.float32)
        view_matrix = look_at([3, 2, 4], [0, 0, 0], [0, 1, 0])
        proj_matrix = perspective(45, size[0] / size[1], 0.1, 100)

        render_params_data = light_position.tobytes()
        # Must send transpose version of matrices, because GPU expect matrices in column major order
        render_params_data += view_matrix.T.tobytes()
        render_params_data += proj_matrix.T.tobytes()

        self.device.queue.write_buffer(
            buffer=self.render_params_buffer, data=render_params_data, buffer_offset=0
        )

        command_encoder = self.device.create_command_encoder()

        render_pass = command_encoder.begin_render_pass(
            color_attachments=[
                {
                    "view": screen_texture.create_view(),
                    "resolve_target": None,
                    "clear_value": (0.9, 0.9, 0.9, 1.0),
                    "load_op": wgpu.LoadOp.clear,
                    "store_op": wgpu.StoreOp.store,
                }
            ],
            depth_stencil_attachment={
                "view": self.depth_texture.create_view(),
                "depth_clear_value": 1.0,
                "depth_load_op": wgpu.LoadOp.clear,
                "depth_store_op": wgpu.StoreOp.store,
            },
        )

        render_pass.set_pipeline(self.pipeline)
        render_pass.set_vertex_buffer(0, self.vertex_buffer)
        render_pass.set_index_buffer(self.index_buffer, wgpu.IndexFormat.uint32)
        render_pass.set_bind_group(0, self.render_params_bind_group)
        render_pass.draw_indexed(36)
        render_pass.end()

        self.device.queue.submit([command_encoder.finish()])

    def run(self):
        self.canvas.request_draw(self.loop)
        loop.run()


App().run()
