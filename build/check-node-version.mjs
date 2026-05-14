#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const PATH_TO_NVMRC = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  '.nvmrc'
);
const nvmrc = fs.readFileSync(PATH_TO_NVMRC, 'utf8');
const minimumVersionMajor = parseInt(nvmrc.trim(), 10);

const currentVersion = process.version.replace('v', '');
const currentVersionMajor = parseInt(currentVersion.split('.')[0], 10);

const usesMinimumVersion = currentVersionMajor >= minimumVersionMajor;

if (usesMinimumVersion) {
  process.exit();
}

console.error(
  '' +
    'Error: You are using Node.js version ' +
    currentVersion +
    ', but you need ' +
    'Node.js version ' +
    minimumVersionMajor +
    ' or higher to build and/or test axe-core.' +
    '\n\n' +
    'Install Node.js version ' +
    minimumVersionMajor +
    ' or higher and try again.' +
    '\n\n' +
    'You can use nvm (https://github.com/creationix/nvm) to update your Node.js version ' +
    ''
);

process.exit(1);
