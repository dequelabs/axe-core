'use strict';

module.exports = function(grunt) {
	grunt.registerMultiTask(
		'file-exists',
		'Task to ensure existence of generated build assets',
		function() {
			this.data.forEach(function(f) {
				var files = grunt.file.expand({ nonull: true }, f);
				files.forEach(function(filepath) {
					var exists = grunt.file.exists(filepath);
					if (!!exists) {
						grunt.log.writeln('File: ' + filepath + ', exists.');
					} else {
						grunt.fail.fatal('File: ' + filepath + ', does not exist.');
					}
				});
			});
		}
	);
};
