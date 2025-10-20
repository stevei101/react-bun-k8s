#!/bin/bash

# Build script for Docker
# Usage: ./scripts/docker-build.sh [tag]

set -e

IMAGE_NAME="react-bun-k8s"
TAG=${1:-"latest"}
FULL_TAG="${IMAGE_NAME}:${TAG}"

echo "🔨 Building image with Docker..."
echo "Image: ${FULL_TAG}"

# Build the image
docker build -t "${FULL_TAG}" .

echo "✅ Build completed successfully!"
echo "Run with: docker run -p 8080:80 ${FULL_TAG}"
