#!/bin/bash

# Build script for Podman
# Usage: ./scripts/build.sh [tag]

set -e

IMAGE_NAME="react-bun-k8s"
TAG=${1:-"latest"}
FULL_TAG="${IMAGE_NAME}:${TAG}"

echo "🔨 Building image with Podman..."
echo "Image: ${FULL_TAG}"

# Build the image
podman build -t "${FULL_TAG}" .

echo "✅ Build completed successfully!"
echo "Run with: podman run -p 8080:80 ${FULL_TAG}"
