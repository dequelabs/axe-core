/*jshint node: true */
'use strict';

module.exports = function (grunt) {
	grunt.registerMultiTask('testconfig', function () {
		var options = this.options({
			port: 80
		});

		this.files.forEach(function(f) {
			grunt.file.write(f.dest, JSON.stringify({
				options: options,
				tests: f.src.map(function (filepath) {
					var testConfig = grunt.file.readJSON(filepath);
					if (testConfig.standalone) {
						testConfig.url = 'http://localhost:' + options.port + '/' + filepath.replace(/json$/, 'html');
					} else {
						testConfig.content = grunt.file.read(filepath.replace(/json$/, 'html'));
					}
					return testConfig;
				})
			}));
		});
	});
};
