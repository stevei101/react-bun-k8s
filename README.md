A **complete, production-grade GitHub repo scaffold** for a modern **React \+ TypeScript** app built with **Bun**, containerized with **Docker**, and deployed with **Helm** on Kubernetes.  
---

## **🚀 Project Overview**

Your repo will look like this:

`react-bun-k8s/`  
`├── src/`  
`│   └── index.tsx`  
`├── public/`  
`│   └── index.html`  
`├── package.json`  
`├── bun.lockb`  
`├── tsconfig.json`  
`├── Dockerfile`  
`├── charts/`  
`│   └── frontend/`  
`│       ├── Chart.yaml`  
`│       ├── values.yaml`  
`│       └── templates/`  
`│           ├── deployment.yaml`  
`│           ├── service.yaml`  
`│           └── ingress.yaml`  
`├── .github/`  
`│   └── workflows/`  
`│       └── deploy.yml`  
`└── README.md`

Here’s what each part does:

* **Bun** → Builds your React \+ TypeScript app fast

* **Dockerfile** → Creates a lightweight NGINX container (\~20MB)

* **Helm chart** → Deploys your app to Kubernetes

* **GitHub Actions** → Builds \+ pushes the image, then deploys it automatically

---

## **🧩 1\. React \+ Bun setup**

**package.json**

`{`  
  `"name": "react-bun-k8s",`  
  `"version": "1.0.0",`  
  `"scripts": {`  
    `"dev": "bun dev",`  
    `"build": "bun run build",`  
    `"preview": "bun run preview"`  
  `},`  
  `"dependencies": {`  
    `"react": "^18.3.1",`  
    `"react-dom": "^18.3.1"`  
  `},`  
  `"devDependencies": {`  
    `"typescript": "^5.4.0",`  
    `"@types/react": "^18.2.0",`  
    `"@types/react-dom": "^18.2.0"`  
  `}`  
`}`

**tsconfig.json**

`{`  
  `"compilerOptions": {`  
    `"target": "ESNext",`  
    `"module": "ESNext",`  
    `"jsx": "react-jsx",`  
    `"strict": true,`  
    `"moduleResolution": "bundler",`  
    `"allowImportingTsExtensions": true,`  
    `"isolatedModules": true,`  
    `"noEmit": true`  
  `},`  
  `"include": ["src"]`  
`}`

**src/index.tsx**

`import React from "react";`  
`import { createRoot } from "react-dom/client";`

`const App = () => <h1>Hello from React + Bun + Kubernetes 🚀</h1>;`

`createRoot(document.getElementById("root")!).render(<App />);`

**public/index.html**

`<!DOCTYPE html>`  
`<html lang="en">`  
  `<head>`  
    `<meta charset="UTF-8" />`  
    `<title>React Bun K8s</title>`  
  `</head>`  
  `<body>`  
    `<div id="root"></div>`  
  `</body>`  
`</html>`

---

## **🐳 2\. Dockerfile**

`# Stage 1: Build`  
`FROM oven/bun:1 as build`  
`WORKDIR /app`  
`COPY . .`  
`RUN bun install`  
`RUN bun run build`

`# Stage 2: Serve`  
`FROM nginx:alpine`  
`COPY --from=build /app/dist /usr/share/nginx/html`  
`EXPOSE 80`  
`CMD ["nginx", "-g", "daemon off;"]`

---

## **☸️ 3\. Helm chart (`charts/frontend`)**

*(same templates as I showed before — deployment, service, ingress, values.yaml, etc.)*

---

## **⚙️ 4\. GitHub Actions workflow**

**.github/workflows/deploy.yml**

`name: Deploy Frontend`

`on:`  
  `push:`  
    `branches: [ main ]`

`jobs:`  
  `build-and-deploy:`  
    `runs-on: ubuntu-latest`  
    `steps:`  
      `- name: Checkout code`  
        `uses: actions/checkout@v4`

      `- name: Set up Docker Buildx`  
        `uses: docker/setup-buildx-action@v3`

      `- name: Log in to Docker Hub`  
        `uses: docker/login-action@v3`  
        `with:`  
          `username: ${{ secrets.DOCKERHUB_USERNAME }}`  
          `password: ${{ secrets.DOCKERHUB_TOKEN }}`

      `- name: Build and push image`  
        `uses: docker/build-push-action@v5`  
        `with:`  
          `push: true`  
          `tags: ${{ secrets.DOCKERHUB_USERNAME }}/react-bun-k8s:latest`

      `- name: Set up Helm`  
        `uses: azure/setup-helm@v4`

      `- name: Deploy to Kubernetes`  
        `run: |`  
          `helm upgrade --install frontend ./charts/frontend \`  
            `--namespace web --create-namespace \`  
            `--set image.repository=${{ secrets.DOCKERHUB_USERNAME }}/react-bun-k8s \`  
            `--set image.tag=latest`

💡 Set GitHub Secrets:

* `DOCKERHUB_USERNAME`

* `DOCKERHUB_TOKEN`

* (Optionally) `KUBECONFIG` if you’re deploying directly from GitHub to a cluster

---

## **📘 5\. README (usage summary)**

**README.md**

`# React + TypeScript + Bun + Kubernetes 🚀`

`A modern, lightweight, and production-ready frontend scaffold.`

`## 🧩 Stack`  
`- ⚡ Bun for build (faster than Node/npm)`  
`- 🐳 Docker multi-stage image`  
`- ☸️ Helm for Kubernetes deployment`  
`- 🔄 GitHub Actions CI/CD pipeline`

`## 🚀 Quick start`

```` ```bash ````  
`bun install`  
`bun run dev`

## **🐳 Build Docker image**

`docker build -t react-bun-k8s .`  
`docker run -p 8080:80 react-bun-k8s`

## **☸️ Deploy to Kubernetes**

`helm install frontend ./charts/frontend --namespace web --create-namespace`

`---`

`## 🌐 Deployment flow`  
``1. Push to `main` → GitHub Actions builds the Docker image``    
`2. Image pushed to Docker Hub`    
`3. Helm deploys to your Kubernetes cluster (automatically or manually)`    
`4. Ingress exposes your React app publicly`  

`---`  
