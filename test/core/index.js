describe('index', function () {
	'use strict';

	it('should redefine `define`', function () {
		assert.equal(typeof define, 'undefined');
	});
	it('should redefine `require`', function () {
		assert.equal(typeof require, 'undefined');
	});
});
