module.exports = function (grunt) {
	'use strict';

	grunt.loadNpmTasks('grunt-curl');
	grunt.loadNpmTasks('grunt-if-missing');

	grunt.loadTasks('build/tasks');

	var url = grunt.option('url') ||
		'http://selenium-release.storage.googleapis.com/2.45/selenium-server-standalone-2.45.0.jar';
	var jar = url.split('/').pop();

	grunt.initConfig({
		curl: {
			selenium: {
				dest: 'build/' + jar,
				src: url
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
