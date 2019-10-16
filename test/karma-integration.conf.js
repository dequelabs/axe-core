var path = require('path');

module.exports = function(config) {
	config.set({
		basePath: '',
		singleRun: true,
		autoWatch: true,
		plugins: [
			'karma-mocha',
			'karma-chai',
			'karma-mocha-reporter',
			'karma-chrome-launcher',
			require('./integration/integration-preprocessor')
		],
		frameworks: ['mocha', 'chai'],
		files: [
			{
				pattern: 'integration/rules/**/*.html',
				included: false,
				served: true
			},
			{ pattern: '../axe.js', included: true, served: true },

			'testutils.js',
			'integration/rules/**/*.json'
		],
		proxies: {
			'/integration': '/base/integration',
			'/axe.js': path.join('/absolute', __dirname, '../axe.js')
		},
		browsers: ['ChromeHeadless'],
		preprocessors: {
			'integration/rules/**/*.json': ['integration']
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
