import numpy as np
import time


# Helper class to measure execution time
class Timer:
    def __init__(self, msg: str):
        self.msg = msg

    def __enter__(self):
        self.start = time.perf_counter()

    def __exit__(self, exc_type, exc_value, traceback):
        print(f"{self.msg}: {time.perf_counter() - self.start}")


# Input Data
n = 65535 * 64
print(n)
numpy_data = np.full(n, 3, dtype=np.int32)

with Timer("for in range loop"):
    res = []
    for x in numpy_data:
        res.append(x * x)

with Timer("numpy operation") as rep:
    res = numpy_data * numpy_data

from wgpu import gpu

adapter = gpu.request_adapter_sync(power_preference="high-performance")
device = adapter.request_device_sync()

from wgpu import BufferUsage

# input data
buffer0 = device.create_buffer_with_data(data=numpy_data, usage=BufferUsage.STORAGE)

# for the output
buffer1 = device.create_buffer(
    size=numpy_data.nbytes,
    usage=BufferUsage.STORAGE | BufferUsage.COPY_SRC,
)

from wgpu import ShaderStage, BufferBindingType

bind_group_layout = device.create_bind_group_layout(
    entries=[
        {
            "binding": 0,
            "visibility": ShaderStage.COMPUTE,
            "buffer": {"type": BufferBindingType.read_only_storage},
        },
        {
            "binding": 1,
            "visibility": ShaderStage.COMPUTE,
            "buffer": {"type": BufferBindingType.storage},
        },
    ]
)

# Load the source code to execute on the GPU
with open("compute.wgsl") as file:
    shader_source = file.read()

shader_module = device.create_shader_module(code=shader_source)

# A Pipeline may use multiple Bind Group
pipeline_layout = device.create_pipeline_layout(bind_group_layouts=[bind_group_layout])

pipeline = device.create_compute_pipeline(
    layout=pipeline_layout,
    compute={
        "module": shader_module,
        "entry_point": "main",
    },
)

bind_group = device.create_bind_group(
    layout=bind_group_layout,
    entries=[
        {
            "binding": 0,
            "resource": {
                "buffer": buffer0,
                "offset": 0,
                "size": buffer0.size,
            },
        },
        {
            "binding": 1,
            "resource": {
                "buffer": buffer1,
                "offset": 0,
                "size": buffer1.size,
            },
        },
    ],
)

from wgpu import GPUCommandEncoder, GPUComputePassEncoder

with Timer("Compute Pipeline"):
    command_encoder: GPUCommandEncoder = device.create_command_encoder()

    compute_pass: GPUComputePassEncoder = command_encoder.begin_compute_pass()

    compute_pass.set_pipeline(pipeline)
    compute_pass.set_bind_group(0, bind_group)
    compute_pass.dispatch_workgroups(n // 64, 1, 1)
    compute_pass.end()

    device.queue.submit([command_encoder.finish()])

out: memoryview = device.queue.read_buffer(buffer1)
print(type(out))
result = np.frombuffer(out.cast("i"), dtype=np.int32)
print(result)
