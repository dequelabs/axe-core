/*jshint node: true */
'use strict';

var childProcess = require('child_process'),
	path = require('path');

module.exports = function (grunt) {
	grunt.registerTask('yeti', function () {
		var done = this.async();

		var yeti = childProcess.spawn('yeti', ['-c'], {
			cwd: path.resolve(__dirname, '../..')
		});
		yeti.stdout.on('data', function (data) {
			console.log(data.toString().trim());
		});
		yeti.stderr.on('data', function (data) {
			console.error(data.toString().trim());
		});
		yeti.on('exit', function (code) {
			done(code);
		});

	});
};