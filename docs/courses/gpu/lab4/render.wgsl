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
