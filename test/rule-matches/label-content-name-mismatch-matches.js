describe('label-content-name-mismatch-matches', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var rule;

	beforeEach(function() {
		rule = axe._audit.rules.find(function(rule) {
			return rule.id === 'label-content-name-mismatch';
		});
	});

	it('returns false if given element has no role (including fallback)', function() {
		// div has no fallback role
		fixture.innerHTML = '<div></div>';
		var target = fixture.querySelector('div');
		var actual = rule.matches(target);
		assert.isFalse(actual);
	});

	it('returns false if element role is not supported roles with name from contents', function() {
		// textbox is not a supported role with name from content
		fixture.innerHTML = '<textarea></textarea>';
		var target = fixture.querySelector('textarea');
		var actual = rule.matches(target);
		assert.isFalse(actual);
	});

	it('returns false if element does not have accessible name attribute (aria-label  or aria-labelledby)', function() {
		fixture.innerHTML = '<button name="link">The full label</button>';
		var target = fixture.querySelector('button');
		var actual = rule.matches(target);
		assert.isFalse(actual);
	});

	it('returns true if element has accessible name and supported role with name from contents', function() {
		fixture.innerHTML =
			'<button name="link" aria-label="The full">The full label</button>';
		var target = fixture.querySelector('button');
		var actual = rule.matches(target);
		assert.isTrue(actual);
	});

	it('returns false as for non-widget role', function() {
		fixture.innerHTML = '<a aria-label="OK">Next</a>';
		var target = fixture.querySelector('a');
		var actual = rule.matches(target);
		assert.isFalse(actual);
	});

	it('returns false for widget role that does not support name from content', function() {
		fixture.innerHTML =
			'<input type="email" aria-label="E-mail" value="Contact">';
		var target = fixture.querySelector('input');
		var actual = rule.matches(target);
		assert.isFalse(actual);
	});

	it('returns false for non-widget role that does support name from content', function() {
		fixture.innerHTML = '<div role="doc-chapter" aria-label="OK">Next</div>';
		var target = fixture.querySelector('div');
		var actual = rule.matches(target);
		assert.isFalse(actual);
	});

	it('returns true for non-widget role that does support name from content', function() {
		fixture.innerHTML = '<div role="tooltip" aria-label="OK">Next</div>';
		var target = fixture.querySelector('div');
		var actual = rule.matches(target);
		assert.isTrue(actual);
	});

	it('returns false for empty text content', function() {
		fixture.innerHTML = '<button aria-label="close"></button>';
		var target = fixture.querySelector('button');
		var actual = rule.matches(target);
		assert.isFalse(actual);
	});

	it('returns false non text content', function() {
		fixture.innerHTML =
			'<button aria-label="close"><i class="fa fa-icon-close"></i></button>';
		var target = fixture.querySelector('button');
		var actual = rule.matches(target);
		assert.isFalse(actual);
	});
});
