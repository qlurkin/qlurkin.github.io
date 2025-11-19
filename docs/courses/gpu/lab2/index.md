---
title: Lab 2
subtitle: Parallel Computing
type: deck
---

## Workgroup Memory in WebGPU

- `var<workgroup>`
- A memory space **shared between all threads in the same workgroup**
- Much faster than global/storage buffers
- Comparable to:
  - CUDA: `__shared__`
  - OpenCL: `__local`
  - HLSL: `groupshared`

## Why Use Workgroup Memory?

### Benefits

- **Low latency** compared to global memory
- Allows threads to **collaborate efficiently**
- Prevents repeated reads from slow device memory

### Typical workflow

1. Threads load data into workgroup memory
2. Perform collaborative computation
3. Write results back to global memory

## Declaring Workgroup Memory (WGSL)

```wgsl
var<workgroup> sharedData : array<u32, 256>;
```

- Allocated once per workgroup
- Accessible to all threads in the group
- Lifetime = duration of the compute shader dispatch
- Programmer **must ensure synchronization** [All threads in a workgroup may not
  run simultaneously]{.small}

## Synchronization

- `workgroupBarrier()`
- Ensures all threads reach the same point
- Guarantees visibility of all shared memory writes
- Rules
  - **All threads** must execute the barrier
  - Cannot appear inside **divergent branches**

## Hardware Limits

- Workgroup memory is limited.

- Typical device limits:
  - 32 KB – 64 KB of shared memory per workgroup

- Can be queried (Python example):

```python
device.limits["max_compute_workgroup_storage_size"]
```

- If exceeded:
  - Shader compilation fails
  - The pipeline is not created

## Example: Parallel Sum

- Goal: compute the sum of a buffer
- Partition the buffer. Each part will be summed by a workgroup
- Each workgroup will load its part in its shared memory
- Each workgroup will compute its partial sum [With multiple threads]{.small}
- All partial sums will be saved in an output buffer

![Sum in a workgroup _([source Wikipedia](https://en.wikipedia.org/wiki/Reduction_operator#))_](./binomial_tree.gif){.third}

## Parallel Sum: Shader

```wgsl
@group(0) @binding(0) var<storage, read> input: array<u32>;
@group(0) @binding(1) var<storage, read_write> partial_sums: array<u32>;

var<workgroup> shared_data: array<u32, 64>;

@compute @workgroup_size(64)
fn main(@builtin(local_invocation_id) local_id: vec3<u32>,
        @builtin(global_invocation_id) global_id: vec3<u32>,
        @builtin(workgroup_id) group_id: vec3<u32>) {

    let idx = global_id.x;
    let local_index = local_id.x;

    // Load data into shared memory
    shared_data[local_index] = input[idx];
    workgroupBarrier();

    // Reduction loop
    // Each iteration, the number of active thread is divided by 2
    // This naïve version use only half the thread in the first iteration
    // because we allocate 64 threads to sum 64 values (32 of them do
    // nothing usefull). We could sum 128 values with 64 threads in an
    // optimized version.
    // This version is easier to understand
    var stride = 1u;
    while (stride < 64u) {
        let index = 2u * stride * local_index;
        if (index + stride < 64u) {
            shared_data[index] += shared_data[index + stride];
        }
        workgroupBarrier();
        stride = stride * 2u;
    }

    // Write result of this workgroup
    if (local_index == 0u) {
        partial_sums[group_id.x] = shared_data[0];
    }
}
```

## Partial Sum: Python Code

```python
import numpy as np
import wgpu

# Initialize WebGPU
adapter = wgpu.gpu.request_adapter_sync(
    canvas=None, power_preference="high-performance"
)
device = adapter.request_device_sync()
queue = device.queue

# Create input data
N = 1024  # Must be divisible by workgroup size (e.g., 64)
data = np.arange(1, N + 1, dtype=np.uint32)  # sum = 1024 * 1025 / 2 = 524800

# Create buffer for input data
input_buffer = device.create_buffer_with_data(
    data=data, usage=wgpu.BufferUsage.STORAGE
)

# Create buffer to store partial sums (one per workgroup)
num_groups = N // 64  # workgroup_size = 64
partial_sums_buffer = device.create_buffer(
    size=num_groups * 4,
    usage=wgpu.BufferUsage.STORAGE
    | wgpu.BufferUsage.COPY_SRC,
)

# Shader code: parallel reduction with workgroup shared memory
with open('shader.wgsl') as file:
    shader_code = file.read()

# Create the shader module
shader_module = device.create_shader_module(code=shader_code)

# Bind group layout and pipeline
bgl = device.create_bind_group_layout(
    entries=[
        {
            "binding": 0,
            "visibility": wgpu.ShaderStage.COMPUTE,
            "buffer": {"type": "read-only-storage"},
        },
        {
            "binding": 1,
            "visibility": wgpu.ShaderStage.COMPUTE,
            "buffer": {"type": "storage"},
        },
    ]
)
pipeline_layout = device.create_pipeline_layout(bind_group_layouts=[bgl])

pipeline = device.create_compute_pipeline(
    layout=pipeline_layout,
    compute={"module": shader_module, "entry_point": "main"},
)

# Create bind group
bind_group = device.create_bind_group(
    layout=bgl,
    entries=[
        {"binding": 0, "resource": {"buffer": input_buffer}},
        {"binding": 1, "resource": {"buffer": partial_sums_buffer}},
    ],
)

# Encode and submit commands
encoder = device.create_command_encoder()
pass_enc = encoder.begin_compute_pass()
pass_enc.set_pipeline(pipeline)
pass_enc.set_bind_group(0, bind_group)
pass_enc.dispatch_workgroups(num_groups)
pass_enc.end()
queue.submit([encoder.finish()])

out: memoryview = device.queue.read_buffer(partial_sums_buffer)# type: ignore
partial_sums = np.frombuffer(out.cast("I"), dtype=np.uint32)
total = np.sum(partial_sums) # final sum on CPU

print(f"Partial sums = {partial_sums}")
print(f"Total = {total}")
```

## Choosing the Workgroup Size

1. Hardware Limits
   - `max_compute_workgroup_size_x`
   - `max_compute_invocations_per_workgroup`
   - `max_compute_workgroup_storage_size`

2. Warp/Wavefront Alignment
   - GPUs execute threads in fixed-sized groups:
     - NVIDIA: 32 threads (warp)
     - AMD: 64 threads (wavefront)
   - To avoid wasted execution: Choose a size that is a **multiple of the
     warp/wavefront size**

3. Do not exceed shared memory limit

4. Occupancy and Performance
   - A very large workgroup:
     - May not use all compute units

   - A too small workgroup:
     - Each compute unit has not enough to do

5. Typical practical ranges:
   - 64 to 256 threads per workgroup

6. Adjust experimentally for best performance

## Exercise

Implement a compute shader that:

1. Computes the **maximum value** collaboratively
2. **Sort** a buffer collaboratively (bitonic sort)
