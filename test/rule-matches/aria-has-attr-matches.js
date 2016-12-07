describe('aria-has-attr-matches', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var rule;

	beforeEach(function () {
		rule = axe._audit.rules.find(function (rule) {
			return rule.id === 'aria-valid-attr-value';
		});
	});

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('is a function', function () {
		assert.isFunction(rule.matches);
	});

	it('should return false if an element has no attributes', function () {
		var div = document.createElement('div');
		assert.isFalse(rule.matches(div));
	});
	it('should return false if an element has no ARIA attributes', function () {
		var div = document.createElement('div');
		div.id = 'monkeys';
		assert.isFalse(rule.matches(div));
	});
	it('should return true if an element has ARIA attributes', function () {
		var div = document.createElement('div');
		div.setAttribute('aria-bats', 'monkeys');
		assert.isTrue(rule.matches(div));
	});

});