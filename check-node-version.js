#! /usr/bin/env node

const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, '.nvmrc'), 'utf-8', function (err, data) {
  if (err) {
    throw err;
  }

  const minimumVersion = data.trim();
  const currentVersion = process.version.replace('v', '');

  const minimumVersionMajor = parseInt(minimumVersion.split('.')[0]);
  const currentVersionMajor = parseInt(currentVersion.split('.')[0]);

  const usesMinimumVersion = currentVersionMajor >= minimumVersionMajor;

  if (usesMinimumVersion) {
    process.exit();
  }

  console.log(
    '' +
      'Error: You are using Node.js version ' +
      currentVersion +
      ', but you need ' +
      'Node.js version ' +
      minimumVersion +
      ' or higher to build and/or test axe-core.' +
      '\n\n' +
      'Install Node.js version ' +
      minimumVersion +
      ' or higher and try again.' +
      '\n\n' +
      'You can use nvm (https://github.com/creationix/nvm) to update your Node.js version ' +
      " or run 'nvm use'." +
      ''
  );

  process.exit(1);
});
