var path = require('path');

module.exports = function(config) {
	config.set({
		basePath: '',
		singleRun: true,
		autoWatch: true,
		frameworks: ['mocha', 'chai', 'browserify'],
		files: [
			{ pattern: 'mock/**/*.html', included: false, served: true },
			{ pattern: 'integration/**/*.css', included: false, served: true },
			{ pattern: '../axe.js', included: true, served: true },

			'../lib/core/index.js',
			'../lib/core/*/index.js',
			'../lib/core/**/index.js',
			'../lib/core/*/*.js',
			'../lib/core/*/*/*.js', // don't run core/constants.js as it will error

			'testutils.js',
			'version.js',

			'core/**/*.js',
			'commons/**/*.js',
			'checks/**/*.js',
			'rule-matches/**/*.js'
		],
		proxies: {
			'/mock': '/base/mock',
			'/lib': path.join('/absolute', __dirname, '../lib'),
			'/integration': '/base/integration',
			'/axe.js': path.join('/absolute', __dirname, '../axe.js')
		},
		browsers: ['ChromeHeadless'],
		preprocessors: {
			'../lib/core/imports/index.js': ['browserify']
		},
		reporters: ['mocha'],
		client: {
			useIframe: false,
			mocha: {
				timeout: 4000 // 4 seconds - upped from 2 seconds
			}
		}
	});
};
