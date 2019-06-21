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

	it('returns false when <div> element has no implicit role', function() {
		var vNode = queryFixture('<div id="target">Some content</div>');
		var actual = rule.matches(vNode.actualNode);
		assert.isFalse(actual);
	});

	it('returns false when <input> element has no role !== link', function() {
		var vNode = queryFixture('<input type="text" id="target" role="textbox">');
		var actual = rule.matches(vNode.actualNode);
		assert.isFalse(actual);
	});

	it('returns false when <a> element no href attribute', function() {
		var vNode = queryFixture('<a id="target">Go to google.com</a>');
		var actual = rule.matches(vNode.actualNode);
		assert.isFalse(actual);
	});

	it('returns true when <a> element no href attribute but has role === link', function() {
		var vNode = queryFixture('<a id="target" role="link">Go to google.com</a>');
		var actual = rule.matches(vNode.actualNode);
		assert.isTrue(actual);
	});

	it('returns true when <a> element has href attribute (implicit role === link)', function() {
		var vNode = queryFixture(
			'<a id="target" href="https://google.com">Go to google.com</a>'
		);
		var actual = rule.matches(vNode.actualNode);
		assert.isTrue(actual);
	});

	it('returns false when <a> element has href attribute but no accessible name', function() {
		var vNode = queryFixture('<a id="target" href="https://google.com"></a>');
		var actual = rule.matches(vNode.actualNode);
		assert.isFalse(actual);
	});

	it('returns false when <area> element has no href attribute', function() {
		var vNode = queryFixture(
			'<map><area id="target" role="link" shape="circle" coords="130,136,60" alt="MDN" /></map>'
		);
		var actual = rule.matches(vNode.actualNode);
		assert.isFalse(actual);
	});

	it('returns false when <area> element has href attribute but no accessible name', function() {
		var vNode = queryFixture(
			'<map><area id="target" role="link" href="https://developer.mozilla.org/" shape="circle" coords="130,136,60"/></map>'
		);
		var actual = rule.matches(vNode.actualNode);
		assert.isFalse(actual);
	});

	it('returns true when <a> element has href attribute and an accessible name', function() {
		var vNode = queryFixture(
			'<a id="target" role="link" href="https://developer.mozilla.org/" aria-label="Go to MDN website"></a>'
		);
		var actual = rule.matches(vNode.actualNode);
		assert.isTrue(actual);
	});
});
