/*eslint-env node */
'use strict';

let path = require('path');
let templates = require('./templates');

module.exports = function build(grunt, options, commons, callback) {
  options.getFiles = options.hasOwnProperty('getFiles')
    ? options.getFiles
    : true;

  function parseObject(src) {
    let files = grunt.file.expand(src);
    return files.map(function (file) {
      let json = grunt.file.readJSON(file);
      let dirname = path.dirname(file);
      Object.keys(templates).forEach(function (templateName) {
        if (json[templateName] && json[templateName].endsWith('.js')) {
          json[templateName] = path.resolve(dirname, json[templateName]);
          if (options.getFiles) {
            json[templateName] = getSource(json[templateName], templateName);
          }
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

  callback({
    rules: parseObject(options.rules),
    checks: parseObject(options.checks),
    misc: parseObject(options.misc)
  });
};
