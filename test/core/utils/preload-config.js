describe('axe.utils.preloadConfig', function () {
	'use strict';

	it('should be a function', function () {
		assert.isFunction(axe.utils.preloadConfig);
	});

	it('should return default preload configuration if no preload options', function () {
		var actual = axe.utils.preloadConfig({});
		var expected = {
			preload: false,
			assets: ['cssom'],
			timeout: 30000
		};
		assert.deepEqual(actual, expected);
	});

	it('should return default preload value as false', function () {
		var actual = axe.utils.preloadConfig({}).preload;
		var expected = false;
		assert.strictEqual(actual, expected);
	});

	it('should return default assets if preload options is set to true', function () {
		var options = {
			preload: true
		};
		var actual = axe.utils.preloadConfig(options).assets;
		var expected = ['cssom'];
		assert.deepEqual(actual, expected);
	});

	it('should return default timeout value if not configured', function () {
		var options = {
			preload: true,
		};
		var actual = axe.utils.preloadConfig(options).timeout;
		var expected = 30000;
		assert.equal(actual, expected);
	});

	it('should throw error if requested asset type is not supported', function () {
		var options = {
			preload: {
				assets: ['aom']
			}
		};
		var actual = function () { axe.utils.preloadConfig(options); }
		var expected = Error;
		assert.throws(actual, expected);
	});

	it('should throw error if assets array is empty in options for preload', function () {
		var options = {
			preload: {
				assets: []
			}
		};
		var actual = function () { axe.utils.preloadConfig(options); }
		var expected = Error;
		assert.throws(actual, expected);
	});

	it('should unique assets requested if repeated assets are passed via options', function () {
		var options = {
			preload: {
				assets: ['cssom', 'cssom'],
				timeout: 15000
			}
		};
		var actual = axe.utils.preloadConfig(options);
		var expected = {
			preload: true,
			assets: ['cssom'],
			timeout: 15000
		};
		assert.deepEqual(actual, expected);
	});

});
