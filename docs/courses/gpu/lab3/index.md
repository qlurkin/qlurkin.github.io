---
title: "WebGPU in Rust"
subtitle: "Game Of Life"
---

## Introduction

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

  fn update(&mut self) {

  }

  fn render(&mut self) -> Result<(), wgpu::SurfaceError> {

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
        app.update();
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

## Credits

- ["Your first WebGPU app" Codelab](https://codelabs.developers.google.com/your-first-webgpu-app)
- [Learn Wgpu](https://sotrh.github.io/learn-wgpu/)
- [WebGPU — All of the cores, none of the canvas](https://surma.dev/things/webgpu/)

<script>
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
    }

    main()
</script>
