/* global module */
describe('UMD module.export', function() {
	'use strict';

	it('registers axe to module.exports', function() {
		assert.strictEqual(module.exports, axe);
	});

	it('should ensure axe source includes axios', function() {
		assert.isTrue(axe.source.includes(axe.imports.axios.toString()));
	});

	it('should include doT', function() {
		var doT = axe.imports.doT;
		assert(doT, 'doT is registered on axe.imports');
		assert.equal(doT.name, 'doT');
	});
});
