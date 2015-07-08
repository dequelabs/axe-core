/*jshint node: true */
'use strict';

var path = require('path');
var templates = require('./templates');
var less = require('less');
var Promise = require('promise');

module.exports = function build(grunt, options, commons, callback) {
	options.getFiles = options.hasOwnProperty('getFiles') ? options.getFiles : true;

	function parseObject(src) {
		var files = grunt.file.expand(src);
		return files.map(function(file) {
			var json = grunt.file.readJSON(file);
			var dirname = path.dirname(file);
			Object.keys(templates).forEach(function(templateName) {
				if (json[templateName]) {
					json[templateName] = path.resolve(dirname, json[templateName]);
					if (options.getFiles) {
						json[templateName] = getSource(json[templateName], templateName);
					}
				}
			});
			return json;
		});
	}

	function parseStyle(src, callback) {
		Promise
			.all(grunt.file.expand(src).map(function(file) {
				return new Promise(function(resolve, reject) {
					less.render(grunt.file.read(file), function(err, result) {
						if (err) {
							return reject(err);
						}
						resolve(result.css);
					});
				});
			}))
			.then(function(values) {
				callback(values.join('\n'));
			});
	}

	function getSource(file, type) {
		return grunt.template.process(templates[type], {
			data: {
				source: grunt.file.read(file)
			}
		});
	}

	parseStyle(options.style, function(styles) {

		callback({
			rules: parseObject(options.rules),
			checks: parseObject(options.checks),
			tools: parseObject(options.tools),
			misc: parseObject(options.misc),
			commons: commons,
			style: styles
		});

	});

};
