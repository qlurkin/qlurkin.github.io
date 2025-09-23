---
title: Lab 3
subtitle: Kubernetes
type: deck
---

## What is Kubernetes?

- An **orchestration** system for containers
- Automates:
  - Deployment
  - Scaling
  - Networking
  - Self-healing
- Runs on a **cluster** of machines (nodes)

## Why Kubernetes?

- Docker runs containers, but:
  - Hard to **manage** many containers
  - No built-in **scaling** or **failover**
  - Networking & service **discovery** are limited
- Kubernetes solves these challenges

## Kubernetes Architecture

- **Control Plane** (manages the cluster):
  - **API Server**: the front door, all `kubectl` and component communication
    goes through it
  - **Scheduler**: decides _where_ a Pod should run (which Node)
  - **Controller Manager**: watches desired state vs actual state, triggers
    actions (e.g. restart pods)
  - **etcd**: distributed key-value store, holds the cluster state and
    configuration

- **Worker Nodes** (run workloads):
  - **Kubelet**: agent on each node, ensures containers run as defined in Pods
  - **Kube-proxy**: handles networking, load balancing, and service discovery on
    nodes
  - **Container runtime**: actually runs the containers (e.g. containerd, CRI-O,
    Docker)

## Core Concept: Pod

- **Smallest** deployable unit in Kubernetes
- Usually runs one container
- Can include multiple **tightly coupled** containers
- Pods are **ephemeral** (can be restarted/rescheduled)

## Core Concept: Deployment

- Higher-level abstraction over Pods
- Manages **replicas** of Pods
- Supports rolling **updates** and rollback
- **Declarative**: "desired state"

## Core Concept: Service

- Stable network identity for Pods
  - Pods are **ephemeral** → their IPs change when recreated
  - Directly connecting to Pod IPs is unreliable
  - A **Service** provides:
    - A stable **ClusterIP** inside the cluster
    - A stable **DNS name** (e.g. `my-service.default.svc.cluster.local`)
  - Traffic is automatically routed to the healthy Pods behind the Service

- Provides service discovery & load balancing

## Service types

- **ClusterIP** provides:
  - a stable network identity
  - load balancing between Pod replicas
- **NodePort** provides:
  - everything ClusterIP provides
  - an open port on each Node of the cluster for external access
- **LoadBalancer** provides:
  - everything NodePort provides
  - a single external IP
  - load balancing between Nodes

## Ingress

- **LoadBalancer Service**
  - Exposes **one Service** to the Internet
  - Each LoadBalancer → one external IP (provided by cloud)
  - TCP/UDP traffic (Layer 4)

- **Ingress**
  - Separate Kubernetes resource (not a Service)
  - Routes HTTP/HTTPS traffic to **multiple Services** [One IP for multiple
    Services]{.small}
  - Requires an **Ingress Controller** (e.g., Nginx, Traefik)
  - Layer 7 routing (host/path-based)
  - TLS termination, redirections, advanced HTTP rules

## Namespaces

- **Logical partition** inside a Kubernetes cluster
- Used to **organize** and **isolate** resources (Pods, Services, ConfigMaps,
  Secrets, etc.)
- Default namespace is `default` if none is specified

## Why use namespaces?

- **Organization**: separate teams, projects, or environments (dev/staging/prod)
- **Isolation**: resources with the same name can exist in different namespaces
- **Resource management**: apply quotas and limits per namespace
- **Security**: restrict access with RBAC rules at the namespace level

## ConfigMaps & Secrets

- Both are Kubernetes objects used to **inject configuration** into Pods
- They **decouple** app configuration from container images

- **ConfigMaps**
  - Store **non-sensitive key/value pairs**
  - Typical use: environment variables, API endpoints, feature flags
  - Can be mounted as env variables or files in a volume

- **Secrets**
  - Store **sensitive data**: passwords, tokens, API keys
  - Encoded in base64 (not strong encryption)
  - Can also be mounted as env variables or files

## Volumes

- Kubernetes Pods are **ephemeral**: when a Pod dies, **its data is lost**
- **Volumes** provide a way to **persist** or **share** data

- Types of volumes
  - **emptyDir**: temporary storage shared between containers in the same Pod,
    deleted when the Pod is removed
  - **hostPath**: mounts a directory from the Node’s filesystem into the Pod
  - **PersistentVolume (PV) / PersistentVolumeClaim (PVC)**:
    - Abstract storage resources in the cluster
    - Can be backed by local disks, NFS, or cloud storage (AWS EBS, GCP PD,
      etc.)
    - Survive Pod restarts and rescheduling

## kubectl

- **Command-line tool** to interact with Kubernetes
- Examples:

  ```terminal
  kubectl get pods
  kubectl apply -f deployment.yaml
  kubectl describe svc my-service
  ```

## Example: First Pod

```yaml
# pod.yaml
apiVersion: v1
kind: Pod
metadata:
  name: myapp-pod
spec:
  containers:
    - name: myapp
      image: my_app:1.0
      imagePullPolicy: IfNotPresent
      ports:
        - containerPort: 8080
```

Run it:

```terminal
kubectl apply -f pod.yaml
kubectl get pods
```

## Example: Deployment

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
        - name: myapp
          image: nginx
          ports:
            - containerPort: 80
```

## Example: Service

```yaml
# service.yaml
apiVersion: v1
kind: Service
metadata:
  name: myapp-service
spec:
  selector:
    app: myapp
  ports:
    - port: 80
      targetPort: 80
  type: NodePort
```

Access it:

```terminal
kubectl get svc myapp-service
```
