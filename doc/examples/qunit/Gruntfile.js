module.exports = function (grunt) {
  'use strict';

  grunt.loadNpmTasks('grunt-contrib-qunit');

  grunt.initConfig({
    qunit: {
      all: ['test/**/*.html'],
      options: {
        puppeteer: {
          args: ['--disable-web-security', '--allow-file-access-from-files']
        },
        timeout: 10000
      }
    }
  });
};
