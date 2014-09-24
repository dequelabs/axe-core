/*jshint node: true */
'use strict';

module.exports = function (grunt) {
    grunt.registerMultiTask('rules', function () {
        var buildRules = require('../build-rules');

        var options = this.options({
            rules: ['lib/rules/**/*.json'],
            checks: ['lib/checks/**/*.json'],
            misc: ['lib/misc/**/*.json'],
            blacklist: ['metadata'],
            version: 'dev',
            tags: ''
        });
        var compiledStuff = buildRules(grunt, options);
        grunt.file.write(this.data.dest.rules, 'dqre.configure(' + compiledStuff.rules + ');');
        grunt.file.write(this.data.dest.checks, 'var checks = ' + compiledStuff.checks + ';');
        grunt.file.write(this.data.dest.descriptions, compiledStuff.descriptions);
    });
};
