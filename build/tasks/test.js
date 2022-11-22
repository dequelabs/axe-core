const execSync = require('child_process').execSync;
const chalk = require('chalk');

/*eslint-env node */
('use strict');

module.exports = function (grunt) {
  grunt.registerMultiTask(
    'test',
    'This task runs unit tests based on which file was changed',
    function () {
      const testFile = this.data.testFile;
      console.log(`${chalk.green('>>')} File "${testFile}"`);

      execSync(`npm run test:unit -- testFiles=${testFile}`, {
        stdio: 'inherit'
      });
    }
  );
};
