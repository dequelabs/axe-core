/*jshint node: true */
'use strict';

module.exports = function (grunt) {
	grunt.registerMultiTask('npminstall', function () {
		var done = this.async();
		this.files.forEach(function(file) {
			file.src.forEach(function(srcFile) {
				grunt.util.spawn({
					grunt: false,
					cmd: 'npm',
					args: ['install'],
					opts: {
						cwd: srcFile
					}
				}, function (err, result, code) {
					if (err) { 
						grunt.log.writeln(err);
						grunt.log.writeln(result);
					}
					else {
						grunt.verbose.writeln(result);
					}
					done();
				});
			});
		});
	});
};
