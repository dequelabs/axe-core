#!/usr/bin/env bash

set -eo pipefail

if [ -z "$PACKAGE_NAME" ] || [ -z "$VERSION" ]; then
  echo "::error::PACKAGE_NAME and VERSION environment variables must be set."
  exit 1
fi

NPM_ROOT_PATH=$(npm root -g)

npm install -g "${PACKAGE_NAME}@${VERSION}" || {
  echo "::error::✗ Failed to install package: ${PACKAGE_NAME}@${VERSION}"
  exit 1
}

cd "$NPM_ROOT_PATH" || {
  echo "::error::✗ Failed to change directory to global npm root: $NPM_ROOT_PATH"
  exit 1
}

node -pe "window={}; document={}; require('${PACKAGE_NAME}');" || {
  echo "::error::✗ Failed to import CommonJS module for package: ${PACKAGE_NAME}"
  exit 1
}

cd "${NPM_ROOT_PATH}/${PACKAGE_NAME}" || {
  echo "::error::✗ Failed to change directory to package path: ${NPM_ROOT_PATH}/${PACKAGE_NAME}"
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
