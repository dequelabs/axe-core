#!/usr/bin/env bash

set -eo pipefail

if [ -z "$PACKAGE_NAME" ] || [ -z "$VERSION" ]; then
  echo "::error::PACKAGE_NAME and VERSION environment variables must be set."
  exit 1
fi

# Installed into a throwaway project rather than globally, because pnpm's global
# root is a content-addressed store that `require` cannot resolve from.
VALIDATE_DIR=$(mktemp -d)
trap 'rm -rf "$VALIDATE_DIR"' EXIT

cd "$VALIDATE_DIR" || {
  echo "::error::✗ Failed to change directory to validation dir: $VALIDATE_DIR"
  exit 1
}

echo '{ "name": "deploy-validation", "private": true }' > package.json

pnpm add "${PACKAGE_NAME}@${VERSION}" || {
  echo "::error::✗ Failed to install package: ${PACKAGE_NAME}@${VERSION}"
  exit 1
}

node -pe "window={}; document={}; require('${PACKAGE_NAME}');" || {
  echo "::error::✗ Failed to import CommonJS module for package: ${PACKAGE_NAME}"
  exit 1
}

cd "node_modules/${PACKAGE_NAME}" || {
  echo "::error::✗ Failed to change directory to package path: ${VALIDATE_DIR}/node_modules/${PACKAGE_NAME}"
  exit 1
}

types=$(node -pe "require('./package.json').types")
if [ "$types" == "undefined" ]
then
  types=$(node -pe "require('./package.json').typings")
fi
if [ "$types" != "undefined" ] && [ ! -f "$types" ]
then
  echo "::error::The types file is missing"
  exit 1;
fi
echo "Types file '$types' is present in the package"
