#!/bin/bash

# Push script for Docker
# Usage: ./scripts/docker-push.sh [registry] [tag]

set -e

IMAGE_NAME="react-bun-k8s"
REGISTRY=${1:-"docker.io"}
TAG=${2:-"latest"}
FULL_TAG="${REGISTRY}/${IMAGE_NAME}:${TAG}"

echo "📤 Pushing image to registry..."
echo "Registry: ${REGISTRY}"
echo "Image: ${FULL_TAG}"

# Tag the image for the registry
docker tag "${IMAGE_NAME}:${TAG}" "${FULL_TAG}"

# Push the image
docker push "${FULL_TAG}"

echo "✅ Push completed successfully!"
echo "Image available at: ${FULL_TAG}"
