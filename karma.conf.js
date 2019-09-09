module.exports = function(config) {
	config.set({
		basePath: '',
		singleRun: true,
		autoWatch: true,
		frameworks: ['mocha', 'chai', 'browserify'],
		files: [
			{ pattern: 'test/mock/**/*.html', included: false, served: true },
			{ pattern: 'test/integration/**/*.css', included: false, served: true },
			{ pattern: 'axe.js', included: false, served: true },

			'lib/core/index.js',
			'lib/core/*/index.js',
			'lib/core/**/index.js',
			'lib/core/**/*.js',

			'test/testutils.js',
			'test/version.js',

			'test/core/**/*.js'
		],
		proxies: {
			'/mock': '/base/test/mock',
			'/lib': '/base/lib',
			'/integration': '/base/test/integration',
			'/axe.js': '/base/axe.js'
		},
		browsers: ['Chrome'],
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
