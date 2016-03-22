/*jshint node: true */
'use strict';

module.exports = function (grunt) {
	grunt.registerMultiTask('nodeify', function () {
		grunt.task.requires('configure');
		grunt.task.requires('concat:engine');
		this.files.forEach(function (fileset) {
			var source = fileset.src.map(function (fn) {
				return grunt.file.read(fn);
			}).join('\n');

			var file = grunt.file.read(fileset.dest);

			grunt.file.write(fileset.dest, file + 'module.exports.source = ' + JSON.stringify(source) + ';');
		});
	});
};
