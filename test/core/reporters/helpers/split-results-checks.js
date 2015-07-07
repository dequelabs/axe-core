
describe('helpers.splitResultsWithChecks', function () {
	'use strict';

	var orig;
	beforeEach(function () {
		orig = helpers.splitResults;
	});

	afterEach(function () {
		helpers.splitResults = orig;
	});

	it('should call helpers.splitResults with helpers.formatChecks as second param', function () {
		var called = false;
		helpers.splitResults = function (results, formatter) {
			called = true;
			assert.deepEqual(results, ['foo']);
			assert.equal(formatter, helpers.formatChecks);
		};
		helpers.splitResultsWithChecks(['foo']);
		assert.isTrue(called);
	});
});
