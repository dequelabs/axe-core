/*eslint-env node */
'use strict';
var buildRules = require('../configure');
var format = require('../shared/format');

module.exports = function (grunt) {
  grunt.registerMultiTask(
    'configure',
    'Task for configuring rules and checks',
    function () {
      var done = this.async();
      var options = this.options({
        rules: ['lib/rules/**/*.json'],
        checks: ['lib/checks/**/*.json'],
        misc: ['lib/misc/**/*.json'],
        blacklist: ['metadata'],
        tags: ''
      });

      this.files.forEach(function (file) {
        var match = file.dest.auto.match(/\.([a-z]{2,3})\.js/);
        if (match) {
          options.locale = match[1];
        }

        buildRules(grunt, options, null, function (result) {
          grunt.file.write(file.dest.auto, 'axe._load(' + result.auto + ');');

          // Format the content so Prettier doesn't create a diff after running.
          // See https://github.com/dequelabs/axe-core/issues/1310.
          const descriptionsContent = format(
            result.descriptions,
            file.dest.descriptions
          );
          grunt.file.write(file.dest.descriptions, descriptionsContent);
          done();
        });
      });
    }
  );
};
