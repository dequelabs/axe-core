describe('aria-allowed-role-matches', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var rule;

	beforeEach(function() {
		rule = axe._audit.rules.find(function(rule) {
			return rule.id === 'aria-allowed-role';
		});
	});

	afterEach(function() {
		fixture.innerHTML = '';
	});

	it('is a function', function() {
		assert.isFunction(rule.matches);
	});

	it('return false (no matches) for a <link> with a href to have any invalid role', function() {
		var node = document.createElement('link');
		node.setAttribute('role', 'invalid-role');
		node.href = '\\example.com';
		fixture.appendChild(node);
		assert.isFalse(rule.matches(node));
	});

	it('return true for input with redundant role', function() {
		var node = document.createElement('input');
		node.setAttribute('type', 'text');
		node.setAttribute('role', 'textbox');
		node.href = '\\example.com';
		fixture.appendChild(node);
		assert.isTrue(rule.matches(node));
	});

	it('return true for element with valid role', function() {
		var node = document.createElement('ol');
		node.setAttribute('role', 'listbox');
		node.href = '\\example.com';
		fixture.appendChild(node);
		assert.isTrue(rule.matches(node));
	});
});
