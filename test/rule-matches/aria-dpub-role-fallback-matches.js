describe('aria-dpub-role-fallback-matches', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var rule;

	beforeEach(function() {
		rule = axe._audit.rules.find(function(rule) {
			return rule.id === 'aria-dpub-role-fallback';
		});
	});

	afterEach(function() {
		fixture.innerHTML = '';
	});

	it('is a function', function() {
		assert.isFunction(rule.matches);
	});

	it('should not match elements with no role', function() {
		fixture.innerHTML = '<div></div>';
		var target = fixture.children[0];

		assert.isFalse(rule.matches(target));
	});

	it('should not match elements with a nonsensical role', function() {
		fixture.innerHTML = '<div role="yay"></div>';
		var target = fixture.children[0];

		assert.isFalse(rule.matches(target));
	});

	it('should not match elements with a non-DPUB role', function() {
		fixture.innerHTML = '<div role="main"></div>';
		var target = fixture.children[0];

		assert.isFalse(rule.matches(target));
	});

	it('should not match elements with a "harmless" DPUB role', function() {
		fixture.innerHTML = '<div role="doc-bibliography"></div>';
		var target = fixture.children[0];

		assert.isFalse(rule.matches(target));
	});

	it('should match elements with one of the targeted DPUB roles"', function() {
		fixture.innerHTML = '<div role="doc-backlink"></div>';
		var target = fixture.children[0];

		assert.isTrue(rule.matches(target));
	});
});
