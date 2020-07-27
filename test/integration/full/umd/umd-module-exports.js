/* global module */
describe('UMD module.export', function() {
	'use strict';

	var axe;
	beforeEach(function() {
		axe = module.exports;
	});

	it('registers axe to module.exports', function() {
		assert.hasAnyKeys(axe, ['utils', 'commons', 'core']);
	});

	it('does not use `require` functions', function() {
		// This is to avoid colliding with Cypress.js which overloads all
		// uses of variables named `require`.
		assert.notMatch(
			axe.source,
			/[^.]require\(/,
			'Axe source should not contain `require` variables'
		);
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
