# Stage 1: Build
FROM oven/bun:1 as build
WORKDIR /app
COPY . .
RUN bun install
RUN bun run build

# Stage 2: Serve
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
