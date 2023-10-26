---
title: "WebGPU in Rust"
subtitle: "Game Of Life"
---

## Introduction

**This lab is a Rust version of a Javascript Codelab available [here](https://codelabs.developers.google.com/your-first-webgpu-app). Most of the Rust specific parts are heavily inspired from [here](https://sotrh.github.io/learn-wgpu/).**

WebGPU is a new, modern API for accessing the capabilities of your GPU in web apps. But WebGPU is designed to be used beyond web apps. It is an excellent choice for authoring cross-platform GPU accelerated app.

In this lab, you build [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) using WebGPU. The Game of Life is what's known as a cellular automaton, in which a grid of cells change state over time based on some set of rules. In the Game of Life cells become active or inactive depending on how many of their neighboring cells are active, which leads to interesting patterns that fluctuate as you watch.

## Project Setup

We will begin by setup our Rust project:

<div class="terminal">
  > cargo new my_project_name
  > cd my_project_name
</div>

To create a WebGPU app in Rust, we will need two crates:

- `wgpu`: which is an Rust implmentation of the WebGPU standard,
- `winit`: which let you open application windows and deal with input events.
- `log` and `env_logger`: to get nice `wgpu` runtime error messages. 

So we add these crates in our dependencies (`Cargo.toml`):

```toml
[package]
name = "gpu_game_of_life"
version = "0.1.0"
edition = "2021"

# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html

[dependencies]
wgpu = "0.17"
winit = "0.28"
log = "0.4"
env_logger = "0.10"
```

## Create a Window

Here's a simple example of how to use `winit` to create a window:

```rust
use winit::{
    event::{Event, WindowEvent},
    event_loop::EventLoop,
    window::WindowBuilder,
};

pub fn start() {
  let event_loop = EventLoop::new();
  let window = WindowBuilder::new().build(&event_loop).unwrap();

  event_loop.run(move |event, _, control_flow| {
    // ControlFlow::Poll continuously runs the event loop, even if the OS hasn't
    // dispatched any events. This is ideal for games and similar applications.
    control_flow.set_poll();

    match event {
      Event::WindowEvent {
        ref event,
        window_id,
      } if window_id == window.id() => {
        match event {
          WindowEvent::CloseRequested => {
            println!("The close button was pressed; stopping");
            control_flow.set_exit();
          }
          _ => {}
        }
      },
      Event::MainEventsCleared => {
        // Application update code.

        // Queue a RedrawRequested event.
        window.request_redraw();
      },
      Event::RedrawRequested(_) => {
        // Redraw the application.
      },
      _ => ()
    }
  });
}

fn main() {
  env_logger::init();
  start();
}
```

The `event_loop` will run the closure `|event, _, control_flow| { ... }` for all events. In this example, we deal with three kind of events:

- `MainEventsCleared`: Emitted when all of the event loop’s input events have been processed. This event is useful if you want to do stuff that happens as the “main body” of your event loop.
- `RedrawRequested`: which happens each time a redraw is requested by the OS or by our code with `window.request_redraw()`,
- `WindowEvent`: which can be of different types. Here, we only look for `CloseRequested` which happens when we close the window.

It is very important to enable logging via `env_logger::init()`. When wgpu hits any error it panics with a generic message, while logging the real error via the log crate. This means if you don't include `env_logger::init()`, wgpu will fail silently, leaving you very confused! This has been done at the beginning of the `main()` function. 

## The `window` module

To keep our code organized, we'll divide it into several modules. We'll put our `start()` function in a new module called `window`. First we declare the module in the `main.rs` file:

```rust
mod window
```

Then we create a new a new file named `window.rs` and we put the `start()` function in it. To make our function accessible outside the module we must declare it as public.

```rust
use winit::{
    event::{Event, WindowEvent},
    event_loop::EventLoop,
    window::WindowBuilder,
};

pub fn start() {
  //...
}
```

To use the function in our `main.rs` we need to bring it into the scope with a `use` statement. So in the `main.rs` file we add:

```rust
use crate::window::start;
```

Now our `main.rs` look like this:

```rust
mod window;

use crate::window::start;

fn main() {
  env_logger::init();
  start();
}
```

## The surface

To use our GPU, we need tu create a `Device`, a `Queue`, a `Surface` and multiple other things. To keep all these handles, we'll create a `struct` named `Context` in the `window.rs` file.

```rust
use winit::window::Window;

pub struct Context {
  surface: wgpu::Surface,
  device: wgpu::Device,
  queue: wgpu::Queue,
  config: wgpu::SurfaceConfiguration,
  size: winit::dpi::PhysicalSize<u32>,
  // The window must be declared after the surface so
  // it gets dropped after it as the surface contains
  // unsafe references to the window's resources.
  window: Window,
}
```

To create a `Context`, let's create a `new` method for it:

```rust
impl Context {
  // Creating some of the wgpu types requires async code
  pub async fn new(window: Window) -> Self {
    let size = window.inner_size();

    // The instance is the context for all other wgpu objects.
    // Backends::all => Vulkan + Metal + DX12
    let instance = wgpu::Instance::new(wgpu::InstanceDescriptor {
      backends: wgpu::Backends::all(),
      dx12_shader_compiler: Default::default(),
    });
    
    // # Safety
    //
    // The surface needs to live as long as the window that created it.
    // State owns the window so this should be safe.
    let surface = unsafe { instance.create_surface(&window) }.unwrap();

    // The adapter is a handle to a physical graphics and/or compute device.
    let adapter = instance.request_adapter(
      &wgpu::RequestAdapterOptions {
        power_preference: wgpu::PowerPreference::default(),
        compatible_surface: Some(&surface),
        force_fallback_adapter: false,
      },
    ).await.unwrap();

    // The Device is an open connection to a graphics and/or compute device.
    // The Queue is a handle to a command queue on a device.
    let (device, queue) = adapter.request_device(
      &wgpu::DeviceDescriptor {
        features: wgpu::Features::empty(),
        limits: wgpu::Limits::default(),
        label: None,
      },
      None, // Trace path
    ).await.unwrap();

    let surface_caps = surface.get_capabilities(&adapter);
    // Shader code in this tutorial assumes an sRGB surface texture. Using a
    // different one will result all the colors coming out darker. If you want
    // to support non sRGB surfaces, you'll need to account for that when
    // drawing to the frame.
    let surface_format = surface_caps.formats.iter()
      .copied()
      .find(|f| f.is_srgb())            
      .unwrap_or(surface_caps.formats[0]);
    let config = wgpu::SurfaceConfiguration {
      usage: wgpu::TextureUsages::RENDER_ATTACHMENT,
      format: surface_format,
      width: size.width,
      height: size.height,
      present_mode: surface_caps.present_modes[0],
      alpha_mode: surface_caps.alpha_modes[0],
      view_formats: vec![],
    };
    surface.configure(&device, &config);

    Self {
      window,
      surface,
      device,
      queue,
      config,
      size,
    }
  }
}
```

Now we can create our `Context` in the `start()` function:

```rust
pub async fn start() {
  // Window setup...

  let mut context = Context::new(window).await;

  // Event loop...
}
```

At this point we get a borrowing error because `window` has moved into the `Context` and we can no longer use it in our event loop. We just need to use the `window` inside the `Context` instead in:

```rust
Event::MainEventsCleared => {
  context.window.request_redraw();
},
```

and in:

```rust
Event::WindowEvent {
    ref event,
    window_id,
} if window_id == context.window.id() => {
  // ...
}
```

The `start()` function must become `async` because it call the `Context::new()` that is `async`. To run `start()` in our `main()` function we need to use a crate that is able to await future. We will use `pollster` so let' add it to our `Cargo.toml`:

```toml
[dependencies]
# other deps...
pollster = "0.3"
```

We can now update the `main()` to use `pollster`:

```rust
fn main() {
  env_logger::init();
  pollster::block_on(start());
}
```

If we want to support resizing in our application, we're going to need to reconfigure the surface every time the window's size changes. That's the reason we stored the physical size and the config used to configure the surface. With all of these, we can add a resize method to our `Context`:

```rust
pub fn resize(&mut self, new_size: winit::dpi::PhysicalSize<u32>) {
  if new_size.width > 0 && new_size.height > 0 {
    self.size = new_size;
    self.config.width = new_size.width;
    self.config.height = new_size.height;
    self.surface.configure(&self.device, &self.config);
  }
}
```

And we can call it when we get a `Resized` event or a `ScaleFactorChanged` event in our event loop:

```rust
// ...
match event {
    Event::WindowEvent {
        ref event,
        window_id,
    } if window_id == context.window.id() => {
        match event {
            WindowEvent::CloseRequested => {
                println!("The close button was pressed; stopping");
                control_flow.set_exit();
            },
            WindowEvent::Resized(physical_size) => {
                println!("Scaling Window");
                context.resize(*physical_size);
            },
            WindowEvent::ScaleFactorChanged { new_inner_size, .. } => {
                println!("Scale Factor Changed");
                context.resize(**new_inner_size);
            },
            _ => {}
        }
    },
    // other events

```

## Our App

All the previous code is actually boilerplate not specific to our application. We will put the code of our app in a separate module named `app`. So we declare the module in `main.rs` and we add a `app.rs` file with:

```rust
pub struct App {

}

impl App {
  pub fn new(context: &mut Context) -> Self {
    Self {

    }
  }

  fn input(&mut self, event: &WindowEvent) -> bool {
    return false;  // means that the event must be handeld in the start() function
  }

  fn update(&mut self, context: &mut Context) {

  }

  fn render(&mut self, context: &mut Context) -> Result<(), wgpu::SurfaceError> {

  }
}
```

The `new()` method will act as a constructor. The `input()` method will get events to let us react to user's inputs. The `update()` method will comtain the simulation logic. And the `render()` method will eb in charge of rendering the frame.

We will create the `App` and call its methods in the `start()` function:

```rust
use crate::app::App;
// ...

pub async fn start() {
  // ...
  
  let mut context = Context::new(window).await;
  let mut app = App::new(&mut context);

  event_loop.run(move |event, _, control_flow| {
    control_flow.set_poll();

    match event {
      Event::WindowEvent {
        ref event,
        window_id,
      } if window_id == context.window.id() => {
        if !app.input(event) {
          match event {
            // ...
          }
        }
      },
      // ...
      Event::RedrawRequested(_) => {
        app.update(&mut context);
        match app.render(&mut context) {
          Ok(_) => {}
          // Reconfigure the surface if lost
          Err(wgpu::SurfaceError::Lost) => context.resize(context.size),
          // The system is out of memory, we should probably quit
          Err(wgpu::SurfaceError::OutOfMemory) => {
            eprintln!("Out Of Memory");
            control_flow.set_exit()
          }
          // All other errors (Outdated, Timeout) should be resolved by
          // the next frame
          Err(e) => eprintln!("{:?}", e),
        }
      }
      _ => (),
    }
  });
}
```

With this, all the methods of our `App` will be called at the right moment !

We have pass the `Context` to our `new()` method. It's because we will need multiple fieldof it. The problem is that none of these fields are public. So let's add some getters to our `Context` struct:

```rust
impl Context {
 // ...
 pub fn window(&self) -> &Window {
    &self.window
  }

  pub fn surface(&self) -> &wgpu::Surface {
    &self.surface
  }

  pub fn device(&self) -> &wgpu::Device {
    &self.device
  }

  pub fn queue(&self) -> &wgpu::Queue {
    &self.queue
  }

  pub fn config(&self) -> &wgpu::SurfaceConfiguration {
    &self.config
  }
}
```

## First render

To render something, we need to send commands with the command queue. These commands are grouped into **Render Pass**. The target of the render is a texture (an image) but we can't directly render to the texture. We must render to a View of the texture.

So we'll begin by getting the `Texture`, then we'll create a `TextureView` of that texture, then we'll create a `CommandEncoder` that let us create a `RenderPass` and finally we submit that render pass to the `Queue`:

```rust
pub fn render(&mut self, context: &mut Context) -> Result<(), wgpu::SurfaceError> {
  let output = context.surface().get_current_texture()?;

  let view = output
    .texture
    .create_view(&wgpu::TextureViewDescriptor::default());

  let mut encoder =
    context
      .device()
      .create_command_encoder(&wgpu::CommandEncoderDescriptor {
          label: Some("Render Encoder"),
      });

  {
    let mut render_pass = encoder.begin_render_pass(&wgpu::RenderPassDescriptor {
      label: Some("Render Pass"),
      color_attachments: &[Some(wgpu::RenderPassColorAttachment {
        view: &view,
        resolve_target: None,
        ops: wgpu::Operations {
          load: wgpu::LoadOp::Clear(wgpu::Color {
            r: 0.0,
            g: 0.0,
            b: 0.4,
            a: 1.0,
          }),
          store: true,
        },
      })],
      depth_stencil_attachment: None,
    });
  }

  // submit will accept anything that implements IntoIter
  context.queue().submit(std::iter::once(encoder.finish()));
  output.present();

  Ok(())
}
```

You also have to specify what you want the render pass to do with the texture when it starts and when it ends:

A `load` value of `Clear` indicates that you want the texture to be cleared when the render pass starts.
A `store` value of `true` indicates that once the render pass is finished you want the results of any drawing done during the render pass saved into the texture.
Once the render pass has begun we do... nothing! At least for now. The act of starting the render pass with `load: Clear()` is enough to clear the texture view and the canvas.

You've probably notice the extra block (`{}`) around `encoder.begin_render_pass()`. `begin_render_pass()` borrows `encoder` mutably. We can't call `encoder.finish()` until we release that mutable borrow. The block tells rust to drop any variables within it when the code leaves that scope thus releasing the mutable borrow on `encoder` and allowing us to `finish()` it. If you don't like the `{}`, you can also use `drop(render_pass)` to achieve the same effect.

Let's draw some triangles. Be warned now that it'll seem like a lot of work for such simple output, but that's because WebGPU is designed to render lots of geometry very efficiently. A side effect of this efficiency is that doing relatively simple things might feel unusually difficult, but that's the expectation if you're turning to an API like WebGPU—you want to do something a little more complex.

## Understand how GPUs draw

Before any more code changes, it's worth doing a very quick, simplified, high-level overview of how GPUs create the shapes you see on screen.

Unlike an API like Pygame that has lots of shapes and options ready for you to use, your GPU really only deals with a few different types of shapes (or primitives as they're referred to by WebGPU): points, lines, and triangles. For the purposes of this lab you'll only use triangles.

GPUs work almost exclusively with triangles because triangles have a lot of nice mathematical properties that make them easy to process in a predictable and efficient way. Almost everything you draw with the GPU needs to be split up into triangles before the GPU can draw it, and those triangles must be defined by their corner points.

These points, or vertices, are given in terms of X, Y, and (for 3D content) Z values that define a point on a cartesian coordinate system defined by WebGPU or similar APIs. The structure of the coordinate system is easiest to think about in terms of how it relates to the surface on your window. No matter how wide or tall your canvas is, the left edge is always at -1 on the X axis, and the right edge is always at +1 on the X axis. Similarly, the bottom edge is always -1 on the Y axis, and the top edge is +1 on the Y axis. That means that (0, 0) is always the center of the canvas, (-1, -1) is always the bottom-left corner, and (1, 1) is always the top-right corner. This is known as **Clip Space**.

<figure>
<img src="./clip_space.png" alt="">
</figure>

The vertices are rarely defined in this coordinate system initially, so GPUs rely on small programs called vertex shaders to perform whatever math is necessary to transform the vertices into clip space, as well as any other calculations needed to draw the vertices. For example, the shader may apply some animation or calculate the direction from the vertex to a light source. These shaders are written by you, the WebGPU developer, and they provide an amazing amount of control over how the GPU works.

From there, the GPU takes all the triangles made up by these transformed vertices and determines which pixels on the screen are needed to draw them. Then it runs another small program you write called a fragment shader that calculates what color each pixel should be. That calculation can be as simple as return green or as complex as calculating the angle of the surface relative to sunlight bouncing off of other nearby surfaces, filtered through fog, and modified by how metallic the surface is. It's entirely under your control, which can be both empowering and overwhelming.

<figure><img src="./Pipeline.svg" alt=""></figure>

The results of those pixel colors are then accumulated into a texture, which is then able to be shown on screen.

## Define vertices

As mentioned earlier, The Game of Life simulation is shown as a grid of cells. Your app needs a way to visualize the grid, distinguishing active cells from inactive cells. The approach used by this codelab will be to draw colored squares in the active cells and leave inactive cells empty.

This means that you'll need to provide the GPU with four different points, one for each of the four corners of the square. For example, a square drawn in the center of the canvas, pulled in from the edges a ways, has corner coordinates like this:

<figure><img src="./vertices.png" alt=""></figure>

In order to feed those coordinates to the GPU, you need to place the values in a Buffer. A buffer is a blob of data in the GPU memory. A buffer is guaranteed to be contiguous, meaning that all the data is stored sequentially in memory. Buffers are generally used to store simple things like structs or arrays, but they can store more complex stuff such as graph structures like trees (provided all the nodes are stored together and don't reference anything outside of the buffer). We are going to use buffers a lot, so let's get started with two of the most important ones: the vertex buffer, and the index buffer.

we are going to use buffers to store the vertex data we want to draw. Before we do that though we need to describe what a vertex looks like. We'll do this by creating a new struct in the `app.rs` file.

```rust
#[repr(C)]
#[derive(Copy, Clone, Debug, bytemuck::Pod, bytemuck::Zeroable)]
struct Vertex {
    position: [f32; 2],
}
```

for now our vertices will just have a 2D position. WebGPU Buffer are just arrays of bytes (`&[u8]`) so we will use the crate `bytemuck` to convert our array of `Vertex`. Let's add that dependency:

```toml
bytemuck = { version = "1.12", features = [ "derive" ] }
```

The two derives `Pod` and `Zeroable` make our `Vertex` struct castable by `bytemuck`.

Let's create the array of `Vertex` as a constant in the `app.rs` file:

```rust
const VERTICES: &[Vertex] = &[
    Vertex {
        position: [-0.8, -0.8],
    },
    Vertex {
        position: [0.8, -0.8],
    },
    Vertex {
        position: [0.8, 0.8],
    },
    Vertex {
        position: [-0.8, -0.8],
    },
    Vertex {
        position: [0.8, 0.8],
    },
    Vertex {
        position: [-0.8, 0.8],
    },
];
```

This array is stored in the CPU memory. These 6 vertices describe the two triangles needed to draw our square. We arrange the vertices in counter-clockwise order: top, bottom left, bottom right. We do it this way partially out of tradition, but mostly because we will specify in the configuration of the render pipeline that we want the front face of our triangle to be `wgpu::FrontFace::Ccw` so that we cull the back face. This means that any triangle that should be facing us should have its vertices in counter-clockwise order.

Let's add a field to our `App` struct to store our buffer:

```rust
pub struct App {
  vertex_buffer: wgpu::Buffer,
}
```

we will now create the buffer in the `new()` method:

```rust
// needed for create_buffer_init
use wgpu::util::DeviceExt;

// in the App impl
pub fn new(context: &mut Context) -> Self {
  let vertex_buffer =
    context
      .device()
      .create_buffer_init(&wgpu::util::BufferInitDescriptor {
        label: Some("Vertex Buffer"),
        contents: bytemuck::cast_slice(VERTICES),
        usage: wgpu::BufferUsages::VERTEX,
      });

  Self {
    vertex_buffer,
  }
```

## Define the vertex layout

Now you have a buffer with vertex data in it, but as far as the GPU is concerned it's just a blob of bytes. You need to supply a little bit more information if you're going to draw anything with it. You need to be able to tell WebGPU more about the structure of the vertex data.So we'll define the vertex data structure with a `VertexBufferLayout`:

```rust
// in new()
let vertex_buffer_layout = wgpu::VertexBufferLayout {
  array_stride: std::mem::size_of::<Vertex>() as wgpu::BufferAddress,
  step_mode: wgpu::VertexStepMode::Vertex,
  attributes: &[wgpu::VertexAttribute {
    offset: 0,
    shader_location: 0,
    format: wgpu::VertexFormat::Float32x2,
  }],
};
```

This can be a bit confusing at first glance, but it's relatively easy to break down.

The first thing you give is the `array_stride`. This is the number of bytes the GPU needs to skip forward in the buffer when it's looking for the next vertex. Each vertex of your square is made up of two 32-bit floating point numbers. As mentioned earlier, a 32-bit float is 4 bytes, so two floats is 8 bytes. Here we just use the size of a `Vertex` to get that value.

Next is the `attributes` field, which is an array. Attributes are the individual pieces of information encoded into each vertex. Your vertices only contain one attribute (the vertex position), but more advanced use cases frequently have vertices with multiple attributes in them like the color of a vertex or the direction the geometry surface is pointing. That's out of scope for this lab, though.

In your single attribute, you first define the format of the data. This comes from a list of `VertexFormat` types that describe each type of vertex data that the GPU can understand. Your vertices have two 32-bit floats each, so you use the format `float32x2`. If your vertex data is instead made up of four 16-bit unsigned integers each, for example, you'd use `uint16x4` instead. See the pattern?

Next, the offset describes how many bytes into the vertex this particular attribute starts. You really only have to worry about this if your buffer has more than one attribute in it, which won't come up during this lab.

Finally, you have the `shader_location`. This is an arbitrary number between 0 and 15 and must be unique for every attribute that you define. It links this attribute to a particular input in the vertex shader, which you will learn about in the next section.

Notice that though you define these values now, you're not actually passing them into the WebGPU API anywhere just yet. That's coming up, but it's easiest to think about these values at the point that you define your vertices, so you're setting them up now for use later.

## Start with shaders

Now you have the data you want to render, but you still need to tell the GPU exactly how to process it. A large part of that happens with shaders.

Shaders are small programs that you write and that execute on your GPU. Each shader operates on a different stage of the data: Vertex processing, Fragment processing, or general Compute. Because they're on the GPU, they are structured more rigidly than your average Rust. But that structure allows them to execute very fast and, crucially, in parallel!

Shaders in WebGPU are written in a shading language called WGSL (WebGPU Shading Language). WGSL is, syntactically, a bit like Rust, with features aimed at making common types of GPU work (like vector and matrix math) easier and faster. Teaching the entirety of the shading language is well beyond the scope of this lab, but hopefully you'll pick up some of the basics as you walk through some simple examples.

The shaders themselves get passed into WebGPU as strings.

```rust
//in new()
let shader = context
  .device()
  .create_shader_module(wgpu::ShaderModuleDescriptor {
    label: Some("Shader"),
    source: wgpu::ShaderSource::Wgsl(include_str!("shader.wgsl").into()),
  });
```

The `include_str!()` macro is executed during compilation and include the content of the `shader.wgsl` file as a string in the source of our program.

Here is the content of the `shader.wgsl` file:

```rust
@vertex
fn vertexMain(@location(0) pos: vec2<f32>) -> @builtin(position) vec4<f32> {
  return vec4(pos, 0.0, 1.0);
}

@fragment
fn fragmentMain() -> @location(0) vec4<f32> {
  return vec4(1.0, 0.0, 0.0, 1.0);
}
```

This file contains two functions, one for the Vertex Stage and one for the Fragment Stage.

## The Vertex Shader

Start with the vertex shader because that's where the GPU starts, too!

A vertex shader is defined as a function, and the GPU calls that function once for every vertex in your `vertex_buffer`. Since your `vertex_buffer` has six positions (vertices) in it, the function you define gets called six times. Each time it is called, a different position from the `vertex_buffer` is passed to the function as an argument, and it's the job of the vertex shader function to return a corresponding position in clip space.

It's important to understand that they won't necessarily get called in sequential order, either. Instead, GPUs excel at running shaders like these in parallel, potentially processing hundreds (or even thousands!) of vertices at the same time! This is a huge part of what's responsible for GPUs incredible speed, but it comes with limitations. In order to ensure extreme parallelization, vertex shaders cannot communicate with each other. Each shader invocation can only see data for a single vertex at a time, and is only able to output values for a single vertex.

In WGSL, a vertex shader function can be named whatever you want, but it must have the `@vertex` attribute in front of it in order to indicate which shader stage it represents.

A vertex shader must return at least the final position of the vertex being processed in clip space. This is always given as a 4-dimensional vector. Vectors are such a common thing to use in shaders that they're treated as first-class primitives in the language, with their own types like `vec4f` for a 4-dimensional vector. There are similar types for 2D vectors (`vec2f`) and 3D vectors (`vec3f`), as well! To indicate that the value being returned is the required position, it is marked with the @builtin(position) attribute.

As we want to make use of the data from the buffer that we created, we can declare an argument for the function with a @location() attribute and type that match what we described in the `vertex_buffer_layout`. We specified a `shader_location` of 0, so in our WGSL code, we mark the argument with `@location(0)`. We also defined the format as a `float32x2`, which is a 2D vector, so in WGSL our argument is a vec2f. We can name it whatever we like, but since these represent our vertex positions, a name like `pos` seems natural.

## The Fragment Shader

Next up is the fragment shader. Fragment shaders operate in a very similar way to vertex shaders, but rather than being invoked for every vertex, they're invoked for every pixel being drawn.

Fragment shaders are always called after vertex shaders. The GPU takes the output of the vertex shaders and triangulates it, creating triangles out of sets of three points. It then rasterizes each of those triangles by figuring out which pixels of the output color attachments are included in that triangle, and then calls the fragment shader once for each of those pixels. The fragment shader returns a color, typically calculated from values sent to it from the vertex shader and assets like textures, which the GPU writes to the color attachment.

Just like vertex shaders, fragment shaders are executed in a massively parallel fashion. They're a little more flexible than vertex shaders in terms of their inputs and outputs, but you can consider them to simply return one color for each pixel of each triangle.

A WGSL fragment shader function is denoted with the `@fragment` attribute and it also returns a `vec4f`. In this case, though, the vector represents a color, not a position. The return value needs to be given a `@location` attribute in order to indicate which `color_attachment` from the `begin_render_pass` call the returned color is written to. Since you only had one attachment, the location is 0.

And that's a complete fragment shader! It's not a terribly interesting one; it just sets every pixel of every triangle to red, but that's sufficient for now.

## Create a render pipeline

A shader module can't be used for rendering on its own. Instead, you have to use it as part of a `RenderPipeline`, created by calling `device.create_render_pipeline()`. The render pipeline controls how geometry is drawn, including things like which shaders are used, how to interpret data in vertex buffers, which kind of geometry should be rendered (lines, points, triangles...), and more!

The render pipeline is the most complex object in the entire API.

```rust
// in new()
let render_pipeline =
  context
    .device()
    .create_render_pipeline(&wgpu::RenderPipelineDescriptor {
      label: Some("Render Pipeline"),
      layout: None, //Some(&render_pipeline_layout),
      vertex: wgpu::VertexState {
        module: &shader,
        entry_point: "vertexMain",
        buffers: &[vertex_buffer_layout],
      },
      fragment: Some(wgpu::FragmentState {
        module: &shader,
        entry_point: "fragmentMain",
        targets: &[Some(wgpu::ColorTargetState {
          format: context.config().format,
          blend: Some(wgpu::BlendState::REPLACE),
          write_mask: wgpu::ColorWrites::ALL,
        })],
      }),
      primitive: wgpu::PrimitiveState {
        topology: wgpu::PrimitiveTopology::TriangleList,
        strip_index_format: None,
        front_face: wgpu::FrontFace::Ccw,
        cull_mode: Some(wgpu::Face::Back),
        // Setting this to anything other than Fill requires Features::NON_FILL_POLYGON_MODE
        polygon_mode: wgpu::PolygonMode::Fill,
        // Requires Features::DEPTH_CLIP_CONTROL
        unclipped_depth: false,
        // Requires Features::CONSERVATIVE_RASTERIZATION
        conservative: false,
      },
      depth_stencil: None,
      multisample: wgpu::MultisampleState {
        count: 1,
        mask: !0,
        alpha_to_coverage_enabled: false,
      },
      multiview: None,
    });
```

Every pipeline needs a `layout` that describes what types of inputs (other than vertex buffers) the pipeline needs, but we don't really have any. Fortunately, we can pass `None` for now, and the pipeline builds its own layout from the shaders.

Next, we have to provide details about the vertex stage. The module is the `ShaderModule` that contains your vertex shader, and the `entry_point` gives the name of the function in the shader code that is called for every vertex invocation. (We can have multiple @vertex and @fragment functions in a single shader module!) The buffers is an array of `VertexBufferLayout` objects that describe how our data is packed in the vertex buffers that we use this pipeline with. Luckily, we already defined this earlier in our `vertex_buffer_layout`! Here's where we pass it in.

Next, we have details about the fragment stage. This also includes a shader module and `entry_point`, like the vertex stage. The last bit is to define the targets that this pipeline is used with. This is an array of dictionaries giving details—such as the texture format—of the color attachments that the pipeline outputs to. These details need to match the textures given in the colorAttachments of any render passes that this pipeline is used with. Our render pass uses textures from the Surface, and uses the value we saved in the config of the Surface for its format, so we pass the same format here.

The `primitive` field describes how to interpret our vertices when converting them into triangles. Using `PrimitiveTopology::TriangleList` means that every three vertices will correspond to one triangle.

The `front_face` and `cull_mode` fields tell wgpu how to determine whether a given triangle is facing forward or not. `FrontFace::Ccw` means that a triangle is facing forward if the vertices are arranged in a counter-clockwise direction. Triangles that are not considered facing forward are culled (not included in the render) as specified by `CullMode::Back`.

The rest of the method is pretty simple:

- We're not using a depth/stencil buffer currently, so we leave `depth_stencil` as `None`.
- count determines how many samples the pipeline will use. Multisampling is a complex topic, so we won't get into it here.
- `mask` specifies which samples should be active. In this case, we are using all of them.
- `alpha_to_coverage_enabled` has to do with anti-aliasing. We're not covering anti-aliasing here, so we'll leave this as `false` now.
- `multiview` indicates how many array layers the render attachments can have. We won't be rendering to array textures so we can set this to `None`.

We will need this `render_pipeline` in our `render()` method so we have to add it as a field of our `App` struct. We will also need the number of vertices so we will add this as well:

```rust
pub struct App {
  vertex_buffer: wgpu::Buffer,
  render_pipeline: wgpu::RenderPipeline,
  num_vertices: u32,
}

impl App {
  pub fn new(context: &mut Context) -> Self {
    // ...

    let num_vertices = VERTICES.len() as u32;

    Self {
      vertex_buffer,
      render_pipeline,
      num_vertices,
    }
  }

  // ...
}
```

## Draw the square

And with that, you now have everything that you need in order to draw your square!

```rust
{
  let mut render_pass = encoder.begin_render_pass(
    // ...
  );

  // 3 new lines
  render_pass.set_pipeline(&self.render_pipeline);
  render_pass.set_vertex_buffer(0, self.vertex_buffer.slice(..));
  render_pass.draw(0..self.num_vertices, 0..1);
}
```
This supplies WebGPU with all the information necessary to draw your square. First, we use `set_pipeline()` to indicate which pipeline should be used to draw with. This includes the shaders that are used, the layout of the vertex data, and other relevant state data.

Next, we call `set_vertex_buffer()` with the buffer containing the vertices for your square. You call it with 0 because this buffer corresponds to the 0th element in the current pipeline's `vertex.buffers` definition.

And last, you make the `draw()` call, which seems strangely simple after all the setup that's come before. The only things you need to pass in is a range of vertices that it should render. The second parameter is a range of instance, we only draw one instance.

If we run the program now, we should see a big red rectangle.

<figure><img src="./red_rectangle.png" alt=""></figure>

First, take a moment to congratulate yourself! Getting the first bits of geometry on screen is often one of the hardest steps with most GPU APIs. Everything you do from here can be done in smaller steps, making it easier to verify your progress as you go.

## Define the grid

In order to render a grid, you need to know a very fundamental piece of information about it. How many cells does it contain, both in width and height? This is up to you as the developer, but to keep things a bit easier, treat the grid as a square (same width and height) and use a size that's a power of two. (That makes some of the math easier later.) You want to make it bigger eventually, but for the rest of this section, set your grid size to 4x4 because it makes it easier to demonstrate some of the math used in this section. Scale it up after!

```rust
// in app.rs
const GRID_SIZE: u32 = 4;
```

Next, you need to update how you render your square so that you can fit `GRID_SIZE` times `GRID_SIZE` of them on the canvas. That means the square needs to be a lot smaller, and there needs to be a lot of them.

Now, one way you could approach this is by making your vertex buffer significantly bigger and defining `GRID_SIZE` times `GRID_SIZE` worth of squares inside it at the right size and position. The code for that wouldn't be too bad, in fact! Just a couple of for loops and a bit of math. But that's also not making the best use of the GPU and using more memory than necessary to achieve the effect. This section looks at a more GPU-friendly approach.

## Create a uniform buffer

First, you need to communicate the grid size you've chosen to the shader, since it uses that to change how things display. You could just hard-code the size into the shader, but then that means that any time you want to change the grid size you have to re-create the shader and render pipeline, which is expensive. A better way is to provide the grid size to the shader as uniforms.

You learned earlier that a different value from the vertex buffer is passed to every invocation of a vertex shader. A uniform is a value from a buffer that is the same for every invocation. They're useful for communicating values that are common for a piece of geometry (like its position), a full frame of animation (like the current time), or even the entire lifespan of the app (like a user preference).

```rust
// in App.new()
let uniform_array = [GRID_SIZE as f32, GRID_SIZE as f32];
let uniform_buffer =
  context
    .device()
    .create_buffer_init(&wgpu::util::BufferInitDescriptor {
      label: Some("Uniform Buffer"),
      contents: bytemuck::cast_slice(&uniform_array),
      usage: wgpu::BufferUsages::UNIFORM,
    });
```

## Access uniforms in a shader

```rust
// At the top of shader.wgsl
@group(0) @binding(0) var<uniform> grid: vec2f;

@vertex
fn vertexMain(@location(0) pos: vec2f) ->
  @builtin(position) vec4f {
  return vec4f(pos / grid, 0.0, 1.0);
}

// ...fragmentMain is unchanged
```

This defines a uniform in your shader called `grid`, which is a 2D float vector that matches the array that you just copied into the uniform buffer. It also specifies that the uniform is bound at `@group(0)` and `@binding(0)`. You'll learn what those values mean in a moment.

Then, elsewhere in the shader code, you can use the grid vector however you need. In this code you divide the vertex position by the grid vector. Since `pos` is a 2D vector and `grid` is a 2D vector, WGSL performs a component-wise division. In other words, the result is the same as saying `vec2f(pos.x / grid.x, pos.y / grid.y)`.

These types of vector operations are very common in GPU shaders since many rendering and compute techniques rely on them!

What this means in your case is that (if you used a grid size of 4) the square that you render would be one-fourth of its original size. That's perfect if you want to fit four of them to a row or column!

## Create a Bind Group

Declaring the uniform in the shader doesn't connect it with the buffer that you created, though. In order to do that, you need to create and set a bind group.

A bind group is a collection of resources that you want to make accessible to your shader at the same time. It can include several types of buffers, like your uniform buffer, and other resources like textures and samplers that are not covered here but are common parts of WebGPU rendering techniques.

```rust
// in App.new()
let bind_group = context
  .device()
  .create_bind_group(&wgpu::BindGroupDescriptor {
    label: Some("Bind Group"),
    layout: &render_pipeline.get_bind_group_layout(0),
    entries: &[wgpu::BindGroupEntry {
      binding: 0,
      resource: uniform_buffer.as_entire_binding(),
    }],
  });
```

In addition to your now-standard `label`, you also need a `layout` that describes which types of resources this bind group contains. This is something that you dig into further in a future step, but for the moment you can happily ask your pipeline for the bind group layout because you created the pipeline with `layout: None`. That causes the pipeline to create bind group layouts automatically from the bindings that you declared in the shader code itself. In this case, you ask it to `get_bind_group_layout(0)`, where the `0` corresponds to the `@group(0)` that you typed in the shader.

After specifying the layout, you provide an array of `entries`. Each entry is a dictionary with at least the following values:

- `binding`, which corresponds with the `@binding()` value you entered in the shader. In this case, `0`.

- `resource`, which is the actual resource that you want to expose to the variable at the specified binding index. In this case, your uniform buffer.

The function returns a `BindGroup`, which is an opaque, immutable handle. You can't change the resources that a bind group points to after it's been created, though you can change the contents of those resources. For example, if you change the uniform buffer to contain a new grid size, that is reflected by future draw calls using this bind group.

## Bind the bind group

Now that the bind group is created, you still need to tell WebGPU to use it when drawing. To do that you need to access it in the `render()` method. So you must add it to our `App` struct.

```rust
pub struct App {
    vertex_buffer: wgpu::Buffer,
    render_pipeline: wgpu::RenderPipeline,
    num_vertices: u32,
    bind_group: wgpu::BindGroup,   // new
}

impl App {
  pub fn new(context: &mut Context) -> Self {
    // ...
    
    Self {
      vertex_buffer,
      render_pipeline,
      num_vertices,
      bind_group,       // new
    }
  }
  // ...
  pub fn render(&mut self, context: &mut Context) -> Result<(), wgpu::SurfaceError> {
    // ...
    {
      // ...
      render_pass.set_pipeline(&self.render_pipeline);
      render_pass.set_vertex_buffer(0, self.vertex_buffer.slice(..));
      render_pass.set_bind_group(0, &self.bind_group, &[]);   // new
      render_pass.draw(0..self.num_vertices, 0..1);
    }
    // ...
  }
}
```

The `0` passed as the first argument corresponds to the` @group(0)` in the shader code. You're saying that each `@binding` that's part of `@group(0)` uses the resources in this bind group.

And now the uniform buffer is exposed to your shader!

<figure><img src="./small_red_rect.png" alt=""></figure>

Hooray! Your square is now one-fourth the size it was before! That's not much, but it shows that your uniform is actually applied and that the shader can now access the size of your grid.

## Manipulate geometry in the shader

So now that you can reference the grid size in the shader, you can start doing some work to manipulate the geometry you're rendering to fit your desired grid pattern. To do that, consider exactly what you want to achieve.

You need to conceptually divide up your canvas into individual cells. In order to keep the convention that the X axis increases as you move right and the Y axis increases as you move up, say that the first cell is in the bottom left corner of the canvas. That gives you a layout that looks like this, with your current square geometry in the middle:

<figure><img src="./grid.png" alt=""></figure>

Your challenge is to find a method in the shader that lets you position the square geometry in any of those cells given the cell coordinates.

First, you can see that your square isn't nicely aligned with any of the cells because it was defined to surround the center of the canvas. You'd want to have the square shifted by half a cell so that it would line up nicely inside them.

One way you could fix this is to update the square's vertex buffer. By shifting the vertices so that the bottom-right corner is at, for example, (0.1, 0.1) instead of (-0.8, -0.8), you'd move this square to line up with the cell boundaries more nicely. But, since you have full control over how the vertices are processed in your shader, it's just as easy to simply nudge them into place using the shader code!

```rust
@group(0) @binding(0) var<uniform> grid: vec2f;

@vertex
fn vertexMain(@location(0) pos: vec2f) ->
  @builtin(position) vec4f {

  // Add 1 to the position before dividing by the grid size.
  let gridPos = (pos + 1.0) / grid;

  return vec4f(gridPos, 0.0, 1.0);
}
// ...
```

Since `pos` is a `vec2f` here, adding 1 does a component-wise addition. It's the same as saying `pos + vec2f(1, 1)`. The same works for subtraction, multiplication, and division!

This moves every vertex up and to the right by one (which, remember, is half of the clip space) before dividing it by the grid size. The result is a nicely grid-aligned square just off of the origin.

<figure><img src="./grid1.png" alt=""></figure>

Next, because your canvas's coordinate system places (0, 0) in the center and (-1, -1) in the lower left, and you want (0, 0) to be in the lower left, you need to translate your geometry's position by (-1, -1) after dividing by the grid size in order to move it into that corner.

```rust
@group(0) @binding(0) var<uniform> grid: vec2f;

@vertex
fn vertexMain(@location(0) pos: vec2f) ->
  @builtin(position) vec4f {

  // Subtract 1 after dividing by the grid size.
  let gridPos = (pos + 1.0) / grid - 1.0;

  return vec4f(gridPos, 0.0, 1.0); 
}
// ...
```

And now your square is nicely positioned in cell (0, 0)!

<figure><img src="./grid2.png" alt=""></figure>

What if you want to place it in a different cell? Figure that out by declaring a `cell` vector in your shader and populating it with a static value like `let cell = vec2f(1, 1)`.

And modify the shader to take `cell` into account:

```rust
@group(0) @binding(0) var<uniform> grid: vec2f;

@vertex
fn vertexMain(@location(0) pos: vec2<f32>) -> @builtin(position) vec4<f32> {
  let cell = vec2f(1.0, 1.0);
  let cellOffset = cell / grid * 2.0;
  let gridPos = (pos + 1.0) / grid - 1.0 + cellOffset;
  return vec4f(gridPos, 0.0, 1.0); 
}
```

And this gives you exactly what you want.

<figure><img src="./grid3.png" alt=""></figure>

Furthermore, you can now set cell to any value within the grid bounds, and then refresh to see the square render in the desired location.

## Draw instances

Now that you can place the square where you want it with a bit of math, the next step is to render one square in each cell of the grid.

One way you could approach it is to write cell coordinates to a uniform buffer, then call draw once for each square in the grid, updating the uniform every time. That would be very slow, however, since the GPU has to wait for the new coordinate to be written by JavaScript every time. One of the keys to getting good performance out of the GPU is to minimize the time it spends waiting on other parts of the system!

Instead, you can use a technique called instancing. Instancing is a way to tell the GPU to draw multiple copies of the same geometry with a single call to `draw`, which is much faster than calling `draw` once for every copy. Each copy of the geometry is referred to as an instance.

```rust
// update the draw call
render_pass.draw(0..self.num_vertices, 0..GRID_SIZE*GRID_SIZE);
```

This tells the system that you want it to draw the six (`0..self.num_vertices`) vertices of your square 16 (`0..GRID_SIZE * GRID_SIZE`) times. But if you refresh the page, you still see the following:

<figure><img src="./red_rect_1_1.png" alt=""></figure>

Why? Well, it's because you draw all 16 of those squares in the same spot. Your need to have some additional logic in the shader that repositions the geometry on a per-instance basis.

In the shader, in addition to the vertex attributes like `pos` that come from your vertex buffer, you can also access what are known as WGSL's built-in values. These are values that are calculated by WebGPU, and one such value is the `instance_index`. The `instance_index` is an unsigned 32-bit number from `0` to number of `instances - 1` that you can use as part of your shader logic. Its value is the same for every vertex processed that's part of the same instance. That means your vertex shader gets called six times with an `instance_index` of `0`, once for each position in your vertex buffer. Then six more times with an `instance_index` of `1`, then six more with `instance_index` of `2`, and so on.

To see this in action, you have to add the `instance_index` built-in to your shader inputs. Do this in the same way as the position, but instead of tagging it with a `@location` attribute, use `@builtin(instance_index)`, and then name the argument whatever you want. (You can call it `instance` to match the example code.) Then use it as part of the shader logic!

```rust
@group(0) @binding(0) var<uniform> grid: vec2f;

@vertex
fn vertexMain(
  @location(0) pos: vec2<f32>,
  @builtin(instance_index) instance: u32
) -> @builtin(position) vec4<f32> {
  let i = f32(instance);
  let cell = vec2f(i % grid.x, floor(i / grid.x));
  let cellOffset = cell / grid * 2.0;
  let gridPos = (pos + 1.0) / grid - 1.0 + cellOffset;
  return vec4f(gridPos, 0.0, 1.0); 
}
// ...
```

After making that update to the code you have the long-awaited grid of squares at last!

<figure><img src="./red_squares.png" alt=""></figure>

```rust
const GRID_SIZE: u32 = 32;
```

<figure><img src="./many_red_rect.png" alt=""></figure>

Tada! You can actually make this grid really, really big now and your average GPU handles it just fine. You'll stop seeing the individual squares long before you run into any GPU performance bottlenecks.

To make our window square we can add this at the beginning of our `App.new()`.

```rust
context
  .window()
  .set_inner_size(PhysicalSize::new(1200, 1200));
```

## Manage cell state

Next, you need to control which cells on the grid render, based on some state that's stored on the GPU. This is important for the final simulation!

All you need is an on-off signal for each cell, so any options that allow you to store a large array of nearly any value type works. You might think that this is another use case for uniform buffers! While you *could* make that work, it's more difficult because uniform buffers are limited in size, can't support dynamically sized arrays (you have to specify the array size in the shader), and can't be written to by compute shaders. That last item is the most problematic, since you want to do the Game of Life simulation on the GPU in a compute shader.

Fortunately, there's another buffer option that avoids all of those limitations.

## Create a storage buffer

Storage buffers are general-use buffers that can be read and written to in compute shaders, and read in vertex shaders. They can be very large, and they don't need a specific declared size in a shader, which makes them much more like general memory. That's what you use to store the cell state.

*If storage buffers are so much more flexible, why bother with uniform buffers at all? It actually depends on your GPU hardware! There's a good chance that uniform buffers are given special treatment by your GPU in order to allow them to update and be read faster than a storage buffer, so for smaller amounts of data that have the potential to update frequently (like model, view, and projection matrices in 3D applications), uniforms are typically the safer choice for better performance.*

To create a storage buffer for your cell state, use what—by now—is probably starting to be a familiar-looking snippet of buffer creation code:

```rust
let cell_state_array = [0u32; (GRID_SIZE * GRID_SIZE) as usize];
  let cell_state_storage =
    context
      .device()
      .create_buffer_init(&wgpu::util::BufferInitDescriptor {
        label: Some("Storage Buffer"),
        contents: bytemuck::cast_slice(&cell_state_array),
        usage: wgpu::BufferUsages::STORAGE,
      });
```

## Read the storage buffer in the shader

Next, update your shader to look at the contents of the storage buffer before you render the grid. This looks very similar to how uniforms were added previously.

```rust
@group(0) @binding(0) var<uniform> grid: vec2f;
@group(0) @binding(1) var<storage> cellState: array<u32>; // New!
```

First, you add the binding point, which tucks right underneath the grid uniform. You want to keep the same `@group` as the `grid` uniform, but the` @binding` number needs to be different. The `var` type is `storage`, in order to reflect the different type of buffer, and rather than a single vector, the type that you give for the cellState is an array of `u32` values, in order to match the `u32` in Rust.

Why 32 bit ints? Doesn't that seem wasteful if all you need are booleans? Well, yeah! It is! But also, the GPU only cleanly exposes data of a few types because it can work with them fast. You can't specify that you're exposing an array of bytes, for example, because it wouldn't work well with certain assumptions GPUs make about data alignment.

Now you could save space and use bitmasking tricks such as storing the active state for 32 different cells in each value of that array. There's actually a long history of developers finding clever ways to pack the data they need into GPU-approved types like that! But that would make the example code far more complex. And the truth is that for a use case as relatively simple as this one, you don't need to worry about the memory impact too much.

Next, in the body of your `@vertex` function, query the cell's state. Because the state is stored in a flat array in the storage buffer, you can use the `instance_index` in order to look up the value for the current cell!

How do you turn off a cell if the state says that it's inactive? Well, since the active and inactive states that you get from the array are 1 or 0, you can scale the geometry by the active state! Scaling it by 1 leaves the geometry alone, and scaling it by 0 makes the geometry collapse into a single point, which the GPU then discards.

```rust
@vertex
fn vertexMain(
  @location(0) pos: vec2<f32>,
  @builtin(instance_index) instance: u32
) -> @builtin(position) vec4<f32> {
  let i = f32(instance);
  let cell = vec2f(i % grid.x, floor(i / grid.x));
  let state = f32(cellState[instance]);
  let cellOffset = cell / grid * 2.0;
  let gridPos = (pos*state + 1.0) / grid - 1.0 + cellOffset;
  return vec4f(gridPos, 0.0, 1.0); 
}
```

## Add the storage buffer to the bind group

Before you can see the cell state take effect, add the storage buffer to a bind group. Because it's part of the same `@group` as the uniform buffer, add it to the same bind group in the JavaScript code, as well.

```rust
let bind_group = context
  .device()
  .create_bind_group(&wgpu::BindGroupDescriptor {
    label: Some("Bind Group"),
    layout: &render_pipeline.get_bind_group_layout(0),
    entries: &[
      wgpu::BindGroupEntry {
        binding: 0,
        resource: uniform_buffer.as_entire_binding(),
      },
      wgpu::BindGroupEntry {
        binding: 1,
        resource: cell_state_storage.as_entire_binding(),
      },
    ],
  });
```

Make sure that the binding of the new entry matches the `@binding()` of the corresponding value in the shader!

If you run it now, you will see no cell because we initialized all cell state to 0.

## Use the ping-pong buffer pattern

Most simulations like the one you're building typically use at least two copies of their state. On each step of the simulation, they read from one copy of the state and write to the other. Then, on the next step, flip it and read from the state they wrote to previously. This is commonly referred to as a ping pong pattern because the most up-to-date version of the state bounces back and forth between state copies each step.

Why is that necessary? Look at a simplified example: imagine that you're writing a very simple simulation in which you move any active blocks right by one cell each step. To keep things easy to understand, you define your data and simulation in JavaScript:

```javascript
// Example simulation. Don't copy into the project!
const state = [1, 0, 0, 0, 0, 0, 0, 0];

function simulate() {
  for (let i = 0; i < state.length-1; ++i) {
    if (state[i] == 1) {
      state[i] = 0;
      state[i+1] = 1;
    }
  }
}

simulate(); // Run the simulation for one step.
```

But if you run that code, the active cell moves all the way to the end of the array in one step! Why? Because you keep updating the state in-place, so you move the active cell right, and then you look at the next cell and... hey! It's active! Better move it to the right again. The fact that you change the data at the same time that you observe it corrupts the results.

By using the ping pong pattern, you ensure that you always perform the next step of the simulation using only the results of the last step.

```javascript
// Example simulation. Don't copy into the project!
const stateA = [1, 0, 0, 0, 0, 0, 0, 0];
const stateB = [0, 0, 0, 0, 0, 0, 0, 0];

function simulate(in, out) {
  out[0] = 0;
  for (let i = 1; i < in.length; ++i) {
     out[i] = in[i-1];
  }
}

// Run the simulation for two step.
simulate(stateA, stateB);
simulate(stateB, stateA);
```

Use this pattern in your own code by updating your storage buffer allocation in order to create two identical buffers. To help visualize the difference between the two buffers, fill them with different data:

```rust
let cell_state_array = [
  [0u32; (GRID_SIZE * GRID_SIZE) as usize],
  [1u32; (GRID_SIZE * GRID_SIZE) as usize],
];
let cell_state_storage = [
  context
    .device()
    .create_buffer_init(&wgpu::util::BufferInitDescriptor {
      label: Some("Storage Buffer Ping"),
      contents: bytemuck::cast_slice(&cell_state_array[0]),
      usage: wgpu::BufferUsages::STORAGE,
    }),
  context
    .device()
    .create_buffer_init(&wgpu::util::BufferInitDescriptor {
      label: Some("Storage Buffer Pong"),
      contents: bytemuck::cast_slice(&cell_state_array[1]),
      usage: wgpu::BufferUsages::STORAGE,
    }),
];
```

To show the different storage buffers in your rendering, update your bind groups to have two different variants, as well:

```rust
let bind_group = [
  context
    .device()
    .create_bind_group(&wgpu::BindGroupDescriptor {
        label: Some("Bind Group Ping"),
        layout: &render_pipeline.get_bind_group_layout(0),
        entries: &[
          wgpu::BindGroupEntry {
            binding: 0,
            resource: uniform_buffer.as_entire_binding(),
          },
          wgpu::BindGroupEntry {
            binding: 1,
            resource: cell_state_storage[0].as_entire_binding(),
          },
        ],
    }),
  context
    .device()
    .create_bind_group(&wgpu::BindGroupDescriptor {
      label: Some("Bind Group Pong"),
      layout: &render_pipeline.get_bind_group_layout(0),
      entries: &[
        wgpu::BindGroupEntry {
          binding: 0,
          resource: uniform_buffer.as_entire_binding(),
        },
        wgpu::BindGroupEntry {
          binding: 1,
          resource: cell_state_storage[1].as_entire_binding(),
        },
      ],
    }),
];
```

You also need to update the definition of the struct:

```rust
pub struct App {
  vertex_buffer: wgpu::Buffer,
  render_pipeline: wgpu::RenderPipeline,
  num_vertices: u32,
  bind_group: [wgpu::BindGroup; 2],
}
```

## Set up a timer

We must now make our app change bind group every half second for example:

```rust
use std::time::{Duration, Instant};
// ...

pub struct App {
  vertex_buffer: wgpu::Buffer,
  render_pipeline: wgpu::RenderPipeline,
  num_vertices: u32,
  bind_group: [wgpu::BindGroup; 2],
  step: u32,
  generation_duration: Duration,
  last_generation: Instant,
}

impl App {
  pub fn new(context: &mut Context) -> Self {
    // ...
    Self {
        vertex_buffer,
        render_pipeline,
        num_vertices,
        bind_group,
        step: 0,
        generation_duration: Duration::new(0, 500_000_000),
        last_generation: Instant::now(),
    }
  }

  // ...

  pub fn update(&mut self, context: &mut Context) {
    if self.last_generation + self.generation_duration < Instant::now() {
      self.step += 1;
      self.last_generation = Instant::now();
    }
  }

  pub fn render(&mut self, context: &mut Context) -> Result<(), wgpu::SurfaceError> {
    // ...
    render_pass.set_bind_group(0, &self.bind_group[(self.step % 2) as usize], &[]);
    // ...
  }
}
```

And now when you run the app you see that the canvas flips back and forth between showing the two state buffers you created.

With that, you're pretty much done with the rendering side of things! You're all set to display the output of the Game of Life simulation you build in the next step, where you finally start using compute shaders.

Obviously there is so much more to WebGPU's rendering capabilities than the tiny slice that you explored here, but the rest is beyond the scope of this lab. Hopefully, it gives you enough of a taste of how WebGPU's rendering works, though, that it helps make exploring more advanced techniques like 3D rendering easier to grasp.

## Use compute shaders, at last!

Now, for the last major piece of the puzzle: performing the Game of Life simulation in a compute shader!

You've learned abstractly about compute shaders throughout this codelab, but what exactly are they?

A compute shader is similar to vertex and fragment shaders in that they are designed to run with extreme parallelism on the GPU, but unlike the other two shader stages, they don't have a specific set of inputs and outputs. You are reading and writing data exclusively from sources you choose, like storage buffers. This means that instead of executing once for each vertex, instance, or pixel, you have to tell it how many invocations of the shader function you want. Then, when you run the shader, you are told which invocation is being processed, and you can decide what data you are going to access and which operations you are going to perform from there.

Compute shaders must be created in a shader module, just like vertex and fragment shaders, so add that to your code to get started. As you might guess, given the structure of the other shaders that you've implemented, the main function for your compute shader needs to be marked with the `@compute` attribute.

```rust
let compute_shader = context
  .device()
  .create_shader_module(wgpu::ShaderModuleDescriptor {
    label: Some("Compute Shader"),
    source: wgpu::ShaderSource::Wgsl(include_str!("compute.wgsl").into()),
  });
```

with `compute.wgsl` containing:

```rust
@compute
fn computeMain() {

}
```

Because GPUs are used frequently for 3D graphics, compute shaders are structured such that you can request that the shader be invoked a specific number of times along an X, Y, and Z axis. This lets you very easily dispatch work that conforms to a 2D or 3D grid, which is great for your use case! You want to call this shader GRID_SIZE times GRID_SIZE times, once for each cell of your simulation.

Due to the nature of GPU hardware architecture, this grid is divided into workgroups. A workgroup has an X, Y, and Z size, and although the sizes can be 1 each, there are often performance benefits to making your workgroups a bit bigger. For your shader, choose a somewhat arbitrary workgroup size of 8 times 8. This is useful to keep track of in your Rust code.

```rust
const WORKGROUP_SIZE: u32 = 8;
```

You also need to add the workgroup size to the shader function itself, which you do using the `string.replace()` method so that you can easily use the constant you just defined:

```rust
// compute.wgsl
@compute
@workgroup_size(WORKGROUP_SIZE, WORKGROUP_SIZE)
fn computeMain() {

}
```

```rust
let compute_shader = context
  .device()
  .create_shader_module(wgpu::ShaderModuleDescriptor {
    label: Some("Compute Shader"),
    source: wgpu::ShaderSource::Wgsl(
      include_str!("compute.wgsl")
        .replace("WORKGROUP_SIZE", format!("{}", WORKGROUP_SIZE))
        .into()
    ),
  });
```

As with the other shader stages, there's a variety of @builtin values that you can accept as input into your compute shader function in order to tell you which invocation you're on and decide what work you need to do.

```rust
// compute.wgsl
@compute
@workgroup_size(WORKGROUP_SIZE, WORKGROUP_SIZE)
fn computeMain(@builtin(global_invocation_id) cell: vec3u) {

}
```

You pass in the `global_invocation_id` builtin, which is a three-dimensional vector of unsigned integers that tells you where in the grid of shader invocations you are. You run this shader once for each cell in your grid. You get numbers like `(0, 0, 0)`, `(1, 0, 0)`, `(1, 1, 0)`... all the way to `(31, 31, 0)`, which means that you can treat it as the cell index you're going to operate on!

Compute shaders can also use uniforms, which you use just like in the vertex and fragment shaders.

```rust
// compute.wgsl
@group(0) @binding(0) var<uniform> grid: vec2f;

@compute
@workgroup_size(WORKGROUP_SIZE, WORKGROUP_SIZE)
fn computeMain(@builtin(global_invocation_id) cell: vec3u) {

}
```

Just like in the vertex shader, you also expose the cell state as a storage buffer. But in this case, you need two of them! Because compute shaders don't have a required output, like a vertex position or fragment color, writing values to a storage buffer or texture is the only way to get results out of a compute shader. Use the ping-pong method that you learned earlier; you have one storage buffer that feeds in the current state of the grid and one that you write out the new state of the grid to.

```rust
// compute.wgsl
@group(0) @binding(0) var<uniform> grid: vec2f;

@group(0) @binding(1) var<storage> cellStateIn: array<u32>;
@group(0) @binding(2) var<storage, read_write> cellStateOut: array<u32>;

@compute
@workgroup_size(WORKGROUP_SIZE, WORKGROUP_SIZE)
fn computeMain(@builtin(global_invocation_id) cell: vec3u) {

}
```

Note that the first storage buffer is declared with `var<storage>`, which makes it read-only, but the second storage buffer is declared with `var<storage, read_write>`. This allows you to both read and write to the buffer, using that buffer as the output for your compute shader. (There is no write-only storage mode in WebGPU).

Next, you need to have a way to map your cell index into the linear storage array. This is basically the opposite of what you did in the vertex shader, where you took the linear `instance_index` and mapped it to a 2D grid cell. (As a reminder, your algorithm for that was `vec2f(i % grid.x, floor(i / grid.x))`.)

```rust
// compute.wgsl
@group(0) @binding(0) var<uniform> grid: vec2f;

@group(0) @binding(1) var<storage> cellStateIn: array<u32>;
@group(0) @binding(2) var<storage, read_write> cellStateOut: array<u32>;

fn cellIndex(cell: vec2u) -> u32 {
  return cell.y * u32(grid.x) + cell.x;
}

@compute
@workgroup_size(WORKGROUP_SIZE, WORKGROUP_SIZE)
fn computeMain(@builtin(global_invocation_id) cell: vec3u) {

}
```

And, finally, to see that it's working, implement a really simple algorithm: if a cell is currently on, it turns off, and vice versa. It's not the Game of Life yet, but it's enough to show that the compute shader is working.

```rust
// compute.wgsl
@group(0) @binding(0) var<uniform> grid: vec2f;

@group(0) @binding(1) var<storage> cellStateIn: array<u32>;
@group(0) @binding(2) var<storage, read_write> cellStateOut: array<u32>;

fn cellIndex(cell: vec2u) -> u32 {
  return cell.y * u32(grid.x) + cell.x;
}

@compute
@workgroup_size(WORKGROUP_SIZE, WORKGROUP_SIZE)
fn computeMain(@builtin(global_invocation_id) cell: vec3u) {
  if (cellStateIn[cellIndex(cell.xy)] == 1u) {
    cellStateOut[cellIndex(cell.xy)] = 0u;
  } else {
    cellStateOut[cellIndex(cell.xy)] = 1u;
  }
}
```

The `cell.xy` syntax here is a shorthand known as swizzling. It's equivalent to saying `vec2(cell.x, cell.y)` and is an easy way to get the components you need out of a vector in a different configuration. Swizzling is very flexible! You can put the components of the vector (up to four of them) in any order and repeat them as needed to do things like `cell.zyx` or `cell.yyyy`.

And that's it for your compute shader, for now! But before you can see the results, there are a few more changes that you need to make.

## Use Bind Group and Pipeline Layouts

One thing that you might notice from the above shader is that it largely uses the same inputs (uniforms and storage buffers) as your render pipeline. So you might think that you can simply use the same bind groups and be done with it, right? The good news is that you can! It just takes a bit more manual setup to be able to do that.

Any time that you create a bind group, you need to provide a `BindGroupLayout.` Previously, you got that layout by calling `get_bind_group_layout()` on the render pipeline, which in turn created it automatically because you supplied `layout: None` when you created it. That approach works well when you only use a single pipeline, but if you have multiple pipelines that want to share resources, you need to create the layout explicitly, and then provide it to both the bind group and pipelines.

To help understand why, consider this: in your render pipelines you use a single uniform buffer and a single storage buffer, but in the compute shader you just wrote, you need a second storage buffer. Because the two shaders use the same `@binding` values for the uniform and first storage buffer, you can share those between pipelines, and the render pipeline ignores the second storage buffer, which it doesn't use. You want to create a layout that describes all of the resources that are present in the bind group, not just the ones used by a specific pipeline.

Create that layout before the `render_pipeline`, call device.createBindGroupLayout():

```rust
let bind_group_layout =
  context
    .device()
    .create_bind_group_layout(&wgpu::BindGroupLayoutDescriptor {
      label: Some("Bind Group Layout"),
      entries: &[
        wgpu::BindGroupLayoutEntry {
          binding: 0,
          visibility: wgpu::ShaderStages::VERTEX | wgpu::ShaderStages::COMPUTE,
          ty: wgpu::BindingType::Buffer {
            ty: wgpu::BufferBindingType::Uniform,
            has_dynamic_offset: false,
            min_binding_size: None,
          },
          count: None,
        },
        wgpu::BindGroupLayoutEntry {
          binding: 1,
          visibility: wgpu::ShaderStages::VERTEX | wgpu::ShaderStages::COMPUTE,
          ty: wgpu::BindingType::Buffer {
            ty: wgpu::BufferBindingType::Storage { read_only: true },
            has_dynamic_offset: false,
            min_binding_size: None,
          },
          count: None,
        },
        wgpu::BindGroupLayoutEntry {
          binding: 2,
          visibility: wgpu::ShaderStages::COMPUTE,
          ty: wgpu::BindingType::Buffer {
            ty: wgpu::BufferBindingType::Storage { read_only: false },
            has_dynamic_offset: false,
            min_binding_size: None,
          },
          count: None,
        },
      ],
    });
```

This is similar in structure to creating the bind group itself, in that you describe a list of entries. The difference is that you describe what type of resource the entry must be and how it's used rather than providing the resource itself.

In each entry, you give the `binding` number for the resource, which (as you learned when you created the bind group) matches the `@binding` value in the shaders. You also provide the `visibility`, which are `ShaderStage` flags that indicate which shader stages can use the resource. You want both the uniform and first storage buffer to be accessible in the vertex and compute shaders, but the second storage buffer only needs to be accessible in compute shaders.

Once the bindGroupLayout is created, you can pass it in when creating your bind groups rather than querying the bind group from the pipeline. Doing so means that you need to add a new storage buffer entry to each bind group in order to match the layout you just defined.

```rust
let bind_group = [
  context
    .device()
    .create_bind_group(&wgpu::BindGroupDescriptor {
      label: Some("Bind Group Ping"),
      layout: &bind_group_layout,
      entries: &[
        wgpu::BindGroupEntry {
          binding: 0,
          resource: uniform_buffer.as_entire_binding(),
        },
        wgpu::BindGroupEntry {
          binding: 1,
          resource: cell_state_storage[0].as_entire_binding(),
        },
        wgpu::BindGroupEntry {
          binding: 2,
          resource: cell_state_storage[1].as_entire_binding(),
        },
      ],
    }),
  context
    .device()
    .create_bind_group(&wgpu::BindGroupDescriptor {
      label: Some("Bind Group Pong"),
      layout: &bind_group_layout,
      entries: &[
        wgpu::BindGroupEntry {
          binding: 0,
          resource: uniform_buffer.as_entire_binding(),
        },
        wgpu::BindGroupEntry {
          binding: 1,
          resource: cell_state_storage[1].as_entire_binding(),
        },
        wgpu::BindGroupEntry {
          binding: 2,
          resource: cell_state_storage[0].as_entire_binding(),
        },
      ],
    }),
];
```

And now that the bind group has been updated to use this explicit bind group layout, you need to update the render pipeline to use the same thing.

```rust
let pipeline_layout =
  context
    .device()
    .create_pipeline_layout(&wgpu::PipelineLayoutDescriptor {
      label: Some("Render Pipeline Layout"),
      bind_group_layouts: &[&bind_group_layout],
      push_constant_ranges: &[],
    });
```

A pipeline layout is a list of bind group layouts (in this case, you have one) that one or more pipelines use. The order of the bind group layouts in the array needs to correspond with the `@group` attributes in the shaders. (This means that bindGroupLayout is associated with `@group(0)`.)

Once you have the pipeline layout, update the render pipeline to use it instead of `None`.

```rust
let render_pipeline =
  context
    .device()
    .create_render_pipeline(&wgpu::RenderPipelineDescriptor {
      label: Some("Render Pipeline"),
      layout: Some(&pipeline_layout),
      // ...
    })

```

## Create the compute pipeline

Just like you need a render pipeline to use your vertex and fragment shaders, you need a compute pipeline to use your compute shader. Fortunately, compute pipelines are far less complicated than render pipelines, as they don't have any state to set, only the shader and layout.

Create a compute pipeline with the following code:

```rust
let compute_pipeline =
  context
    .device()
    .create_compute_pipeline(&wgpu::ComputePipelineDescriptor {
      label: Some("Compute Pipeline"),
      layout: Some(&pipeline_layout),
      module: &compute_shader,
      entry_point: "computeMain",
    });
```

Notice that you pass in the new `pipeline_layout` instead of `None`, just like in the updated render pipeline, which ensures that both your render pipeline and your compute pipeline can use the same bind groups.

We must add this `compute_pipeline` to our `App` struct to use is in the `update()` method.

```rust
pub struct App {
    vertex_buffer: wgpu::Buffer,
    render_pipeline: wgpu::RenderPipeline,
    num_vertices: u32,
    bind_group: [wgpu::BindGroup; 2],
    compute_pipeline: wgpu::ComputePipeline,
    step: u32,
    generation_duration: Duration,
    last_generation: Instant,
}

impl App {
  pub fn new(context: &mut Context) -> Self {
    // ...

    Self {
      vertex_buffer,
      render_pipeline,
      num_vertices,
      bind_group,
      compute_pipeline,
      step: 0,
      generation_duration: Duration::new(0, 500_000_000),
      last_generation: Instant::now(),
    }
  }
}


```


## Compute passes

This brings you to the point of actually making use of the compute pipeline! Given that you do your rendering in a render pass, you can probably guess that you need to do compute work in a compute pass.

```rust
pub fn update(&mut self, context: &mut Context) {
  if self.last_generation + self.generation_duration < Instant::now() {
    let mut encoder =
      context
        .device()
        .create_command_encoder(&wgpu::CommandEncoderDescriptor {
          label: Some("Compute Encoder"),
        });

    {
      let mut compute_pass = encoder.begin_compute_pass(&wgpu::ComputePassDescriptor {
        label: Some("Compute Pass"),
      });
    }

    context.queue().submit(std::iter::once(encoder.finish()));

    self.step += 1;
    self.last_generation = Instant::now();
  }
}
```

Just like compute pipelines, compute passes are much simpler to kick off than their rendering counterparts because you don't need to worry about any attachments.

You want to do the compute pass before the render pass because it allows the render pass to immediately use the latest results from the compute pass. That's also the reason that you increment the `step` count between the passes, so that the output buffer of the compute pipeline becomes the input buffer for the render pipeline.

Next, set the pipeline and bind group inside the compute pass, using the same pattern for switching between bind groups as you do for the rendering pass.

```rust
pub fn update(&mut self, context: &mut Context) {
  if self.last_generation + self.generation_duration < Instant::now() {
    let mut encoder =
      context
        .device()
        .create_command_encoder(&wgpu::CommandEncoderDescriptor {
          label: Some("Compute Encoder"),
        });

    {
      let mut compute_pass = encoder.begin_compute_pass(&wgpu::ComputePassDescriptor {
        label: Some("Compute Pass"),
      });

      compute_pass.set_pipeline(&self.compute_pipeline);
      compute_pass.set_bind_group(0, &self.bind_group[(self.step % 2) as usize], &[])
    }

    context.queue().submit(std::iter::once(encoder.finish()));

    self.step += 1;
    self.last_generation = Instant::now();
  }
}
```

Finally, instead of drawing like in a render pass, you dispatch the work to the compute shader, telling it how many workgroups you want to execute on each axis.

```rust
pub fn update(&mut self, context: &mut Context) {
  if self.last_generation + self.generation_duration < Instant::now() {
    let mut encoder =
      context
        .device()
        .create_command_encoder(&wgpu::CommandEncoderDescriptor {
          label: Some("Compute Encoder"),
        });

    {
      let mut compute_pass = encoder.begin_compute_pass(&wgpu::ComputePassDescriptor {
        label: Some("Compute Pass"),
      });

      compute_pass.set_pipeline(&self.compute_pipeline);
      compute_pass.set_bind_group(0, &self.bind_group[(self.step % 2) as usize], &[])

      let workgroup_count = (GRID_SIZE as f32 / WORKGROUP_SIZE as f32).ceil() as u32;
      compute_pass.dispatch_workgroups(workgroup_count, workgroup_count, 1);
    }

    context.queue().submit(std::iter::once(encoder.finish()));

    self.step += 1;
    self.last_generation = Instant::now();
  }
}
```

Something very important to note here is that the number you pass into `dispatch_workgroups()` is not the number of invocations! Instead, it's the number of workgroups to execute, as defined by the` @workgroup_size` in your shader.

If you want the shader to execute 32x32 times in order to cover your entire grid, and your workgroup size is 8x8, you need to dispatch 4x4 workgroups (4 * 8 = 32). That's why you divide the grid size by the workgroup size and pass that value into `dispatch_workgroups()`.

Compute work can only be dispatched by workgroup, so if you have a workload that's not an even divisor of the workgroup size, you have two options. You can either change the workgroup size (which has to be done at shader module creation time, and has relatively high overhead), or you can round up the number of workgroups you dispatch, and then, in the shader, check to see if you're over the desired global_invocation_id and need to return early.

Now you can refresh the page again, and you should see that the grid inverts itself with each update. To do that we will initialize our both ping ping storage buffer with 0:

```rust
let cell_state_array = [
  [0u32; (GRID_SIZE * GRID_SIZE) as usize],
  [0u32; (GRID_SIZE * GRID_SIZE) as usize],
];
```

Like this if we see the cells blinking, it means that our compute shader works !

## Implement the algorithm for the Game of Life

efore you update the compute shader to implement the final algorithm, you want to go back to the code that's initializing the storage buffer content and update it to produce a random buffer on each page load. (Regular patterns don't make for very interesting Game of Life starting points.) You can randomize the values however you want, but there's an easy way to start that gives reasonable results.

To start each cell in a random state, update the cellStateArray initialization to the following code:

```rust
let mut cell_state_array = [
  [0u32; (GRID_SIZE * GRID_SIZE) as usize],
  [0u32; (GRID_SIZE * GRID_SIZE) as usize],
];

for i in 0..cell_state_array[0].len() {
  if rand::random() {
    cell_state_array[0][i] = 1u32;
  } else {
    cell_state_array[0][i] = 0u32;
  }
}
```

You must add `rand` to your dependencies:

```toml
[dependencies]
# other dependencies
rand = "0.8.5"
```

Now you can finally implement the logic for the Game of Life simulation. After everything it took to get here, the shader code may be disappointingly simple!

First, you need to know for any given cell how many of its neighbors are active. You don't care about which ones are active, only the count.

To make getting neighboring cell data easier, add a `cellActive` function that returns the `cellStateIn` value of the given coordinate.

```rust
// in compute.wgls
fn cellActive(x: u32, y: u32) -> u32 {
  return cellStateIn[cellIndex(vec2(x, y))];
}
```

The `cellActive` function returns one if the cell is active, so adding the return value of calling `cellActive` for all eight surrounding cells gives you how many neighboring cells are active.

Find the number of active neighbors, like this:

```rust
fn computeMain(@builtin(global_invocation_id) cell: vec3u) {
  // Determine how many active neighbors this cell has.
  let activeNeighbors = cellActive(cell.x + 1u, cell.y + 1u) +
                        cellActive(cell.x + 1u, cell.y) +
                        cellActive(cell.x + 1u, cell.y - 1u) +
                        cellActive(cell.x, cell.y - 1u) +
                        cellActive(cell.x - 1u, cell.y - 1u) +
                        cellActive(cell.x - 1u, cell.y) +
                        cellActive(cell.x - 1u, cell.y + 1u) +
                        cellActive(cell.x, cell.y + 1u);
```

This leads to a minor problem, though: what happens when the cell you're checking is off the edge of the board? According to your `cellIndex()` logic right now, it either overflows to the next or previous row, or runs off the edge of the buffer!

Unlike some languages, indexing outside the bounds of a buffer in WGSL isn't unsafe, but it is unpredictable. The language makes sure you still get some value from the buffer, so you can't accidentally end up reading data from another process or anything like that, but it's almost certain to not give you the results you want. And the behavior may be different, depending on the platform and browser you use, so you should never depend on out-of-bounds accesses.

For the Game of Life, a common and easy way to resolve this is to have cells on the edge of the grid treat cells on the opposite edge of the grid as their neighbors, creating a kind of wrap-around effect.

Support grid wrap-around with a minor change to the `cellIndex()` function.

```rust
fn cellIndex(cell: vec2u) -> u32 {
  return (cell.y % u32(grid.y)) * u32(grid.x) +
         (cell.x % u32(grid.x));
}
```

By using the % operator to wrap the cell X and Y when it extends past the grid size, you ensure that you never access outside the storage buffer bounds. With that, you can rest assured that the `activeNeighbors` count is predictable.

Then you apply one of four rules:

- Any cell with fewer than two neighbors becomes inactive.
- Any active cell with two or three neighbors stays active.
- Any inactive cell with exactly three neighbors becomes active.
- Any cell with more than three neighbors becomes inactive.

You can do this with a series of if statements, but WGSL also supports `switch` statements, which are a good fit for this logic.

```rust
let i = cellIndex(cell.xy);

// Conway's game of life rules:
switch activeNeighbors {
  case 2u: { // Active cells with 2 neighbors stay active.
    cellStateOut[i] = cellStateIn[i];
  }
  case 3u: { // Cells with 3 neighbors become or stay active.
    cellStateOut[i] = 1u;
  }
  default: { // Cells with < 2 or > 3 neighbors become inactive.
    cellStateOut[i] = 0u;
  }
}
```

And... that's it! You're done! Refresh your page and watch your newly built cellular automaton grow!


## Credits

- ["Your first WebGPU app" Codelab](https://codelabs.developers.google.com/your-first-webgpu-app)
- [Learn Wgpu](https://sotrh.github.io/learn-wgpu/)
- [WebGPU — All of the cores, none of the canvas](https://surma.dev/things/webgpu/)

<script>
    let show = true

    function init() {
        document.body.style.backgroundSize = "100%"
        document.body.style.imageRendering = "pixelated"
        const width = 40
        const height = 80
        const cellSize = 10
        const canvas = document.createElement("canvas")
        canvas.width = width*cellSize
        canvas.height = height*cellSize

        let context = undefined
        if (canvas.getContext) {
            context = canvas.getContext('2d')
        }

        return {
            canvas,
            width,
            height,
            context,
            cellSize
        }
    }

    function setPixel(x, y, state, ctx) {
        if(state)
        {
            ctx.context.fillStyle = "rgba(128, 128, 128, 0.15)"
            ctx.context.fillRect( x*ctx.cellSize, y*ctx.cellSize, ctx.cellSize, ctx.cellSize )
        }
    }

    function drawWorld(world, ctx) {
        ctx.canvas.width = ctx.canvas.width
        if(!show) return
        for(let x=0; x<ctx.width; x++) {
            for(let y=0; y<ctx.height; y++) {
                setPixel(x, y, world[x][y], ctx)
            }
        }
    }

    function countNeighbor(world, x, y, ctx) {
        function mod(n, d) {
            return ((n % d) + d) % d
        }

        function get(x, y) {
            return world[mod(x, ctx.width)][mod(y, ctx.height)]
        }

        let count = 0
        for(let X=x-1; X<=x+1; X++)
            for(let Y=y-1; Y<=y+1; Y++)
                if(X != x || Y != y)
                    if(get(X, Y))
                        count++
        return count
    }

    function createGrid(ctx) {
        grid = []
        for(let x=0; x<ctx.width; x++) {
            grid.push([])
            for(let y=0; y<ctx.height; y++) {
                grid[x].push(Math.random()>0.5 ? true : false)
            }
        }
        return grid
    }

    function next(cur, prev, ctx) {
        for(let x=0; x<ctx.width; x++) {
            for(let y=0; y<ctx.height; y++) {
                const neighbor = countNeighbor(prev, x, y, ctx)
                const alive = prev[x][y]
                if(alive) {
                    if(neighbor == 2 || neighbor == 3) cur[x][y] = true
                    else cur[x][y] = false
                }
                else {
                    if(neighbor == 3) cur[x][y] = true
                    else cur[x][y] = false
                }
            }
        }
        drawWorld(cur, ctx)
        document.body.style.backgroundImage = `url('${ctx.canvas.toDataURL()}')`;
        setTimeout(() => { next(prev, cur, ctx) }, 500)
    }

    function main() {
        const ctx = init()
        next(createGrid(ctx), createGrid(ctx), ctx)
        window.addEventListener('keypress', event => {
          if(event.key === 'h') {
            show = !show
          }
        })
    }

    main()
</script>
