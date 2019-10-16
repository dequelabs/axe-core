module.exports = function(config) {
	config.set({
		basePath: '',
		singleRun: false,
		// singleRun: true,
		autoWatch: true,
		plugins: [
			'karma-mocha',
			'karma-chai',
			'karma-browserify',
			'karma-mocha-reporter',
			'karma-chrome-launcher',
			require('./test/integration-preprocessor')
		],
		frameworks: ['mocha', 'chai', 'browserify'],
		files: [
			{ pattern: 'test/mock/**/*.html', included: false, served: true },
			{ pattern: 'test/integration/**/*.css', included: false, served: true },
			{
				pattern: 'test/integration/rules/**/*.html',
				included: false,
				served: true
			},
			{ pattern: 'axe.js', included: true, served: true },

			'lib/core/index.js',
			'lib/core/*/index.js',
			'lib/core/**/index.js',
			'lib/core/*/*.js',
			'lib/core/*/*/*.js', // don't run core/constants.js as it will error

			'test/testutils.js',
			'test/version.js',

			'test/core/reporters/na.js',
			'test/commons/**/*.js'
			// 'test/checks/**/*.js',
			// 'test/rule-matches/**/*.js',

			// 'test/integration/rules/**/*.json'
		],
		proxies: {
			'/mock': '/base/test/mock',
			'/lib': '/base/lib',
			'/integration': '/base/test/integration',
			'/axe.js': '/base/axe.js'
		},
		browsers: ['Chrome'],
		// browsers: ['ChromeHeadless'],
		preprocessors: {
			'lib/core/imports/index.js': ['browserify'],
			'test/integration/rules/**/*.json': ['integration']
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
