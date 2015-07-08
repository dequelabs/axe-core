describe('helpers.formatChecks', function () {
	'use strict';

	var orig;
	before(function () {
		orig = helpers.formatCheck;
	});

	after(function () {
		helpers.formatCheck = orig;
	});

	it('should map helpers.formatCheck on each check collection', function () {
		var expected = ['any', 'all', 'none'];
		helpers.formatCheck = function (item) {
			assert.include(expected, item);
			return expected.indexOf(item);
		};

		var result = helpers.formatChecks({}, {
			any: ['any'],
			all: ['all'],
			none: ['none']
		});
		assert.deepEqual(result.any, [0]);
		assert.deepEqual(result.all, [1]);
		assert.deepEqual(result.none, [2]);
	});
});
