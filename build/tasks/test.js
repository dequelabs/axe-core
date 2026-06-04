const execSync = require('child_process').execSync;
const chalk = require('chalk');
const path = require('node:path');

/*eslint-env node */
('use strict');

module.exports = function (grunt) {
  grunt.registerMultiTask(
    'test',
    'This task runs unit tests based on which file was changed',
    function () {
      const testFile = grunt.option('changed-file');
      console.log(`${chalk.green('>>')} File "${testFile}"`);
      const files = [];

      // build the integration tests before testing
      if (
        (testFile.startsWith(path.join('test', 'integration', 'rules')) &&
          testFile.endsWith('.html')) ||
        testFile.endsWith('.json')
      ) {
        execSync('npm run build:integration-tests', { stdio: 'inherit' });
        const rule = testFile.split(path.sep)[3];
        files.push(
          path.join('tmp', 'integration-tests', rule, rule + '.test.js')
        );
      }

      if (
        testFile &&
        testFile.startsWith(`test${path.sep}`) &&
        testFile.endsWith('.js')
      ) {
        files.push(testFile);
      }

      let cmd = 'npm run test:unit';
      if (files.length) {
        cmd += ` -- --files "${files.join(',')}"`;
      }

      execSync(cmd, { stdio: 'inherit' });
    }
  );
};
