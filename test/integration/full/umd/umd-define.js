/* global defineCalls */
describe('UMD define', function () {
	'use strict';

	it('calls define and passes it axe', function () {
		assert.equal(defineCalls.length, 1);

		var call = defineCalls[0];
		assert.isFunction(call[2]);
		assert.strictEqual(call[2](), axe);
	});

	it('defines module name as axe-core', function () {
		assert.equal(defineCalls.length, 1);

		var call = defineCalls[0];
		assert.equal(call[0], 'axe-core');
	});

});
