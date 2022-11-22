const { notify } = require('node-notifier');

/*eslint-env node */
('use strict');

module.exports = function (grunt) {
  grunt.registerMultiTask(
    'notify',
    'This task sends an OS notification when a task has completed',
    function () {
      notify(this.data);
    }
  );
};
