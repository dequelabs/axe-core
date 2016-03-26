/*jshint node: true */
'use strict';

module.exports = function (grunt) {
	grunt.registerMultiTask('update-help', function () {
		var options = this.options({
			version: '1.0.0'
		});
		var v = options.version.split('.');
		v.pop();
		var baseUrl = 'https://dequeuniversity.com/rules/axe/' + v.join('.') + '/';
		this.files.forEach(function(f) {
			f.src.forEach(function (filepath) {
				var config = grunt.file.readJSON(filepath);
				config.metadata.helpUrl = baseUrl + config.id;
				grunt.file.write(filepath, JSON.stringify(config, null, '  '));
			});
		});
	});
};
