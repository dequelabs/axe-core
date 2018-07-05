describe('UMD window', function() {
	'use strict';

	it('should expose axe as a property of window', function() {
		assert.property(window, 'axe');
	});

	it('should ensure axe has prototype chained keys', function() {
		assert.hasAnyKeys(window.axe, ['utils', 'commons', 'core']);
	});

	it('should expose axios as a property of window', function() {
		assert.property(window, 'axios');
	});

	it('should ensure axios has prototype chained keys', function() {
		assert.hasAnyKeys(window.axios, ['get', 'request', 'options', 'post']);
	});
});
