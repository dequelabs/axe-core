describe('xml-lang-mismatch', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var checkContext = axe.testUtils.MockCheckContext();

	afterEach(function () {
		fixture.innerHTML = '';
		checkContext.reset();
	});

	it('should return true if a valid lang attribute is supplied', function () {
		var node = document.createElement('p');
		node.setAttribute('lang', 'en');
		fixture.appendChild(node);
		assert.isTrue(checks['xml-lang-mismatch'].evaluate.call(checkContext, node, []));
	});

	it('should return true if a valid lang with region is supplied', function() {
		var node = document.createElement('p');
		node.setAttribute('lang', 'en-GB');
		fixture.appendChild(node);
		assert.isTrue(checks['xml-lang-mismatch'].evaluate.call(checkContext, node, []));
	});

	it('should return false if lang is undefined', function() {
		var node = document.createElement('p');
		node.setAttribute('lang', undefined);
		fixture.appendChild(node);
		assert.isFalse(checks['xml-lang-mismatch'].evaluate.call(checkContext, node, []));
	});

	it('should return true if lang and xml:lang is identical', function() {
		var node = document.createElement('p');
		node.setAttribute('lang', 'en-GB');
		node.setAttribute('xml:lang', 'en-GB');
		fixture.appendChild(node);
		assert.isTrue(checks['xml-lang-mismatch'].evaluate.call(checkContext, node, []));
	});

	it('should return true if lang and xml:lang have identical primary sub tag', function() {
		var node = document.createElement('p');
		node.setAttribute('lang', 'en');
		node.setAttribute('xml:lang', 'en-US');
		fixture.appendChild(node);
		assert.isTrue(checks['xml-lang-mismatch'].evaluate.call(checkContext, node, []));
	});

	it('should return false if lang and xml:lang are not identical', function() {
		var node = document.createElement('p');
		node.setAttribute('lang', 'en');
		node.setAttribute('xml:lang', 'fr');
		fixture.appendChild(node);
		assert.isFalse(checks['xml-lang-mismatch'].evaluate.call(checkContext, node));
	});

});
