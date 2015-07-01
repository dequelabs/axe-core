/*jshint node: true */
'use strict';

module.exports = function (grunt) {
	grunt.registerMultiTask('testconfig', function () {

		var result = {
			tests: {},
			urls: []
		};

		this.files.forEach(function(f) {
			f.src.forEach(function (filepath) {
				var config = grunt.file.readJSON(filepath);
				config.content = grunt.file.read(filepath.replace(/json$/, 'html'));
				result.tests[config.rule] = result.tests[config.rule] || [];
				result.tests[config.rule].push(config);
			});
			grunt.config(['testconfig', 'options', 'data'], result);
			if (f.dest) {
				grunt.file.write(f.dest, 'var tests = ' + JSON.stringify(result.tests));
			}
		});
	});
};
