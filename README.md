# React + Bun + Kubernetes 🚀

A **complete, production-grade scaffold** for modern React + TypeScript apps built with Bun, containerized with Docker/Podman, and deployed with Helm on Kubernetes.

## 🧩 Tech Stack

- ⚡ **Bun** - Fast JavaScript runtime and package manager
- ⚛️ **React + TypeScript** - Modern frontend framework
- 🐳 **Docker/Podman** - Containerization (choose your preference)
- ☸️ **Kubernetes + Helm** - Container orchestration and deployment
- 🔄 **GitHub Actions** - CI/CD pipeline

## ☸️ Kubernetes Setup with Podman

### Option 1: Kind (Kubernetes in Docker) - Recommended
Kind runs Kubernetes in Docker containers, but works great with Podman.

```bash
# Install Kind
# macOS: brew install kind
# Linux: go install sigs.k8s.io/kind@v0.20.0

# Create cluster
kind create cluster --name react-app

# Verify cluster
kubectl cluster-info --context kind-react-app
```

### Option 2: Minikube with Podman Driver
Minikube can use Podman as its container runtime.

```bash
# Install Minikube
# macOS: brew install minikube
# Linux: curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64

# Start with Podman driver
minikube start --driver=podman

# Verify
kubectl get nodes
```

### Option 3: Podman Machine (macOS/Windows)
For macOS and Windows, Podman uses a VM.

```bash
# Initialize Podman machine
podman machine init

# Start Podman machine
podman machine start

# Install Kind in Podman machine
podman run --rm -v /var/lib/docker:/var/lib/docker \
  -v /usr/local/bin:/usr/local/bin \
  kindest/node:v1.27.3
```

### Quick Setup Script
```bash
# Run the setup script
./scripts/setup-k8s.sh

# Or use Makefile
make k8s-setup
```

## 🚀 Quick Start

### Prerequisites Check
```bash
make check-prerequisites
# or
./scripts/check-prerequisites.sh
```

### Development
```bash
# Install dependencies
bun install

# Start development server
make dev
# or
bun run dev
```

### Build & Deploy
```bash
# Build React app
make build

# Build container (auto-detects Docker/Podman)
make container-build

# Deploy to Kubernetes
make deploy
```

## 📋 Available Commands

### Development Commands
| Command | Description |
|---------|-------------|
| `make dev` | Start development server |
| `make build` | Build React application |
| `make preview` | Preview built application |
| `make clean` | Clean build artifacts |

### Container Commands (Auto-detects Docker/Podman)
| Command | Description |
|---------|-------------|
| `make container-build` | Build container image |
| `make container-run` | Run container locally |
| `make container-push REGISTRY=docker.io/username` | Push to registry |

### Kubernetes Commands
| Command | Description |
|---------|-------------|
| `make k8s-setup` | Interactive Kubernetes setup |
| `make k8s-kind` | Create Kind cluster |
| `make k8s-minikube` | Start Minikube with Podman |
| `make k8s-stop` | Stop Kubernetes cluster |
| `make k8s-status` | Check cluster status |

### Complete Setup Commands
| Command | Description |
|---------|-------------|
| `make full-setup` | Complete setup including Kubernetes |
| `make dev-setup` | Development setup only |

### Kubernetes Deployment
| Command | Description |
|---------|-------------|
| `make deploy` | Deploy to Kubernetes |
| `make deploy-dev` | Deploy development version |
| `make deploy-prod` | Deploy production version |

### Explicit Container Runtime Commands
If you prefer explicit control:

**Docker:**
```bash
make docker-build
make docker-run
make docker-push
```

**Podman:**
```bash
make podman-build
make podman-run
make podman-push
```

## 🐳 Container Runtime Options

This project supports both Docker and Podman. The unified scripts automatically detect which one is available.

### Docker vs Podman Quick Comparison

| Feature | Docker | Podman |
|---------|--------|--------|
| **Security** | Root daemon | Rootless by default |
| **Resource Usage** | Higher | Lower |
| **Ecosystem** | Mature | Growing |
| **Compatibility** | Industry standard | Docker-compatible |

