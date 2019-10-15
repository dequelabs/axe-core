module.exports = function(config) {
	config.set({
		basePath: '',
		singleRun: true,
		autoWatch: true,
		frameworks: ['mocha', 'chai', 'browserify'],
		files: [
			{ pattern: 'test/mock/**/*.html', included: false, served: true },
			{ pattern: 'test/integration/**/*.css', included: false, served: true },
			{ pattern: 'axe.js', included: true, served: true },

			'lib/core/index.js',
			'lib/core/*/index.js',
			'lib/core/**/index.js',
			'lib/core/*/*.js',
			'lib/core/*/*/*.js', // don't run core/constants.js as it will error
			'test/testutils.js',
			'test/version.js',

			'test/core/**/*.js',
			'test/commons/**/*.js',
			'test/checks/**/*.js',
			'test/rule-matches/**/*.js'
		],
		proxies: {
			'/mock': '/base/test/mock',
			'/lib': '/base/lib',
			'/integration': '/base/test/integration',
			'/axe.js': '/base/axe.js'
		},
		browsers: ['ChromeHeadless'],
		preprocessors: {
			'lib/core/imports/index.js': ['browserify']
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
