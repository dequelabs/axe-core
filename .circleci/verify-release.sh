#!/bin/bash

set -e

# Verifying the release can fail due to race condition of
# npm not publishing the package before we try to install
# it
function wait_for_publish() {
  echo "Installing $1@$2"

  set +e
  for i in {1..10}; do
    npm install "$1@$2" 2> /dev/null
    if [ $? -eq 0 ]; then
      echo "Successfully installed"
      set -e
      return
    else
      echo "Retrying..."
      sleep 10
    fi
  done

  echo "Unable to install. Exiting..."
  exit 1
}

if [ -n "$1" ] && [ "$1" == "post" ]
then
  # verify the released npm package in another dir as we can't
  # install a package with the same name
  version=$(node -pe "require('./package.json').version")
  name=$(node -pe "require('./package.json').name")

  mkdir "verify-release-$version"
  cd "verify-release-$version"
  npm init -y

  wait_for_publish "$name" "$version"

  node -pe "window={}; document={}; require('$name')"

  cd "node_modules/${name}"
else
  # verify main file exists
  main=$(node -pe "require('./package.json').main")
  node -pe "window={}; document={}; require('./$main')"
fi

# Test if typescript file exists (if declared)
#
# Note: because we are using node to read the package.json, the
# variable gets set to the string `undefined` if the property
# does not exists, rather than an empty variable.
types=$(node -pe "require('./package.json').types")
if [ "$types" == "undefined" ]
then
  types=$(node -pe "require('./package.json').typings")
fi

if [ "$types" != "undefined" ] && [ ! -f "$types" ]
then
  echo "types file missing"
  exit 1;
fi