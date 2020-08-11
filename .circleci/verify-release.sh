#!/bin/bash

set -e

if [ -n "$1" ] && [ "$1" == "post" ]
then
  # verify the released npm package in another dir as we can't
  # install a package with the same name
  version=$(node -pe "require('./package.json').version")
  name=$(node -pe "require('./package.json').name")

  mkdir "verify-release-$version"
  cd "verify-release-$version"
  npm init -y
  npm install "$name@$version"
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