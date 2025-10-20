# Multi-stage Dockerfile for React + Bun + NGINX
# Compatible with both Docker and Podman
# Stage 1: Build
FROM oven/bun:1 AS build
WORKDIR /app
COPY . .
RUN bun install
RUN bun run build
RUN ls -la /app/dist

# Stage 2: Serve
FROM nginx:alpine
# Remove default nginx files first
RUN rm -rf /usr/share/nginx/html/*
# Copy our built files
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
