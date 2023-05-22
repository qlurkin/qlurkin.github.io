import load_file from "./load_file.js"
import interpolate from "./interpolate.js"

if (!navigator.gpu) {
    document.querySelector('.alert').innerHTML = "WebGPU not supported on this browser."
    throw new Error("WebGPU not supported on this browser.")
}

///////////////////////////////////////////////////////////////////////////////////////////
// Params
///////////////////////////////////////////////////////////////////////////////////////////
const GRID_SIZE = 384
const WORKGROUP_SIZE = 8
let step = 0

///////////////////////////////////////////////////////////////////////////////////////////
// Device Configuration
///////////////////////////////////////////////////////////////////////////////////////////
const canvas = document.querySelector("canvas")

const adapter = await navigator.gpu.requestAdapter()
if (!adapter) {
    throw new Error("No appropriate GPUAdapter found.")
}

const device = await adapter.requestDevice()
const context = canvas.getContext("webgpu")
const canvasFormat = navigator.gpu.getPreferredCanvasFormat()
context.configure({
    device: device,
    format: canvasFormat,
})

///////////////////////////////////////////////////////////////////////////////////////////
// Buffers
// This is where the data used by the pipeline will be
///////////////////////////////////////////////////////////////////////////////////////////
// Vertex Buffer
const vertices = new Float32Array([
//   X,  Y,
    -1, -1, 
     1, -1,
     1,  1,
    -1, -1,
     1,  1,
    -1,  1,
])
const vertexBuffer = device.createBuffer({
    label: "Cell vertices",
    size: vertices.byteLength,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
})
device.queue.writeBuffer(vertexBuffer, /*bufferOffset=*/0, vertices)

// Grid Size Uniform Buffer
const uniformArray = new Float32Array([GRID_SIZE, GRID_SIZE])
const uniformBuffer = device.createBuffer({
    label: "Grid Uniforms",
    size: uniformArray.byteLength,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
})
device.queue.writeBuffer(uniformBuffer, 0, uniformArray)

// Cells States Buffer (2 of them)
const cellStateArray = new Uint32Array(GRID_SIZE * GRID_SIZE)
const cellStateStorage = [
    device.createBuffer({
        label: "Cell State A",
        size: cellStateArray.byteLength,
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
    }),
    device.createBuffer({
        label: "Cell State B",
        size: cellStateArray.byteLength,
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
    })
]
for (let i = 0; i < cellStateArray.length; ++i) {
    cellStateArray[i] = Math.random() > 0.6 ? 1 : 0
}
device.queue.writeBuffer(cellStateStorage[0], 0, cellStateArray)

///////////////////////////////////////////////////////////////////////////////////////////
// Create the bind group layout and pipeline layout.
// We will use it for both graphics and compute pipelines.
///////////////////////////////////////////////////////////////////////////////////////////
// This describe the structure of the bind group used by the pipelines
const bindGroupLayout = device.createBindGroupLayout({
    label: "Cell Bind Group Layout",
    entries: [{
        binding: 0,
        visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT | GPUShaderStage.COMPUTE,
        buffer: {} // Grid uniform buffer
    }, {
        binding: 1,
        visibility: GPUShaderStage.VERTEX | GPUShaderStage.COMPUTE,
        buffer: { type: "read-only-storage" } // Cell state input buffer
    }, {
        binding: 2,
        visibility: GPUShaderStage.COMPUTE,
        buffer: { type: "storage" } // Cell state output buffer
    }]
})

// This describe the pipelines
const pipelineLayout = device.createPipelineLayout({
    label: "Cell Pipeline Layout",
    bindGroupLayouts: [bindGroupLayout],
})

///////////////////////////////////////////////////////////////////////////////////////////
// Graphics Pipeline
///////////////////////////////////////////////////////////////////////////////////////////
// this describe the structure of the vertex buffer
const vertexBufferLayout = {
    arrayStride: 8,
    attributes: [{
        format: "float32x2",
        offset: 0,
        shaderLocation: 0,
    }],
}

const cellShaderModule = device.createShaderModule({
    label: "Cell shader",
    code: await load_file('./graphics.wgsl')
})

const cellPipeline = device.createRenderPipeline({
    label: "Cell pipeline",
    layout: pipelineLayout,
    vertex: {
        module: cellShaderModule,
        entryPoint: "vertexMain",
        buffers: [vertexBufferLayout]
    },
    fragment: {
        module: cellShaderModule,
        entryPoint: "fragmentMain",
        targets: [{
            format: canvasFormat
        }]
    }
})

///////////////////////////////////////////////////////////////////////////////////////////
// Compute Pipeline
///////////////////////////////////////////////////////////////////////////////////////////
const simulationShaderModule = device.createShaderModule({
    label: "Game of Life simulation shader",
    code: interpolate(await load_file('./compute.wgsl'), {WORKGROUP_SIZE})
})

const simulationPipeline = device.createComputePipeline({
    label: "Simulation pipeline",
    layout: pipelineLayout,
    compute: {
        module: simulationShaderModule,
        entryPoint: "computeMain",
    }
})

///////////////////////////////////////////////////////////////////////////////////////////
// Bind Groups
// It contains handles to the buffers to use when executing the pipeline
// Whe need 2 of them because we alternate the cell state buffers (ping pong)
///////////////////////////////////////////////////////////////////////////////////////////
const bindGroups = [
    device.createBindGroup({
        label: "Cell renderer bind group A",
        layout: bindGroupLayout, // Updated Line
        entries: [{
            binding: 0,
            resource: { buffer: uniformBuffer }
        }, {
            binding: 1,
            resource: { buffer: cellStateStorage[0] }
        }, {
            binding: 2, // New Entry
            resource: { buffer: cellStateStorage[1] }
        }],
    }),
    device.createBindGroup({
        label: "Cell renderer bind group B",
        layout: bindGroupLayout, // Updated Line

        entries: [{
            binding: 0,
            resource: { buffer: uniformBuffer }
        }, {
            binding: 1,
            resource: { buffer: cellStateStorage[1] }
        }, {
            binding: 2,
            resource: { buffer: cellStateStorage[0] }
        }],
    }),
]

///////////////////////////////////////////////////////////////////////////////////////////
// Update Cells
///////////////////////////////////////////////////////////////////////////////////////////
function updateGrid() {
    const encoder = device.createCommandEncoder()
    const computePass = encoder.beginComputePass()

    // Start a compute pass
    computePass.setPipeline(simulationPipeline),
    computePass.setBindGroup(0, bindGroups[step % 2]);
    const workgroupCount = Math.ceil(GRID_SIZE / WORKGROUP_SIZE)
    computePass.dispatchWorkgroups(workgroupCount, workgroupCount)

    computePass.end()

    // Start a render pass
    const pass = encoder.beginRenderPass({
        colorAttachments: [{
            view: context.getCurrentTexture().createView(),
            loadOp: "clear",
            clearValue: { r: 0, g: 0, b: 0.4, a: 1.0 },
            storeOp: "store",
        }]
    })

    // Draw the grid.
    pass.setPipeline(cellPipeline)
    pass.setBindGroup(0, bindGroups[step % 2])
    pass.setVertexBuffer(0, vertexBuffer)
    pass.draw(vertices.length / 2, GRID_SIZE * GRID_SIZE)

    // End the render pass and submit the command buffer
    pass.end()
    device.queue.submit([encoder.finish()])
    step++
    requestAnimationFrame(updateGrid)
}

updateGrid()
