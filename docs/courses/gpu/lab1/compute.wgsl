@group(0) @binding(0)
var<storage,read> data0: array<i32>;

@group(0) @binding(1)
var<storage,read_write> data1: array<i32>;

@compute
@workgroup_size(64)
fn main(@builtin(global_invocation_id) index: vec3<u32>) {
    let i: u32 = index.x;
    data1[i] = data0[i] * data0[i];
}
