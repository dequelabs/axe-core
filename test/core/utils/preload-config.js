

describe('axe.utils.preloadConfig', function () {
	'use strict';

	it('should be a function', function () {
		assert.isFunction(axe.utils.preloadConfig);
	});

	it('should return default preload configuration if no preload options', function () {
		const actual = axe.utils.preloadConfig({});
		const expected = {
			preload: false,
			assets: ['cssom'],
			timeout: 30000
		};
		assert.deepEqual(actual, expected);
	});

	it('should return default preload value as false', function () {
		const actual = axe.utils.preloadConfig({}).preload;
		const expected = false;
		assert.strictEqual(actual, expected);
	});

	it('should return default assets if preload options is set to true', function () {
		const options = {
			preload: true
		};
		const actual = axe.utils.preloadConfig(options).assets;
		const expected = ['cssom'];
		assert.deepEqual(actual, expected);
	});

	it('should return default timeout value if not configured', function () {
		const options = {
			preload: true,
		};
		const actual = axe.utils.preloadConfig(options).timeout;
		const expected = 30000;
		assert.equal(actual, expected);
	});

	it('should throw error if requested asset type is not supported', function () {
		const options = {
			preload: {
				assets: ['aom']
			}
		};
		const actual = function () { axe.utils.preloadConfig(options); }
		const expected = Error;
		assert.throws(actual, expected);
	});

	it('should throw error if assets array is empty in options for preload', function () {
		const options = {
			preload: {
				assets: []
			}
		};
		const actual = function () { axe.utils.preloadConfig(options); }
		const expected = Error;
		assert.throws(actual, expected);
	});

	it('should unique assets requested if repeated assets are passed via options', function () {
		const options = {
			preload: {
				assets: ['cssom', 'cssom'],
				timeout: 15000
			}
		};
		const actual = axe.utils.preloadConfig(options);
		const expected = {
			preload: true,
			assets: ['cssom'],
			timeout: 15000
		};
		assert.deepEqual(actual, expected);
	});

});