**Choose Docker if:** You need Docker Compose, have existing Docker workflows, or prefer the mature ecosystem.

**Choose Podman if:** Security is priority, you want rootless containers, or prefer open source solutions.

## ☸️ Kubernetes Deployment

### Environment-Specific Deployments

The Helm chart supports multiple environments with different configurations:

```bash
# Development (1 replica, minimal resources)
make deploy-dev

# Staging (2 replicas, staging.myapp.example.com)
make deploy-staging

# Production (3 replicas, production resources)
make deploy-prod
```

### Custom Deployments

```bash
# Deploy with custom namespace and tag
./scripts/deploy.sh my-namespace v1.2.3

# Deploy to local Kubernetes (minikube/kind)
make deploy-local
```

### Helm Commands
```bash
make helm-install    # Install chart
make helm-upgrade    # Upgrade chart
make helm-uninstall  # Remove chart
```

## 🔧 Configuration

### Environment Variables
The project uses environment-specific Helm values:

- **Development**: Minimal resources, single replica
- **Staging**: Medium resources, staging domain
- **Production**: High resources, production domains

### Customizing Values
Edit `charts/frontend/values.yaml` to customize:
- Resource limits and requests
- Ingress hosts and TLS
- Security contexts
- Health checks
- Node selectors and affinity

## 📁 Project Structure

```
react-bun-k8s/
├── src/                    # React source code
├── public/                 # Static assets
├── charts/frontend/        # Helm chart
│   ├── Chart.yaml
│   ├── values.yaml
│   └── templates/
├── scripts/               # Helper scripts
│   ├── build.sh          # Unified build script
│   ├── push.sh           # Unified push script
│   ├── deploy.sh         # Deployment script
│   └── check-prerequisites.sh
├── Dockerfile            # Multi-stage container build
├── Makefile              # Convenient commands
├── package.json          # Dependencies and scripts
└── README.md            # This file
```

## 🛠️ Development Workflow

### 1. Local Development
```bash
make dev-setup    # Check prerequisites and install deps
make dev          # Start development server
```

### 2. Build & Test
```bash
make build        # Build React app
make container-build  # Build container
make container-run    # Test container locally
```

### 3. Deploy
```bash
make build-and-deploy  # Build app, container, and deploy
```

## 🔍 Troubleshooting

### Common Issues

**"No container runtime found"**
```bash
# Install Docker or Podman
# macOS: brew install docker podman
# Linux: dnf install docker podman
```

**"Helm chart not found"**
```bash
# Install Helm
# https://helm.sh/docs/intro/install/
```

**"Kubernetes cluster not accessible"**
```bash
# Check kubectl context
kubectl config current-context

# Set up local cluster (minikube/kind)
minikube start
# or
kind create cluster
```

### Getting Help
```bash
make help  # Show all available commands
```

## 🌐 CI/CD Pipeline

The project includes GitHub Actions workflow for automated deployment:

1. **Push to main** → Triggers build
2. **Build container** → Uses Docker/Podman
3. **Push to registry** → Docker Hub, Quay, etc.
4. **Deploy to K8s** → Helm deployment

### Required GitHub Secrets
- `DOCKERHUB_USERNAME` - Container registry username
- `DOCKERHUB_TOKEN` - Container registry token
- `KUBECONFIG` - Kubernetes configuration (optional)

## 📚 Additional Resources

- [Bun Documentation](https://bun.sh/docs)
- [React Documentation](https://react.dev)
- [Docker Documentation](https://docs.docker.com)
- [Podman Documentation](https://podman.io/docs)
- [Kubernetes Documentation](https://kubernetes.io/docs)
- [Helm Documentation](https://helm.sh/docs)

---

## 🎯 Summary

This scaffold provides:
- ✅ **Fast development** with Bun
- ✅ **Flexible containerization** (Docker or Podman)
- ✅ **Production-ready deployment** with Kubernetes + Helm
- ✅ **Automated CI/CD** with GitHub Actions
- ✅ **Environment-specific configurations**
- ✅ **Security best practices**

**Ready to build something amazing?** Start with `make dev-setup` and you're good to go! 🚀