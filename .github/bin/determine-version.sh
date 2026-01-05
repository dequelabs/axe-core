#!/usr/bin/env bash

set -eo pipefail

echo "::group::Determining new prerelease version"

NAME=$(npm pkg get name | tr -d '"')
LATEST_VERSION=$(npm pkg get version | tr -d '"')

SHORT_SHA=$(echo "${GITHUB_SHA}" | cut -c1-7)
NEW_VERSION="$LATEST_VERSION-canary.${SHORT_SHA}"

echo "Latest version in package.json: $LATEST_VERSION"
echo "New prerelease version: $NEW_VERSION"

echo "version=$NEW_VERSION" >> "$GITHUB_OUTPUT"
echo "name=$NAME" >> "$GITHUB_OUTPUT"

echo "::endgroup::"
