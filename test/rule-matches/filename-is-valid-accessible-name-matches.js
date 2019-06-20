describe('filename-is-valid-accessible-name-matches', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var queryFixture = axe.testUtils.queryFixture;
	var rule = axe._audit.rules.find(function(rule) {
		return rule.id === 'filename-is-valid-accessible-name';
	});

	afterEach(function() {
		fixture.innerHTML = '';
	});

	it('returns false when element does not have role=img', function() {
		var vNode = queryFixture('<img id="target" role="presentation" />');
		var actual = rule.matches(vNode.actualNode);
		assert.isFalse(actual);
	});

	it('returns false when element is hidden with `display:none`', function() {
		var vNode = queryFixture('<img id="target" style="display:none;" />');
		var actual = rule.matches(vNode.actualNode);
		assert.isFalse(actual);
	});

	it('returns false when element is hidden with `aria-hidden=true`', function() {
		var vNode = queryFixture('<img id="target" aria-hidden="true" />');
		var actual = rule.matches(vNode.actualNode);
		assert.isFalse(actual);
	});

	it('returns false when element has no accessible name', function() {
		var vNode = queryFixture(
			'<img id="target" src="https://www.w3.org/WAI/demos/bad/after/img/teaser_right2.jpg"/>'
		);
		var actual = rule.matches(vNode.actualNode);
		assert.isFalse(actual);
	});

	it('returns false when element has no `src` value', function() {
		var vNode = queryFixture('<img id="target" alt="image of tajmahal" />');
		var actual = rule.matches(vNode.actualNode);
		assert.isFalse(actual);
	});

	it('returns true when element has accessible name and `src` value', function() {
		var vNode = queryFixture(
			'<img id="target" src="https://www.w3.org/WAI/demos/bad/after/img/teaser_right2.jpg" alt="image of Eiffel tower" />'
		);
		var actual = rule.matches(vNode.actualNode);
		assert.isTrue(actual);
	});
});
