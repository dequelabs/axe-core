describe('xml-lang-mismatch', function() {
	'use strict';

	var node;
	var fixture = document.getElementById('fixture');
	var checkContext = axe.testUtils.MockCheckContext();

	beforeEach(function() {
		// using a div element (instead of html), as the check is agnostic of element type
		node = document.createElement('div');
	});

	afterEach(function() {
		fixture.innerHTML = '';
		checkContext.reset();
	});

	// the rule matches filters out node of type HTML, and tests cover this scenario to ensure other elements are not allowed for this check
	// hence below tests are only for HTML element, although the logic in the check looks for matches in value os lang and xml:lang
	// rather than node type match - hence the check can be re-used.

	it('should return false if a only lang is supplied', function() {
		node.setAttribute('lang', 'en');
		fixture.appendChild(node);
		assert.isFalse(
			checks['xml-lang-mismatch'].evaluate.call(checkContext, node)
		);
	});

	it('should return false if a only xml:lang is supplied albeit with region', function() {
		node.setAttribute('xml:lang', 'fr-FR');
		fixture.appendChild(node);
		assert.isFalse(
			checks['xml-lang-mismatch'].evaluate.call(checkContext, node)
		);
	});

	it('should return false if lang is undefined', function() {
		node.setAttribute('lang', undefined);
		fixture.appendChild(node);
		assert.isFalse(
			checks['xml-lang-mismatch'].evaluate.call(checkContext, node)
		);
	});

	it('should return true if lang and xml:lang is identical', function() {
		node.setAttribute('lang', 'en-GB');
		node.setAttribute('xml:lang', 'en-GB');
		fixture.appendChild(node);
		assert.isTrue(
			checks['xml-lang-mismatch'].evaluate.call(checkContext, node)
		);
	});

	it('should return true if lang and xml:lang have identical primary sub tag', function() {
		node.setAttribute('lang', 'en-GB');
		node.setAttribute('xml:lang', 'en-US');
		fixture.appendChild(node);
		assert.isTrue(
			checks['xml-lang-mismatch'].evaluate.call(checkContext, node)
		);
	});

	it('should return false if lang and xml:lang are not identical', function() {
		node.setAttribute('lang', 'en');
		node.setAttribute('xml:lang', 'fr-FR');
		fixture.appendChild(node);
		var actual = checks['xml-lang-mismatch'].evaluate.call(checkContext, node);
		assert.isFalse(actual);
	});
});
