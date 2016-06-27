/* global module */
describe('UMD module.export', function () {
	'use strict';

	it('registers axe to module.exports', function () {
		assert.strictEqual(module.exports, axe);
	});

});
