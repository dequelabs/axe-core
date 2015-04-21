module.exports = function (grunt) {
	'use strict';

	grunt.loadNpmTasks('grunt-curl');
	grunt.loadNpmTasks('grunt-if-missing');

	grunt.loadTasks('build/tasks');

	grunt.initConfig({
		curl: {
			selenium: {
				dest: 'build/selenium-server-standalone-2.45.0.jar',
				src: 'http://selenium-release.storage.googleapis.com/2.45/selenium-server-standalone-2.45.0.jar'
			}
		},
		'ks-selenium': {
			urls: [
				'http://localhost:5005/'
			]
		}
	});

	grunt.registerTask('dependencies', ['if-missing:curl']);
	grunt.registerTask('test', ['dependencies', 'ks-selenium']);
};
