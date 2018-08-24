#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const pkgFile = path.resolve(__dirname, '..', 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgFile));

const { CIRCLE_SHA1, CIRCLE_BRANCH } = process.env;
assert(CIRCLE_BRANCH, 'CIRCLE_BRANCH environment variable not set');
assert(CIRCLE_SHA1, 'CIRCLE_SHA1 environment variable not set');
assert(
	CIRCLE_BRANCH === 'develop',
	'This script should only be run from "develop"'
);

// Shorten the SHA
const GIT_SHA = CIRCLE_SHA1.substr(0, 7);

// Strip the "dist tag" from the version (if it exists)
const version = pkg.version.replace(/-\w+\.\w+$/, '');
const nextVersion = `${version}-canary.${GIT_SHA}`;
console.log(nextVersion);
