react-bun-k8s: A **clean, modern setup** that uses:

* ⚡ **Bun** (instead of Node/npm) for the React \+ TypeScript build

* 🐳 **Docker** to package it efficiently

* ☸️ **Kubernetes \+ Helm** to deploy it cleanly

You’ll end up with a **lightweight, reproducible workflow** that builds fast, deploys fast, and avoids the classic npm clutter.

---

## **🧱 Step 1 — Project structure**

Let’s assume your project looks like this:

`my-react-app/`  
`├── src/`  
`│   └── index.tsx`  
`├── public/`  
`│   └── index.html`  
`├── package.json`  
`├── bun.lockb`  
`├── tsconfig.json`  
`├── Dockerfile`  
`└── charts/`  
    `└── frontend/`  
        `├── Chart.yaml`  
        `├── values.yaml`  
        `└── templates/`  
            `├── deployment.yaml`  
            `├── service.yaml`  
            `└── ingress.yaml`

---

## **⚡ Step 2 — Initialize with Bun**

If you’re starting fresh:

`curl -fsSL https://bun.sh/install | bash`  
`bun create react ./my-react-app`  
`cd my-react-app`  
`bun install`  
`bun dev`

You’ll have a working React \+ TypeScript app.  
 When you’re ready to build:

`bun build --outdir dist`

---

## **🐳 Step 3 — Dockerfile (multi-stage build)**

Here’s a **minimal, production-ready Dockerfile**:

`# Stage 1: Build with Bun`  
`FROM oven/bun:1 AS build`  
`WORKDIR /app`  
`COPY . .`  
`RUN bun install`  
`RUN bun run build`

`# Stage 2: Serve static files with NGINX`  
`FROM nginx:alpine`  
`COPY --from=build /app/dist /usr/share/nginx/html`  
`EXPOSE 80`  
`CMD ["nginx", "-g", "daemon off;"]`

Then build and test it locally:

`docker build -t my-react-app .`  
`docker run -p 8080:80 my-react-app`

👉 open [http://localhost:8080](http://localhost:8080)

---

## **☸️ Step 4 — Helm chart for Kubernetes**

### **`charts/frontend/Chart.yaml`**

`apiVersion: v2`  
`name: frontend`  
`description: A React + Bun + NGINX frontend`  
`version: 0.1.0`  
`appVersion: "1.0.0"`

### **`charts/frontend/values.yaml`**

`replicaCount: 2`

`image:`  
  `repository: my-react-app`  
  `tag: latest`  
  `pullPolicy: IfNotPresent`

`service:`  
  `type: ClusterIP`  
  `port: 80`

`ingress:`  
  `enabled: true`  
  `className: nginx`  
  `hosts:`  
    `- host: myapp.example.com`  
      `paths:`  
        `- path: /`  
          `pathType: Prefix`

### **`charts/frontend/templates/deployment.yaml`**

`apiVersion: apps/v1`  
`kind: Deployment`  
`metadata:`  
  `name: {{ include "frontend.fullname" . }}`  
`spec:`  
  `replicas: {{ .Values.replicaCount }}`  
  `selector:`  
    `matchLabels:`  
      `app: {{ include "frontend.name" . }}`  
  `template:`  
    `metadata:`  
      `labels:`  
        `app: {{ include "frontend.name" . }}`  
    `spec:`  
      `containers:`  
        `- name: frontend`  
          `image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"`  
          `imagePullPolicy: {{ .Values.image.pullPolicy }}`  
          `ports:`  
            `- containerPort: 80`

### **`charts/frontend/templates/service.yaml`**

`apiVersion: v1`  
`kind: Service`  
`metadata:`  
  `name: {{ include "frontend.fullname" . }}`  
`spec:`  
  `type: {{ .Values.service.type }}`  
  `ports:`  
    `- port: {{ .Values.service.port }}`  
      `targetPort: 80`  
  `selector:`  
    `app: {{ include "frontend.name" . }}`

### **`charts/frontend/templates/ingress.yaml`**

`{{- if .Values.ingress.enabled }}`  
`apiVersion: networking.k8s.io/v1`  
`kind: Ingress`  
`metadata:`  
  `name: {{ include "frontend.fullname" . }}`  
  `annotations:`  
    `kubernetes.io/ingress.class: {{ .Values.ingress.className }}`  
`spec:`  
  `rules:`  
    `{{- range .Values.ingress.hosts }}`  
    `- host: {{ .host }}`  
      `http:`  
        `paths:`  
          `{{- range .paths }}`  
          `- path: {{ .path }}`  
            `pathType: {{ .pathType }}`  
            `backend:`  
              `service:`  
                `name: {{ include "frontend.fullname" $ }}`  
                `port:`  
                  `number: 80`  
          `{{- end }}`  
    `{{- end }}`  
`{{- end }}`

---

## **🧭 Step 5 — Deploy it**

Push your Docker image:

`docker tag my-react-app <your-dockerhub-username>/my-react-app:latest`  
`docker push <your-dockerhub-username>/my-react-app:latest`

Then deploy with Helm:

`helm install frontend ./charts/frontend --namespace web --create-namespace`

Check that it’s running:

`kubectl get pods -n web`  
`kubectl get svc -n web`  
`kubectl get ingress -n web`

---

## **✅ Summary — Streamlined React \+ TypeScript workflow**

| Stage | Tool | Why |
| ----- | ----- | ----- |
| Dev/build | **Bun** | No npm, fast TS-native builds |
| Packaging | **Docker (multi-stage)** | Compact final image (\~20MB) |
| Deploy | **Helm \+ Kubernetes** | Declarative, scalable, and cloud-native |
| Runtime | **NGINX** | Serve static React build, not Node server |

---

## **🧠 Bonus: future-proof ideas**

* You can extend this to **SSR (Server-Side Rendering)** using Bun or Deno.

* Integrate with **ArgoCD or FluxCD** for GitOps-based deployments.

* Swap NGINX for **Caddy** if you want automatic HTTPS and simpler config.

