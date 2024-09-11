---
title: Lab 1
subtitle: Getting started with Docker
---

## Organisation

**Mandatory Attendance:** The project requires collaboration among students, which is only possible if you are present.

The activities **AC5L-L1: Distributed Systems Project 1** and **AD5L-L1: Distributed Systems Project 2** are dedicated to the same project. Therefore, you have a total of 14 lab sessions.

Labs 1 and 2 are dedicated to exploring Docker and Kubernetes tools. **The project statement will be provided in Lab 3**.

## The problem

When creating an application on your development computer, everything generally works well. It's when you send it to **someone else** or run it on the **production server** that problems start to arise. This is because these machines are configured differently (OS, applications, libraries, etc.).

## Container

The use of containers is a solution to this problem. A container is a **virtualization of an operating system**. It is a much lighter solution than a virtual machine, which virtualizes the hardware and requires installing a full operating system as well as the application's dependencies, and this for each application you want to run on the host machine.

There are three essential elements when using Docker:

- **Dockerfile**: It is a list of instructions used to build an image.
- **Image**: It is a snapshot of the state of your application and all its dependencies at a specific point in time. An image is immutable and can be used to create multiple containers.
- **Container**: It is an instance of the execution of the virtual operating system with your application and its dependencies.

### Example of Dockerfile:

```dockerfile
# Use the official Ubuntu image as the base image
FROM ubuntu:24.04

# Set the working directory in the container
WORKDIR /usr/src

# Install Python and pip
RUN apt-get update && \
    apt-get install -y python3 python3-pip.

# Expose the port 8000 for your app
EXPOSE 8000

# Command to run your app
CMD ["python3", "-m", "http.server", "8000"]
```

### Building an image:

```terminal
docker build -t myapp ./
```

The `-t` option allows you to specify the image name *(tag name)*, and the path at the end of the command indicates where to find the Dockerfile.

### Start a container:

```terminal
docker run myapp
```

This command will use the `myapp` image to create and start a container.

### Examine the containers that are currently running:

```terminal
docker ps
```

## Get used to Docker

[Introduction to Docker](https://docs.docker.com/get-started/introduction/)