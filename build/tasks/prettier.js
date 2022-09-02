const { execSync } = require('child_process');

module.exports = function (grunt) {
  grunt.registerMultiTask(
    'prettier',
    'Task to run the prettier on generated files',
    function () {
      const files = grunt.task.current.data.files;

      files.forEach(file => {
        const src = Array.isArray(file.src) ? file.src : [file.src];

        src.forEach(entry => {
          execSync(`npx prettier --write ${entry}`, { stdio: 'inherit' });
        });
      });
    }
  );
};
