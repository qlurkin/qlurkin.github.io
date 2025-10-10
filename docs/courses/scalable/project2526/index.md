---
title: 'Project 2025'
subtitle: 'Kubernetes Deployment Pipeline'
---

![AI generated illustration from [unite.ai](https://www.unite.ai/deploying-large-language-models-on-kubernetes-a-comprehensive-guide/)](./DALL·E-2024-06-18-12.27.28-Create-a-clean-16_9-banner-for-an-article-titled-Kubernetes.-Ensure-the-elements-convey-the-themes-of-container-orchestration-and-cloud-computing.-I.webp)

## Project Goal

Set up a **professional-grade infrastructure** on an **on-premise Kubernetes
cluster** (initially running locally on each student's machine).  
The infrastructure must support a **full Dev → Test → Production pipeline**,
including automation, scalability, monitoring, and documentation.

The application is **free to choose** (students decide the stack and subject),
but it must:

- Be accessible "online" (via browser or API)
- Require a **database** (with schema changes possible in updates)
- Be subject to **regular updates and deployments**

## Expected Features

### Development → Test → Production Pipeline

- Developers push changes to Git repository.
- **CI/CD pipeline** runs unit tests automatically. _(1 point)_
- If tests pass, deployment is triggered in the **Test environment**. _(2
  points)_
- Once validated, the application is deployed to **Production** with **zero
  downtime**. _(2 points)_

### Database Management

- Database must be **sharded** _(2 points)_ and **replicated** _(2 points)_ for
  availability and scalability.
- Updates may require **schema migrations**.
- Implement a **procedure to refresh the Test DB** from Production data
  (anonymized if necessary). (1 point)

### Application Layer

- Application must be **replicated** across multiple Pods. _(1 point)_
- Include a **cache layer** (e.g., Redis, Memcached, Varnish) with replication.
  _(2 points)_
- All components exposed through a **single Ingress controller**. _(2 points)_

### Monitoring & Scaling

- Provide a **dashboard** (e.g., Grafana, Kubernetes Dashboard, Lens, etc.) to:
  - Monitor system load and observe application health _(3 points)_
  - Scale services (automatically or manually) _(2 points)_

### Deployment & Updates

- Application updates should be deployed via Kubernetes mechanisms
  (**Deployments**, **Rolling Updates**).
- Demonstrate:
  - A **new version rollout** with no downtime
  - A **database migration** as part of the update process

## Infrastructure Requirements

- **Cluster:** Local Kubernetes cluster (Docker Desktop, Minikube, or Kubeadm).
- **CI/CD:** Git-based pipeline (GitHub Actions, GitLab CI, ArgoCD, or
  equivalent).
- **Storage:** Persistent volumes for DB and stateful components.
- **Networking:** Ingress for external access; Services for internal routing.
- **Namespaces:** Separate environments (`dev`, `test`, `prod`) within the same
  cluster.
- **Documentation:** Complete onboarding guide for new developers and migration
  guide for Cloud environments.

## Deliverables

1. **Running Infrastructure**
   - All environments (Dev, Test, Prod) deployed on Kubernetes.
   - Database replication & sharding correctly configured.
   - Monitoring and scaling tools in place.
   - Ingress exposing the application externally.

2. **Demonstration**
   - Final evaluation includes a **live deployment of a new version**:
     - Push to Git → CI/CD → Test → Validation → Production. _(3 points)_
     - Show **zero-downtime rollout**. _(1 point)_
     - Apply a **schema migration**. _(1 point)_

3. **Documentation (online)**
   - Accessible via a shared platform (e.g., GitHub Wiki, MkDocs, Notion).
   - Must include:
     - Cluster setup instructions (local & cloud migration guide) _(2 points)_
     - CI/CD pipeline details _(2 points)_
     - Database setup (replication, sharding, migration strategy) _(2 points)_
     - Monitoring & scaling instructions and setup _(2 points)_
     - Onboarding guide for new developers _(2 points)_

## Evaluation

- **Intermediate milestones** will check progress:
  - _8 oct 2025_ _(5 points)_: A simple application is replicated and accessible
    through an Ingress Controller or a manually managed reverse proxy _(no db
    required at this point)_
  - _14 oct 2025_ _(5 points)_: Push to git trigger unit test execution, image
    build and update rollout in test environment
  - _22 oct 2025_ _(5 points)_: You have a dashboard that can monitor your
    services. You can scale from the dashboard.
- **Final evaluation** (5 nov 2025) will consist of:
  - Milestones _(15 points)_
  - Live demonstration of the pipeline (from Git push to Production). _(5
    points)_
  - Infrastructure review (DB setup, scaling, monitoring). _(20 points)_
  - Documentation review. _(10 points)_

## About the ECAM Cluster

There are some limitations on the ECAM cluster:

- You can’t use Ingress resources, so you’ll need to manage your reverse proxy
  yourself.
