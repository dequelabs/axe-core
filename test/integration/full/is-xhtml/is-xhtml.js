
describe('axe.utils.isXHTML', function () {
	'use strict';

	it('should return true on any document that is XHTML', function () {
		assert.isTrue(axe.utils.isXHTML(document));
	});

});
