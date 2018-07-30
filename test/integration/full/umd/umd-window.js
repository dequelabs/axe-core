describe('UMD window', function() {
	'use strict';

	it('should expose axe as a property of window', function() {
		assert.property(window, 'axe');
	});

	it('should ensure axe has prototype chained keys', function() {
		assert.hasAnyKeys(axe, ['utils', 'commons', 'core']);
	});

	it('should expose not expose axios as a property of window', function() {
		assert.notProperty(window, 'axios');
	});

	it('should ensure axios is a mounted to axe.imports', function() {
		assert.hasAnyKeys(axe.imports, ['axios']);
	});

	it('should ensure axios has prototype chained keys', function() {
		assert.hasAnyKeys(axe.imports.axios, ['get', 'request', 'options', 'post']);
	});
});
