/*jshint node: true */
'use strict';

module.exports = function (grunt) {
	grunt.registerMultiTask('fixture', function () {
		var options = this.options({
			fixture: 'test/runner.tmpl',
			testCwd: 'test/core',
			tests: ['**/*.js'],
			data: {}
		});

		this.files.forEach(function (f) {
			var files = f.src.filter(function (file) {
					return (/\.js$/).test(file);
				}),
				source = grunt.file.read(options.fixture),
				result = grunt.template.process(source, {
					data: {
						files: files,
						tests: grunt.file.expand({cwd: options.testCwd}, options.tests),
						data: options.data
					}
				});

			grunt.file.write(f.dest, result);
		});
	});
};
