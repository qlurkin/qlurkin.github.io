---
title: Lab 1 & 2 - Beginning with Rust
---

## Installation

_Note: If you're on MacOS, make sure you've installed Xcode and its developer tools by typing `xcode-select --install`. Note: If you're on Linux, make sure you've installed gcc. Deb: `sudo apt install gcc`. Yum: `sudo yum -y install gcc`._

Follow the instructions on [rustup.rs](https://rustup.rs). This will install `rustc` (the Rust compiler) and `cargo` (the build toolchain). `cargo` is for Rust what `npm` is for Javascript.

## Create a project

To create a project use `cargo`.

<pre class="terminal">
> cargo new project_name
</pre>

This will create the following file tree.

```plaintext
📦 project-name
┣ 📂 src
┃ ┗ 📜 main.rs
┗ 📜 Cargo.toml
```

We can `cd` into the newly created project root folder.

Then you can add your code in `main.rs`.

```rust
fn main() {
    println!("Hello, world!");
}
```

You can then run it with:

<pre class="terminal">
<b>> cargo run</b>
   <b style='color: chartreuse'>Compiling</b> project-name v0.1.0 (./project-name)
    <b style='color: chartreuse'>Finished</b> dev [unoptimized + debuginfo] target(s) in 2.25s
     <b style='color: chartreuse'>Running</b> `target/debug/project-name`
Hello, world!
</pre>

## Development Environment

The use of an editor that support _Language Server Protocol_ (LSP) is recommended. The best language server for Rust is `rust-analyzer`.

**Visual Studio Code** is a good choice and you can easily install `rust-analyzer` as a VSCode Extension.

You can also use **RustRover** from JetBrains which is a new Rust IDE that is in free early access.

## Documentation

The best source to learn about Rust is the **[Rust Book](https://doc.rust-lang.org/stable/book/)**. You can find more resource at [www.rust-lang.org/learn](https://www.rust-lang.org/learn)

## Exercices

To train ourselves to write Rust programs, we will follow the `rustlings` project which contains small exercices to practice various aspects of the language.

<p class='center'><a href='https://github.com/rust-lang/rustlings'>github.com/rust-lang/rustlings</a></p>

To start with `rustlings`, you install the `rustlings` command with cargo.

```terminal
> cargo install rustlings
```

then you can initialize your working directory :

```terminal
> cd the_choosen_working_directory
> rustlings init
```

This has create a `rustlings` folder. To start with the exercices run the `rustlings` command in the `rustlings` directory

```terminal
> cd rustlings
> rustlings
```

This will watch the exercices files and recompile it on each modification.
