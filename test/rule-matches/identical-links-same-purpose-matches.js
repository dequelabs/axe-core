describe('identical-links-same-purpose-matches tests', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var queryFixture = axe.testUtils.queryFixture;
	var rule = axe._audit.rules.find(function(rule) {
		return rule.id === 'identical-links-same-purpose';
	});

	afterEach(function() {
		fixture.innerHTML = '';
		axe._tree = undefined;
	});

	it('returns false for native links without accessible name', function() {
		var vNode = queryFixture('<a id="target" href=""></a>');
		var actual = rule.matches(vNode.actualNode, vNode);
		assert.isFalse(actual);
	});

	it('returns false for native links with a role !== link and an accessible name', function() {
		var vNode = queryFixture(
			'<a id="target" href="#" role="button">Go to Checkout</a>'
		);
		var actual = rule.matches(vNode.actualNode, vNode);
		assert.isFalse(actual);
	});

	it('returns false for ARIA links without accessible name', function() {
		var vNode = queryFixture('<span role="link" id="target"></span>');
		var actual = rule.matches(vNode.actualNode, vNode);
		assert.isFalse(actual);
	});

	it('returns false when native links (without href) has role === link and accessible name', function() {
		var vNode = queryFixture('<a id="target" role="link"></a>');
		var actual = rule.matches(vNode.actualNode, vNode);
		assert.isFalse(actual);
	});

	it('returns true when ARIA links has accessible name ', function() {
		var vNode = queryFixture(
			'<map><area id="target" role="link" shape="circle" coords="130,136,60" aria-label="MDN" /></map>'
		);
		var actual = rule.matches(vNode.actualNode, vNode);
		assert.isTrue(actual);
	});

	it('returns true when native links has both HREF and an accessible name', function() {
		var vNode = queryFixture(
			'<a id="target" href="https://developer.mozilla.org/" aria-label="Go to MDN website"></a>'
		);
		var actual = rule.matches(vNode.actualNode, vNode);
		assert.isTrue(actual);
	});
});
