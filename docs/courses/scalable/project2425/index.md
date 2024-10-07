---
title: 'Project 2024'
subtitle: 'Brussels Traffic Monitoring'
---

![ ](./Designer.jpeg)

## Introduction

For the purposes of mobility and sustainable development, a research project focused on analyzing **traffic in Brussels** will be initiated. To collect data, Brussels' **ANPR camera network** will be enhanced, and the data produced will be **centralized** for analysis. These cameras are capable of recognizing license plates as well as various characteristics of vehicles.

As part of this analysis, a number of **metrics** will need to be computed based on the data. These metrics will have to be computed **as the data arrives**, allowing for easy analysis of their evolution.

## Microservices

In the ever-evolving landscape of software development and modern application design, **microservice architecture** has emerged as a transformative paradigm, revolutionizing the way we build and maintain **complex systems**. As organizations strive for **agility**, **scalability**, and the ability to **adapt** swiftly to changing market dynamics, microservices have become a fundamental approach for achieving these objectives.

At its core, microservice architecture is a design pattern that structures an application as a **collection** of **small**, loosely coupled, and **independently** deployable services. Unlike traditional monolithic applications, where all functionalities are tightly integrated into a single codebase, microservices break down complex systems into a network of smaller, **self-contained components**, each responsible for a specific business capability.

This architectural approach brings numerous benefits, including enhanced **flexibility, scalability, and maintainability**. Each microservice operates as a standalone entity, often with its own database and APIs, enabling development teams to work independently on different services. This decoupling of services fosters parallel development, enabling **faster** release cycles and the ability to respond rapidly to **changing requirements** or customer feedback.

The advantages of microservices extend beyond development. Operations teams benefit from **simpler deployment** and monitoring, as each service can be **updated or scaled independently** without affecting the entire application. Fault isolation and recovery are also improved, as issues in one service are less likely to cascade throughout the entire system.

## Architecture

Here are the services that will make up the system :

- **Map**:

  - Store the graph of the map.
  - Compute the shortest path between points.
  - API for map updates (roadworks, one-way street, road closure, new road, etc.).
  - Cache relevant results to avoid redundant computations.

- **ANPR**:

  - Store events from ANPR cameras.
  - Ping cameras for health checks.
  - API to add or remove cameras.
  - Ensure that only registered cameras can send data to your service.

- **Metrics**:

  - Add or remove metrics to compute over time.
  - Compute the metrics.
  - Store the computed data.
  - Ensure security when executing client code.

## Your Work

You will work in groups of two.

You'll be part of a **development team** responsible for one of these microservices.

You will:

- meet with other teams to identify data flows and design **API specifications**,
- develop your service with a suitable frontend,
- ensure quality through **unit testing**,
- store the **data** for which you are responsible,
- account for the unavailability of other services,
- produce all the necessary documentation.

You will also act as the **administrator of a Kubernetes Cluster** _(your Minikube installation)_ that will run the entire system. In this role, you will:

- pull all services to **deploy** them on your cluster,
- ensure that services can **communicate** with each other within the cluster,
- expose all frontends and external APIs through a **proxy** like Traefik, nginx, or Apache,
- **monitor** load and **scale** services individually,
- perform **updates** to services individually without service interruption.

## Evaluation

The evaluation will occur in several stages:

- 3 **progress presentations** and a final presentation:

  - 1st presentation _(October 8 PM, 13% of the points)_:
    - Have a trivial service usable by cluster administrators (1/2).
    - Deploy all services on your cluster and make them accessible via the proxy (1/2).
  - 2nd presentation _(November 5 PM, 13% of the points)_:
    - Your API specification is done (1/3).
    - The documentation of your API is published on your git repository (1/3).
    - All the routes of the API are requestable (even if it respond with dummy data) (1/3).
  - 3rd presentation _(November 26 PM, 13% of the points)_: details to be determined.
  - Final presentation _(December 10 PM, 36% of the points)_.

- A **Git repository** _(25% of the points)_ containing:
  - The code for your service.
  - The files necessary for deployment on Kubernetes.
  - Complete API documentation.
  - A report describing the methods used and issues encountered.
