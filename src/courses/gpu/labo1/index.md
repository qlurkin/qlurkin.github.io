---
title: Lab 1 - Beginning with Rust
---

## Installation

*Note: If you're on MacOS, make sure you've installed Xcode and its developer tools by typing `xcode-select --install`. Note: If you're on Linux, make sure you've installed gcc. Deb: `sudo apt install gcc`. Yum: `sudo yum -y install gcc`.*

Follow the instructions on [rustup.rs](https://rustup.rs). This will install `rustc` (the Rust compiler) and `cargo` (the build toolchain).

## Create a project

To create a project use `cargo`.

<pre class="terminal">
$> cargo new project_name
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
<b>$> cargo run</b>
   <b style='color: chartreuse'>Compiling</b> project-name v0.1.0 (./project-name)
    <b style='color: chartreuse'>Finished</b> dev [unoptimized + debuginfo] target(s) in 2.25s
     <b style='color: chartreuse'>Running</b> `target/debug/project-name`
Hello, world!
</pre>

## Development Environment

The use of an editor that support *Language Server Protocol* (LSP) is recommended. The best language server for Rust is `rust-analyzer`.

**Visual Studio Code** is a good choice and you can easily install `rust-analyzer` as a VSCode Extension.

## Documentation

The best source to learn about Rust is the **[Rust Book](https://doc.rust-lang.org/stable/book/)**. You can find more resource at [www.rust-lang.org/learn](https://www.rust-lang.org/learn)

## Exercices

To train ourselves to write Rust programs, we will follow the `rustlings` project which contains small exercices to practice various aspects of the language.

<p class='center'><a href='https://github.com/rust-lang/rustlings'>github.com/rust-lang/rustlings</a></p>

To start with `rustlings`, you clone the repository latest release, `cd` in the root folder and use `cargo` to install it.

<pre class='terminal'>
$> git clone -b 5.2.1 --depth 1 https://github.com/rust-lang/rustlings
$> cd rustlings
$> cargo install --force --path .
</pre>

This will install the `rustlings` command.

To make `rust-analyzer` fully functional in the exercices, you must create project files by running:

<pre class='terminal' id='term1'>
$> rustlings lsp
</pre>

Then you can start the exercices by running:

<pre class='terminal' id='term2'>
$> rustlings watch
</pre>

This will watch the exercices files and recompile it on each modification.

While `rustlings watch` is running, you can type the `hint` subcommand to get hint about the Rust way of solving it. I recommend to check the hint on each exercices even if you manage to solve it by yourself.
