var path = require('path');

// allow running only certain directories
var testDirs = [
	'core',
	'commons',
	'rule-matches',
	'checks',
	'api',
	'integration',
	'virtual-rules'
];
var args = process.argv.slice(2);

args.forEach(function(arg) {
	// pattern: testDir=commons,core
	var parts = arg.split('=');
	if (parts[0] === 'testDirs') {
		testDirs = parts[1].split(',');
	}
});

var testPaths = testDirs.map(function(dir) {
	if (dir === 'integration') {
		return path.join(dir, '**/*.json');
	} else if (['virtual-rules', 'api'].includes(dir)) {
		return path.join('integration', dir, '**/*.js');
	}

	return path.join(dir, '**/*.js');
});

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
			'karma-firefox-launcher',
			'karma-ie-launcher',
			require('./integration/rules/preprocessor')
		],
		frameworks: ['mocha', 'chai'],
		files: [
			{ pattern: 'mock/**/*.html', included: false, served: true },
			{ pattern: 'integration/**/*.css', included: false, served: true },
			{ pattern: 'assets/**/*.*', included: false, served: true },
			{ pattern: 'integration/rules/**/*.html', included: false, served: true },
			'../axe.js',

			'testutils.js',
			'version.js'
		].concat(testPaths),
		proxies: {
			'/test': '/base',
			'/mock': '/base/mock',
			'/integration': '/base/integration',
			'/axe.js': path.join('/absolute', __dirname, '../axe.js')
		},
		browsers: ['ChromeHeadless'],
		reporters: ['mocha'],
		preprocessors: {
			'integration/rules/**/*.json': ['integration']
		},
		client: {
			useIframe: false,
			mocha: {
				timeout: 10000,
				reporter: 'html'
			}
		}
	});
};
