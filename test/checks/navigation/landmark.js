describe('landmark', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should return true when role=main is found', function () {
		fixture.innerHTML = '<div role="main"></div>';
		assert.isTrue(checks.landmark.evaluate(fixture));
	});

	it('should return true when <main> is found', function () {
		fixture.innerHTML = '<main></main>';
		assert.isTrue(checks.landmark.evaluate(fixture));
	});

	it('should otherwise return false', function () {
		fixture.innerHTML = '<div role="contentinfo"></div>';
		assert.isFalse(checks.landmark.evaluate(fixture));
	});

});
