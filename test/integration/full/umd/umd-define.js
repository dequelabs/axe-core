/* global defineCalls */
describe('UMD define', function () {
	'use strict';

	it('calls define and passes it axe', function () {
		assert.equal(defineCalls.length, 1);

		var call = defineCalls[0];
		assert.isFunction(call[1]);
		assert.strictEqual(call[1](), axe);
	});

});
