---
title: Lab 1
subtitle: Vertical Scalability
type: deck
---

## Distributed Systems

- 13 labs
- 1 project

## App/service load

- Multiple forms of app/service load:
  - Request per seconds
  - Amount of stored data
  - Computing time

## Scalability

- Two kind of scalability:
  - Vertical scalability: Upgrade the server hardware
  - Horizontal scalability: Use more servers

## Vertical scalability

- for which load:
  - Request per seconds:
    - Faster CPU
    - More cores
    - More RAM
  - Amount of data:
    - More storage
    - More RAM
  - Computing time:
    - Faster CPU
    - More cores
    - More RAM

## Vertical scalability

- Limits:
  - No better CPU exists
  - Amount of RAM in a single machine is limited
  - Amount of HDD/SSD in a single machine is limited
  - Diminishing returns:
    - Prices grows faster than performance benefits

## Application design

- Apps must be designed to take advantage of better hardware:
  - Faster CPU: automatic gain
  - More than 1 core: Multithreading, multiprocessing, single node cluster
  - More RAM: Indexing, Cache, Dynamic Programming

## Hands on : Multithreading

- [Generating Mandelbrot Set representation](./mandelbrot.html)

## Hands on : Dynamic Programming
