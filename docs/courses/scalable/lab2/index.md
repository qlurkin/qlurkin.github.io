---
title: Lab 2
subtitle: Containers
type: deck
---

## What are containers?

- They **bundle**:
  - An application
  - Its dependencies
  - A runtime environment to run it

- **They are not VMs**!
  - VMs emulate hardware [You must install a whole OS on it]{.small}
  - Containers provide an **isolated** environment on top of the host OS [The
    kernel of the host is shared with the containers]{.small}

## Why use containers?

- Consistency: same environment everywhere
- Portability: run on any machine
- Isolation: no conflicts between apps
- Lightweight: faster than VMs

## Container runtime

- There is **multiple** container runtime:
  - Docker
  - Podman

## Docker basics

- **Image** = blueprint (frozen recipe)
- **Container** = running instance of an image
- **Dockerfile** = script to build an image

## Dockerfile example

```dockerfile
FROM python:3.13-slim
WORKDIR /app
COPY . .
RUN pip install -r requirements.txt
CMD ["python", "app.py"]
```

- Here `python:3.13-slim` is a Image
- This Dockerfile create an Image based on another Image
- Docker's images can be multiple of these layers deep

## Image repositories

- The **official** Docker's repository of Images is <https://hub.docker.com/>
- The `python:3.13-slim` image is mentionned on

  <https://hub.docker.com/_/python>

- You can push your **own Images** on DockerHub
- It's possible to use **other repositories**

## Build and Run

- Build an **Image**:

  ```terminal
  docker build -t my-app .
  ```

  _In the folder that contains your **Dockerfile**_

- Run a **container**:

  ```terminal
  docker run -p 8080:8080 my-app
  ```

## Docker Networking

- `-p 8080:8080` ??
- By default, each container runs in its **own isolated network namespace**
- Containers can communicate:
  - With each other (if on the **same network**)
  - With the outside world (through **NAT**)

## Default bridge network

- When you run `docker run my-app`:
  - Container gets a private IP (e.g. `172.17.x.x`)
  - Not directly accessible from your host

## Exposing ports

- To access a container from your host:
  - You must **publish a port**
  - Done with `-p <host_port>:<container_port>`

  Example:

  ```terminal
  docker run -p 8080:8080 my-app
  ```

## The `EXPOSE` instruction

- Defines which port(s) the container **expects to listen on**

  ```dockerfile
  FROM python:3.13-slim
  WORKDIR /app
  COPY . .
  RUN pip install -r requirements.txt
  EXPOSE 8080
  CMD ["python", "app.py"]
  ```

- What `EXPOSE` does **not do**:
  - Does not publish the port to the host
  - Does not make the app accessible from outside

  Only `-p host:container` does that!

- **Why** use `EXPOSE` then?
  - Documentation for developers
  - Tools like **docker-compose** or **Kubernetes** can use it
  - Makes your **Dockerfile** self-explanatory

## Docker networking modes

Docker offers multiple network **modes** for containers.

- **Bridge** (default)
  - Each container gets a private IP
  - Use `-p host:container` to expose to the host
  - Good for most applications

- **Host**

  ```terminal
  docker run --network host my-app
  ```

  - Shares the host network directly
  - Container listens on host’s IP and ports
  - Better performance, but no isolation [Only available on Linux]{.small}

## Docker networking modes (2)

- **None**
  - No network at all

- **User-defined bridge**

  ```terminal
  docker network create mynet
  docker run -d --name app1 --network mynet nginx
  docker run -d --name app2 --network mynet alpine ping app1
  ```

  - Containers can discover each other by name
  - Common with **docker-compose**

- **Overlay**
  - Used in **Docker Swarm** or **Kubernetes**

## User-defined bridge

```terminal
docker network create mynet
docker run -d --name app1 --network mynet nginx
docker run -d --name app2 --network mynet alpine ping app1
```

- **Creation** of the bridge with `docker network create`
- Start a container with that **bridge** with `--network`
- Assign a specific **name** to the container with `--name` [User-defined bridge
  has DNS resolution (default bridge has not)]{.small}
- Start a container in **detach mode** with `-d` [Process of the container in
  the background]{.small}
- Run a specific **command** on the container [Here the container `app2` is
  started from the `alpine` image and the `ping app1` command is launched on
  it]{.small}

## Distributed Systems

- A service = **multiple** connected containers [Example: Frontend and
  Database]{.small}
- This is a **distributed** architecture
- Even if all the containers runs on the same physical server [with Kubernetes,
  **It doesn't matter** if the containers are on the same server or not]{.small}

## Hands-on: Nginx

- Start a container that provides a service on one of its ports
- Exposing that port directly to the Internet is **not recommended**
- Add an **Nginx** container to expose the service in a more professional way

## Hands-on: Simple PaaS

- Goal: the app **updates itself** when a new version is pushed to `git`
- The app is configured to **reload** when files change (e.g. with `nodemon`)
- A second container **shares the filesystem** with the main app and runs
  `git pull` periodically (e.g. via a cron job)
