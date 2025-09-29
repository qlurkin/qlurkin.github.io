---
title: Lab 4
subtitle: StateFullSet
type: deck
---

## Database Replication

- Requires **inter-replica communication** [to sync data and resolve
  conflicts]{.small}
- Requires a **stable per-Pod network identity**
- Replicas often depend on a specific **startup order**
- If restarted, a replica needs to access the **same persistent volume**

## StatefulSets

- Like a Deployment, but for **stateful applications**
- Ensures:
  - **Stable, unique Pod identities** across restarts
  - **Ordered** deployment, scaling, and updates
  - **Persistent storage** association with Pods
- Common use cases:
  - Databases (MySQL, PostgreSQL, MongoDB…)
  - Cluster-aware applications

## StatefulSets vs Deployments

- **Deployment**
  - For **stateless apps**
  - Pods are interchangeable
  - No stable network identity or storage binding

- **StatefulSet**
  - For **stateful apps**
  - Each Pod has a **unique name** (`pod-0`, `pod-1`, …)
  - Each Pod can keep its own **PersistentVolume**
  - Supports **ordered scaling** and **graceful updates**

## Pod Identity in StatefulSets

- Pods are not identical:
  - Named as `<statefulset-name>-<ordinal>`
  - Example: `db-0`, `db-1`, `db-2`
- Each Pod gets:
  - **Stable hostname** → `db-0.my-service`
  - **Stable storage** → always re-attached to the same Pod
- Allows clustering and replication in databases

## StatefulSet and Storage

- Works with **PersistentVolumeClaims (PVCs)**
- Each Pod gets a **dedicated PVC**
- Example:
  - `db-0` → `db-0-pvc`
  - `db-1` → `db-1-pvc`
- Even if Pod is rescheduled on a new Node, its PVC is reattached

## When to Use StatefulSets?

Use a StatefulSet when:

- You need **stable network IDs**
- You need **persistent storage per Pod**
- You require **ordered startup/shutdown**

Don’t use a StatefulSet when:

- Pods are truly **stateless**
- Any Pod can handle any request without identity

## StateFullSet Manifest

```yaml
# 1. Headless Service
apiVersion: v1
kind: Service
metadata:
  name: mysql
spec:
  clusterIP: None # Headless service -> DNS per Pod
  selector:
    app: mysql
  ports:
    - port: 3306
      name: mysql
---
# 2. StatefulSet
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: mysql
spec:
  serviceName: 'mysql' # Must match the headless service
  replicas: 3
  selector:
    matchLabels:
      app: mysql
  template:
    metadata:
      labels:
        app: mysql
    spec:
      containers:
        - name: mysql
          image: mysql:8.0
          ports:
            - containerPort: 3306
              name: mysql
          env:
            - name: MYSQL_ROOT_PASSWORD
              value: rootpass
          volumeMounts:
            - name: data
              mountPath: /var/lib/mysql
  volumeClaimTemplates:
    - metadata:
        name: data
      spec:
        accessModes: ['ReadWriteOnce']
        resources:
          requests:
            storage: 200Mi
```

- To give a stable DNS name to each pod of a StateFullSet

## Master / Replicas

- At this point, these are just **three individual database servers**.
- They must be configured to work together as a **cluster**. [Manually or via
  ConfigMaps]{.small}
- One replica acts as the **master**, accepting **write operations**.
- All replicas can handle **read operations**.
- Some databases support **master election**.

## Routing

- Multiple ways to route requests:
  1. **Two separate Services:**
     - One for the **master** → read and write
     - One for all the **replicas** → read only
  2. **ProxySQL:**
     - Runs in a **separate Pod**
     - Provides **automatic routing** of requests

## Operators

- **Kubernetes extensions**
- Manage **deployment, configuration, and routing**
- Can also manage **users, backups, and other operational tasks**

## Replication vs Sharding (1)

- Replication
  - **Purpose:** High availability & read scaling
  - **Data:** Every replica has a **full copy** of the database
  - **Writes:** Usually go to a **single master**
  - **Reads:** Can be distributed across replicas
  - **Pros:** Simple, fault-tolerant
  - **Cons:** Scaling write capacity is limited

## Replication vs Sharding (2)

- Sharing
  - **Purpose:** Scale database for **large data volumes and high write
    throughput**
  - **Data:** Split across multiple **shards**, each storing only a portion of
    the data
  - **Writes & Reads:** Routed to the **appropriate shard**
  - **Pros:** Handles very large datasets, scalable writes
  - **Cons:** Complex routing, cross-shard queries more difficult
  - **Requires:** A **router or coordinator** to direct requests (e.g., MongoDB
    mongos, Vitess vtgate)

## Combining Replication & Sharding (1)

- Large-scale databases often combine **replication** and **sharding**:
  - Each **shard** is a subset of the total data
  - Each shard is **replicated** for high availability
- In Kubernetes:
  - Use **one StatefulSet per shard**
  - Each StatefulSet manages **replicas of that shard**
  - Headless Services provide **stable network IDs** for intra-shard
    communication
  - Proxies or coordinators handle **routing across shards**

## Combining Replication & Sharding (2)

- Benefits
  - **Fault tolerance:** Replica failure in a shard → automatic recovery
  - **Scalability:** Add shards to increase data capacity
  - **Independent scaling:** Each shard can scale replicas independently
  - **Stable identity & storage:** StatefulSets + PVCs guarantee consistent
    volumes

## Hands-on

- Deploy a sharded and replicated database and test it
- Examples:
  - MySQL (MySQL Group Replication)
  - PostgreSQL (Patroni)
  - MongoDB
  - Cassandra
  - CockroachDB
  - Vitess
