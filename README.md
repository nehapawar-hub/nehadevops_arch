# Kubernetes Microservices Deployment using Minikube

## Project Overview

This project demonstrates the deployment of a Node.js-based microservices application on Kubernetes using Minikube.

The application consists of four microservices:

* **User Service** (Port 3000)
* **Product Service** (Port 3001)
* **Order Service** (Port 3002)
* **Gateway Service** (Port 3003)

The Gateway Service acts as the entry point for client requests. The Order Service communicates with the User Service and Product Service internally using Kubernetes service discovery.

---

# Project Structure

```text
submission/
├── deployments/
│   ├── user-service.yaml
│   ├── product-service.yaml
│   ├── order-service.yaml
│   └── gateway-service.yaml
├── services/
│   ├── user-service.yaml
│   ├── product-service.yaml
│   ├── order-service.yaml
│   └── gateway-service.yaml
├── ingress/
│   └── ingress.yaml
├── screenshots/
│   ├── pods.png
│   ├── logs.png
│   └── service-test.png
└── README.md
```

---

# Prerequisites

Install the following software:

* Docker Desktop
* Minikube
* kubectl
* Node.js (v18 or later)
* Visual Studio Code (optional)

Verify the installation:

```bash
docker --version
kubectl version --client
minikube version
node -v
npm -v
```

---

# Running the Services Locally

Open four terminals and start each service.

## User Service

```bash
cd user-service
npm install
npm start
```

Runs on:

```
http://localhost:3000
```

---

## Product Service

```bash
cd product-service
npm install
npm start
```

Runs on:

```
http://localhost:3001
```

---

## Order Service

```bash
cd order-service
npm install
npm start
```

Runs on:

```
http://localhost:3002
```

---

## Gateway Service

```bash
cd gateway-service
npm install
npm start
```

Runs on:

```
http://localhost:3003
```

---

# Test the Application Locally

Use a browser or Postman.

| URL                                | Description               |
| ---------------------------------- | ------------------------- |
| http://localhost:3000/users        | User Service              |
| http://localhost:3001/products     | Product Service           |
| http://localhost:3002/orders       | Order Service             |
| http://localhost:3003/api/users    | Gateway → User Service    |
| http://localhost:3003/api/products | Gateway → Product Service |
| http://localhost:3003/api/orders   | Gateway → Order Service   |

---

# Build Docker Images

Build each microservice image.

## User Service

```bash
cd user-service
docker build -t user-service .
```

## Product Service

```bash
cd ../product-service
docker build -t product-service .
```

## Order Service

```bash
cd ../order-service
docker build -t order-service .
```

## Gateway Service

```bash
cd ../gateway-service
docker build -t gateway-service .
```

Verify images:

```bash
docker images
```

---

# Start Minikube

```bash
minikube start
```

Verify the cluster:

```bash
kubectl get nodes
```

Expected output:

```
STATUS: Ready
```

---

# Load Docker Images into Minikube

```bash
minikube image load user-service
minikube image load product-service
minikube image load order-service
minikube image load gateway-service
```

---

# Deploy to Kubernetes

Deploy the application:

```bash
kubectl apply -f deployments/
kubectl apply -f services/
```

Verify the deployment:

```bash
kubectl get deployments
kubectl get pods
kubectl get services
```

---

# Verify Inter-Service Communication

Check the Gateway logs:

```bash
kubectl logs deployment/gateway-service
```

Check the Order Service logs:

```bash
kubectl logs deployment/order-service
```

Successful logs indicate communication with the User Service and Product Service using Kubernetes DNS names.

---

# Test Using Port Forward

Expose the Gateway Service:

```bash
kubectl port-forward service/gateway-service 3003:3003
```

Open a browser or use curl:

```bash
curl http://localhost:3003/api/users
curl http://localhost:3003/api/products
curl http://localhost:3003/api/orders
```

---

# Bonus: Configure Ingress

Enable the Minikube Ingress controller:

```bash
minikube addons enable ingress
```

Deploy the Ingress resource:

```bash
kubectl apply -f ingress/
```

Find the Minikube IP:

```bash
minikube ip
```

Add the IP and hostname to your hosts file:

```
<MINIKUBE_IP> microservices.local
```

Example routes:

* http://microservices.local/api/users
* http://microservices.local/api/products
* http://microservices.local/api/orders
* http://microservices.local/

---

# Troubleshooting

### Pods are not starting

```bash
kubectl get pods
kubectl describe pod <pod-name>
kubectl logs <pod-name>
```

---

### Deployment status

```bash
kubectl get deployments
kubectl rollout status deployment/user-service
```

---

### Check Services

```bash
kubectl get svc
```

---

### Restart a Deployment

```bash
kubectl rollout restart deployment/gateway-service
```

---

### Verify Node

```bash
kubectl get nodes
```

---

# Screenshots Included

The following screenshots are included in the `screenshots` folder:

* Running Pods (`kubectl get pods`)
* Running Services (`kubectl get svc`)
* Gateway Service Logs
* Order Service Logs
* Successful API responses using `kubectl port-forward`

---

# Technologies Used

* Node.js
* Express.js
* Docker
* Kubernetes
* Minikube
* kubectl

---

# Conclusion

This project demonstrates how to containerize and deploy a Node.js microservices application on Kubernetes using Minikube. Kubernetes Deployments ensure application availability, Services enable internal communication through ClusterIP, and Ingress provides optional external routing. The application successfully demonstrates communication between the Gateway, User, Product, and Order microservices.
