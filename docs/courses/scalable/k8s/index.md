---
title: "Lab 2"
subtitle: "Kubernetes"
typst: true
---

## Scalability

Nowadays, it is increasingly common for an application to handle a workload $W_l$ that varies over time. To manage more workload, more hardware capacity $H_c$ is required. However, it is incorrect to think that simply doubling the hardware capacity will allow you to handle twice the workload. This is referred to as the scalability factor $S_f$.

$$ W_l = S_f times H_c $$

If this factor is constant, it is referred to as linear scalability, but this is generally not the case.

There are two ways to increase hardware capacity:

1. **Vertical Scalability**
2. **Horizontal Scalability**

Vertical scalability involves increasing the capabilities of a single machine (CPU, RAM, disks). This form of scalability **has limits** since there comes a point where there is no better hardware available than what you already have. Additionally, high-performance hardware is often prohibitively **expensive**.

Horizontal scalability involves **distributing** the workload across multiple machines.

In both cases, the software must be designed to take advantage of the additional capacity available. This often involves **parallelizing tasks**. In vertical scalability, parallelization is used to exploit all the cores of the CPU. In horizontal scalability, parallelization is used to exploit all the machines simultaneously.

The challenges associated with parallelization are:

- Tasks must be **independent** of each other.
- Tasks must have access to the necessary **data**.

As its name suggests, this course focuses on distributing the workload. This implies distribution over a network across multiple machines, and therefore **horizontal scalability**. Since adding new servers must be as efficient as possible, it is also important that application deployment is as simple as possible. That is why Docker is often used in this context.

Moreover, managing containers running on a group of servers (a **cluster**) can be easily automated. Today, we will explore one of the most commonly used Docker cluster management tools, **Kubernetes**.

1. [Install Minikube](https://minikube.sigs.k8s.io/docs/start/)
2. [The basic aspects to get a minikube cluster up and running](https://kubernetes.io/docs/tutorials/hello-minikube/)
3. [Learn Kubernetes Basics](https://kubernetes.io/docs/tutorials/kubernetes-basics/)
