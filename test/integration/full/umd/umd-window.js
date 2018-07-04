describe('UMD window', function() {
	'use strict';

	it('should expose axe as a property of window', function() {
		assert.property(window, 'axe');
	});

	it('should ensure axe has prototype chained keys', function() {
		assert.hasAnyKeys(axe, ['utils', 'commons', 'core']);
	});
});
