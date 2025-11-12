---
title: Lab 5 Hands-on
subtitle: Conway's Game of Life
---

## Introduction

Conway's Game of Life is a cellular automaton devised by the British
mathematician John Horton Conway in 1970. It's not a game in the traditional
sense — there are no players, no scores, and no direct decisions. Instead, it's
a mathematical simulation that demonstrates how simple local rules can produce
incredibly complex and lifelike behavior.

The "world" of the Game of Life is a two-dimensional grid of cells, each of
which can be in one of two states: alive or dead. The grid evolves in discrete
steps called generations, with every cell's state at the next step determined
entirely by its eight neighbors (the cells that touch it horizontally,
vertically, and diagonally).

The rules are simple:

1. Survival – A living cell with two or three living neighbors survives.

2. Death by isolation – A living cell with fewer than two neighbors dies.

3. Death by overcrowding – A living cell with more than three neighbors dies.

4. Birth – A dead cell with exactly three living neighbors becomes alive.

Despite these minimal rules, the system exhibits emergent complexity. Some
patterns remain static ("still lifes"), some oscillate periodically
("blinkers"), and others move across the grid ("gliders"). Entirely new and
intricate behaviors can appear from just a few starting cells.

Conway's Game of Life has become a classic example of how simple rules can
create complex systems. It has deep connections to mathematics, computer
science, and theoretical biology, and even demonstrates Turing completeness —
meaning it can, in principle, perform any computation given enough space and
time.

## Goal

You are required to develop a program that simulates and visualizes the
evolution of Conway’s Game of Life, starting from a randomly generated initial
configuration. The computation of each successive generation must be performed
using a Compute Pipeline.

The implementation may be carried out in the programming language of your
choice. Note that WebGPU can be conveniently used from Python, JavaScript, Rust,
and various other languages.

<script>
    let show = true

    // Grab the prefers reduced media query.
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Check if the media query matches or is not available.
    if (!mediaQuery || mediaQuery.matches) {
      show = false;
    } else {
      show = true;
    }

    // Ads an event listener to check for changes in the media query's value.
    mediaQuery.addEventListener("change", () => {
      if (mediaQuery.matches) {
        show = false;
      } else {
        show = true;
      }
    });

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
