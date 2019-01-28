describe('label-content-name-mismatch-matches tests', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var fixtureSetup = axe.testUtils.fixtureSetup;
	var rule = axe._audit.rules.find(function(rule) {
		return rule.id === 'label-content-name-mismatch';
	});

	afterEach(function() {
		fixture.innerHTML = '';
		axe._tree = undefined;
	});

	it('returns false if given element has no role', function() {
		var target = fixtureSetup('<div></div>', 'div');
		var actual = rule.matches(target);
		assert.isFalse(actual);
	});

	it('returns false of element role is not supported with name from contents', function() {
		var target = fixtureSetup('<textarea></textarea>', 'textarea');
		var actual = rule.matches(target);
		assert.isFalse(actual);
	});

	it('returns false if element does not have accessible name attributes (`aria-label` or `aria-labelledby`)', function() {
		var target = fixtureSetup(
			'<button name="link">Until the very end.</button>',
			'button'
		);
		var actual = rule.matches(target);
		assert.isFalse(actual);
	});

	it('returns true if element has accessible name (`aria-label`)', function() {
		var target = fixtureSetup(
			'<button name="link" aria-label="Until">Until the very end.</button>',
			'button'
		);
		var actual = rule.matches(target);
		assert.isTrue(actual);
	});

	it('returns false if element has empty accessible name (`aria-label`)', function() {
		var target = fixtureSetup(
			'<button name="link" aria-label="">Until the very end.</button>',
			'button'
		);
		var actual = rule.matches(target);
		assert.isFalse(actual);
	});

	it('returns true if element has accessible name (`aria-labelledby`)', function() {
		var target = fixtureSetup(
			'<div role="button" id="target" aria-labelledby="foo">some content</div>' +
				'<div id="foo">Foo text</div>',
			'div#target'
		);
		var actual = rule.matches(target);
		assert.isTrue(actual);
	});

	it('returns false if element has empty accessible name (`aria-labelledby`)', function() {
		var target = fixtureSetup(
			'<div role="button" id="target" aria-labelledby="foo">some content</div>' +
				'<div id="foo"></div>',
			'div#target'
		);
		var actual = rule.matches(target);
		assert.isFalse(actual);
	});

	it('returns false if element has empty accessible name (`aria-labelledby`) because idref does not exist', function() {
		var target = fixtureSetup(
			'<div role="button" id="target" aria-labelledby="doesNotExist">some content</div>' +
				'<div id="idExists">Right Label</div>',
			'div#target'
		);
		var actual = rule.matches(target);
		assert.isFalse(actual);
	});

	it('returns true if element has accessible name (`aria-labelledby`) - multiple refs', function() {
		var target = fixtureSetup(
			'<div role="button" id="target" aria-labelledby="bar baz foo">some content</div>' +
				'<div id="foo">Foo</div>' +
				'<div id="bar">Bar</div>' +
				'<div id="baz">Baz</div>',
			'div#target'
		);
		var actual = rule.matches(target);
		assert.isTrue(actual);
	});

	it('returns false for `non-widget` role', function() {
		var target = fixtureSetup('<a aria-label="OK">Next</a>', 'a');
		var actual = rule.matches(target);
		assert.isFalse(actual);
	});

	it('returns false for widget role that does not support name from content', function() {
		var target = fixtureSetup(
			'<input type="email" aria-label="E-mail" value="Contact">',
			'input'
		);
		var actual = rule.matches(target);
		assert.isFalse(actual);
	});

	it('returns false for non-widget role that does support name from content', function() {
		var target = fixtureSetup(
			'<div role="doc-chapter" aria-label="OK">Next</div>',
			'div'
		);
		var actual = rule.matches(target);
		assert.isFalse(actual);
	});

	it('returns true for non-widget role that does support name from content', function() {
		var target = fixtureSetup(
			'<div role="tooltip" aria-label="OK">Next</div>',
			'div'
		);
		var actual = rule.matches(target);
		assert.isTrue(actual);
	});

	it('returns false for empty text content', function() {
		var target = fixtureSetup('<button aria-label="close"></button>', 'button');
		var actual = rule.matches(target);
		assert.isFalse(actual);
	});

	it('returns false for non text content', function() {
		var target = fixtureSetup(
			'<button aria-label="close"><i class="fa fa-icon-close"></i></button>',
			'button'
		);
		var actual = rule.matches(target);
		assert.isFalse(actual);
	});

	it('returns false for hidden (non visible) text content', function() {
		var target = fixtureSetup(
			'<button aria-label="close"><span style="display:none"></span></button>',
			'button'
		);
		var actual = rule.matches(target);
		assert.isFalse(actual);
	});

	it('returns false for unicode text content', function() {
		var target = fixtureSetup(
			'<button aria-label="close">&#10060;</button>',
			'button'
		);
		var actual = rule.matches(target);
		assert.isFalse(actual);
	});

	it('returns false for unicode emoji as accessible name and text content', function() {
		var target = fixtureSetup(
			'<button aria-label="&#x1F354">&#x1F354</button>',
			'button'
		);
		var actual = rule.matches(target);
		assert.isFalse(actual);
	});
});
