/*jshint node: true */
'use strict';

var path = require('path');
var templates = require('./templates');

module.exports = function build(grunt, options) {

  function parseObject(src) {
    var files = grunt.file.expand(src);
    return files.map(function (file) {
      var json = grunt.file.readJSON(file);
      var dirname = path.dirname(file);
      Object.keys(templates).forEach(function (templateName) {
        if (json[templateName]) {
          json[templateName] = getSource(path.resolve(dirname, json[templateName]), templateName);
        }
      });
      return json;
    });
  }

  function getSource(file, type) {
    return grunt.template.process(templates[type], {
      data: {
        source: grunt.file.read(file)
      }
    });
  }

  return {
    rules: parseObject(options.rules),
    checks: parseObject(options.checks),
    tools: parseObject(options.tools),
    classifiers: parseObject(options.classifiers),
    analyzers: parseObject(options.analyzers),
    version: options.version
  };

}
