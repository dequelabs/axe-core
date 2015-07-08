module.exports = function (grunt) {
	'use strict';
	grunt.loadTasks('build/tasks');

	grunt.initConfig({
		'axe-selenium': {
			urls: [
				'https://github.com/dequelabs/axe-core'
			]
		}
	});

	grunt.registerTask('test', ['axe-selenium']);
};
