/*eslint-env node */
'use strict';
const buildRules = require('../configure');
const format = require('../shared/format');

module.exports = function (grunt) {
  grunt.registerMultiTask(
    'configure',
    'Task for configuring rules and checks',
    function () {
      const done = this.async();
      const options = this.options({
        rules: ['lib/rules/**/*.json'],
        checks: ['lib/checks/**/*.json'],
        misc: ['lib/misc/**/*.json'],
        blacklist: ['metadata'],
        tags: ''
      });

      this.files.forEach(function (file) {
        // locale will always be the 2nd to last part of the
        // filename and in the format of "<name>.<locale>.js"
        const parts = file.dest.auto.split('.');
        if (parts.length > 2) {
          options.locale = parts[parts.length - 2];
        }

        buildRules(grunt, options, null, function (result) {
          grunt.file.write(file.dest.auto, 'axe._load(' + result.auto + ');');

          // Format the content so Prettier doesn't create a diff after running.
          // See https://github.com/dequelabs/axe-core/issues/1310.
          format(result.descriptions, file.dest.descriptions)
            .then(descriptionsContent => {
              grunt.file.write(file.dest.descriptions, descriptionsContent);
              done();
            })
            .catch(err => {
              console.error(err.message);
              done(false);
            });
        });
      });
    }
  );
};
