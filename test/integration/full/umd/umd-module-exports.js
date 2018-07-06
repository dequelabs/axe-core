/* global module */
describe('UMD module.export', function() {
	'use strict';

	it('registers axe to module.exports', function() {
		assert.strictEqual(module.exports, axe);
	});

	it('exposes axe.source', function() {
		assert.isString(axe.source);
		assert.include(axe.source, axe.run.toString());
	});

	it('includes axios in axe.source', function() {
		assert.include(axe.source, axe.imports.axios.toString());
	});
});
