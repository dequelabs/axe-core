#!/usr/bin/env bash

set -eo pipefail

if [ -z "$VERSION" ] || [ -z "$PACKAGE_NAME" ]; then
  echo "✗ ERROR: VERSION and PACKAGE_NAME environment variables must be set."
  exit 1
fi

SLEEP_SECONDS=${SLEEP_SECONDS:-10}
MAX_ATTEMPTS=${MAX_ATTEMPTS:-30}

echo "::group::Waiting for ${PACKAGE_NAME}@${VERSION} to be available on npm registry..."

for i in $(seq 1 "$MAX_ATTEMPTS"); do
  echo "Attempt $i of $MAX_ATTEMPTS..."

  if npm view "${PACKAGE_NAME}@${VERSION}" version > /dev/null 2>&1; then
    PUBLISHED_VERSION=$(npm view "${PACKAGE_NAME}@${VERSION}" version)
    echo "✓ Package ${PACKAGE_NAME}@${PUBLISHED_VERSION} is now available on npm!"
    echo "::endgroup::"
    exit 0
  fi

  if [ "$i" -lt "$MAX_ATTEMPTS" ]; then
    echo "Package not yet available, waiting ${SLEEP_SECONDS} seconds..."
    sleep "$SLEEP_SECONDS"
  fi
done

echo "✗ Timeout: Package ${PACKAGE_NAME}@${VERSION} not available after $((MAX_ATTEMPTS * SLEEP_SECONDS)) seconds"
echo "::endgroup::"

exit 1
