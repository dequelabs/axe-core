describe('helpers.getEnvironmentData', function() {
	'use strict';

	it('should return a `testEngine` property', function() {
		var data = helpers.getEnvironmentData();
		assert.isObject(data.testEngine);
		assert.equal(data.testEngine.name, 'axe-core');
		assert.equal(data.testEngine.version, axe.version);
	});

	it('should return a `testRunner` property', function() {
		var data = helpers.getEnvironmentData();
		assert.isObject(data.testRunner);
		assert.equal(data.testRunner.name, axe._audit.brand);
	});

	it('should return a `testEnvironment` property', function() {
		var data = helpers.getEnvironmentData();
		assert.isObject(data.testEnvironment);
		assert.ok(data.testEnvironment.userAgent);
		assert.ok(data.testEnvironment.windowWidth);
		assert.ok(data.testEnvironment.windowHeight);
		assert.isNotNull(data.testEnvironment.orientationAngle);
		assert.isNotNull(data.testEnvironment.orientationType);
	});

	it('should return a `timestamp` property`', function() {
		var data = helpers.getEnvironmentData();
		assert.isDefined(data.timestamp);
	});

	it('should return a `url` property', function() {
		var data = helpers.getEnvironmentData();
		assert.isDefined(data.url);
	});
});
