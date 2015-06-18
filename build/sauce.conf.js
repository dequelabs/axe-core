
var browsers = exports.browsers = [{
	browserName: 'internet explorer',
	platform: 'Windows 7',
	version: '9.0'
}, {
	browserName: 'internet explorer',
	platform: 'Windows 8',
	version: '10.0'
}, {
	browserName: 'internet explorer',
	platform: 'Windows 8.1',
	version: '11.0'
}, {
	browserName: 'chrome',
	platform: 'Windows 8.1'
}, {
	browserName: 'firefox',
	platform: 'Windows 8.1'
}, {
	browserName: 'iphone',
	platform: 'OS X 10.10',
	version: '8.2',
	deviceName: 'iPhone Simulator',
	deviceOrientation: 'portrait'
}, {
	browserName: 'android',
	platform: 'Linux',
	version: '5.1',
	deviceName: 'Android Emulator',
	deviceOrientation: 'portrait'
}, {
	browserName: 'safari',
	platform: 'OS X 10.10'
}];

function pushIfDefined(a, b) {
	if (b) {
		a.push(b);
	}
}

exports = module.exports = function (name, url) {
	var tags = [];
	pushIfDefined(tags, process.env.TRAVIS_BRANCH);

	return {
		options: {
			urls: [ url ],
			build: process.env.TRAVIS_JOB_ID,
			concurrency: 3,
			browsers: browsers,
			tunneled: false,
			identifier: process.env.TRAVIS_JOB_NUMBER,
			testname: name || 'mocha tests',
			public: 'public',
			tags: tags.length ? tags : ['local']
		}
	};
};
