describe('aria-allowed-attr-matches', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var rule;

	beforeEach(function() {
		rule = axe._audit.rules.find(function(rule) {
			return rule.id === 'aria-allowed-attr';
		});
	});

	afterEach(function() {
		fixture.innerHTML = '';
	});

	it('is a function', function() {
		assert.isFunction(rule.matches);
	});

	it('should return true on elements that have aria attributes', function() {
		var div = document.createElement('div');
		div.setAttribute('role', 'button');
		div.setAttribute('aria-label', 'Thing 1');
		div.setAttribute('aria-mccheddarton', 'Unsupported thing 2');
		fixture.appendChild(div);

		assert.isTrue(rule.matches(div));
	});

	it('should return false on elements that have no aria attributes', function() {
		var div = document.createElement('div');
		div.setAttribute('role', 'button');
		fixture.appendChild(div);

		assert.isFalse(rule.matches(div));
	});
});
