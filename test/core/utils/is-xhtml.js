describe('axe.utils.isXHTML', function () {
	'use strict';

	it('should be a function', function () {
		assert.isFunction(axe.utils.isXHTML);
	});

	it('should return true on any document that is XHTML', function () {
		var doc = document.implementation.createDocument('http://www.w3.org/1999/xhtml', 'html', null);
		assert.isTrue(axe.utils.isXHTML(doc));
	});

	it('should return false on any document that is HTML', function () {
		var doc = document.implementation.createHTMLDocument('Monkeys');
		assert.isFalse(axe.utils.isXHTML(doc));
	});

	it('should return false on any document that is HTML - fixture', function () {
		assert.isFalse(axe.utils.isXHTML(document));
	});
});
