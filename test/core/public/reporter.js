describe('axe.addReporter', function () {
	'use strict';

	var orig = {};
	before(function () {
		orig.reporters = window.reporters;
	});

	after(function () {
		Object.keys(orig).forEach(function (k) {
			window[k] = orig[k];
		});
	});

	it('should add reporter with given name', function () {
		axe.addReporter('bob', 'joe');
		assert.equal(window.reporters.bob, 'joe');
	});

});
