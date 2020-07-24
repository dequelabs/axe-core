/* global defineCalls */
describe('UMD define', function() {
	'use strict';

	it('should have atleast one umd global', function() {
		assert.isAtLeast(defineCalls.length, 1);
	});

	it('calls define and passes it axe', function() {
		var call = defineCalls[defineCalls.length - 1];
		assert.isFunction(call[2]);

		var axe = call[2]();

		// test some public apis
		assert.typeOf(axe.run, 'function');
		assert.typeOf(axe.configure, 'function');
		assert.typeOf(axe.reset, 'function');
	});

	it('defines module name as axe-core', function() {
		var call = defineCalls[defineCalls.length - 1];
		assert.equal(call[0], 'axe-core');
	});
});
