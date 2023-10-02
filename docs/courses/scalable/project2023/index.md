---
title: "Project 2023"
subtitle: "ECAMazon"
---

## Introduction

In the ever-evolving landscape of e-commerce, the pursuit of excellence knows no bounds. It is with great enthusiasm and ambition that we embark on a monumental journey: **the creation of the world's largest online shop**. This project represents a visionary endeavor that seeks to redefine the way people shop, connect with products, and experience the digital marketplace.

In the dynamic and ever-evolving realm of e-commerce, the concept of **scalability** stands as a cornerstone of **success**. The ability of an IT infrastructure to scale efficiently and effectively is not merely a technical consideration but a strategic imperative for any online shop aiming to become the **largest in the world**. Scalability is the lifeline that ensures your platform can not only meet **current demands** but also grow and adapt to **future needs** seamlessly.

## Microservices

In the ever-evolving landscape of software development and modern application design, **the microservice architecture** has emerged as a transformative paradigm that has revolutionized the way we build and maintain **complex systems**. As organizations strive for **agility**, **scalability**, and the ability to **adapt** swiftly to changing market dynamics, microservices have become a fundamental approach for achieving these objectives.

At its core, microservice architecture is a design pattern that structures an application as a **collection** of **small**, loosely coupled, and **independently** deployable services. Unlike traditional monolithic applications, where all functionalities are tightly integrated into a single codebase, microservices break down complex systems into a network of smaller, **self-contained components**, each responsible for a specific business capability.

This architectural approach brings a multitude of benefits, including enhanced **flexibility, scalability, and maintainability**. Each microservice operates as a standalone entity, often with its own database and APIs, enabling development teams to work independently on different services. This decoupling of services fosters parallel development, enabling **faster** release cycles and the ability to respond rapidly to **changing requirements** or customer feedback.

The advantages of microservices extend beyond development. Operations teams benefit from **easier deployment** and monitoring, as each service can be **updated or scaled independently** without affecting the entire application. Fault isolation and recovery are also improved, as issues in one service are less likely to cascade throughout the entire system.

## Architecture

- **Stock**: manages warehousemen, stock quantities, storage depots and parcel creation.

- **Shop**: manages prices, promo codes (vouchers, gift cards, etc.), product classification (categories, recommendations, etc.).

- **Users**: manages user's personal informations, addresses and payment methods.

- **Payment**: in connection with banks, manages payments, refunds, validation of payment methods and user's credits.

- **Shipping**: manages sent and returned parcels and their complete traceability.

- **Dispatching**: manages delivery drivers, sorting centers, delivery vehicles, their geolocation and delivery rounds.

## Your Work

You'll be part of a development team taking charge of one of these microservices.

You will :

- meet with other teams to identify data flows and design **API specifications**,

- develop your service with a relevant frontend,

- ensure quality through **unit testing**,

- adopt a **continuous integration** solution,

- be able to **monitor** the load of your service in production,

- store the **data** for which you are responsible,

- Set up and document a procedure for **scaling** your service that can be automated.

The unavailability of other services must be taken into account.

## Infrastructure

**Your Kubernetes infrastructure will soon be available**

## Evaluation

All the services must be in production for testing for the last lab. CI, monitoring and Scaling will be tested.

You must produce a report that follow this structure: Introduction, Materials and methods, Results, Discussion.
