describe('axe.utils.memoize', function() {
	'use strict';

	var orig = axe.imports.memoize;
	var memoizedFns;

	beforeEach(function() {
		memoizedFns = axe._memoizedFns.slice();
	});

	afterEach(function() {
		axe.imports.memoize = orig;
		axe._memoizedFns = memoizedFns;
	});

	it('should call imports.memoize', function() {
		var called = false;
		axe.imports.memoize = function() {
			called = true;
		};

		axe.utils.memoize(function() {});
		assert.isTrue(called);
	});

	it('should add the function to axe._memoizedFns', function() {
		axe._memoizedFns.length = 0;

		axe.utils.memoize(function myFn() {});
		assert.equal(axe._memoizedFns.length, 1);
	});
});
