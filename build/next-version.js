#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const pkgFile = path.resolve(__dirname, '..', 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgFile));

const { CIRCLE_SHA1 } = process.env;
assert(CIRCLE_SHA1, 'CIRCLE_SHA1 enviornment variable not set');

// Shorten the SHA
const GIT_SHA = CIRCLE_SHA1.substr(0, 7);

// Strip the "dist tag" from the version (if it exists)
const version = pkg.version.replace(/-\w+\.\d$/, '');
const nextVersion = `${version}-next.${GIT_SHA}`;

pkg.version = nextVersion;
fs.writeFileSync(pkgFile, JSON.stringify(pkg, null, 2));

console.log(`Updated version to ${nextVersion}`);
