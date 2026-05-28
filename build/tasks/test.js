const execSync = require('child_process').execSync;
const chalk = require('chalk');

/*eslint-env node */
('use strict');

module.exports = function (grunt) {
  grunt.registerMultiTask(
    'test',
    'This task runs unit tests based on which file was changed',
    function () {
      const testFile = grunt.option('changed-file');
      console.log(`${chalk.green('>>')} File "${testFile}"`);

      let cmd = 'npm run test:unit';
      if (
        testFile &&
        testFile.startsWith('test/') &&
        testFile.endsWith('.js')
      ) {
        cmd += ` -- --files "${testFile}"`;
      }
      execSync(cmd, { stdio: 'inherit' });
    }
  );
};
