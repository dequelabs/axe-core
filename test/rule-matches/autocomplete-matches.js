describe('autocomplete-matches', function() {
	'use strict';
	var fixture = document.getElementById('fixture');
	var rule = axe._audit.rules.find(function(rule) {
		return rule.id === 'autocomplete-valid';
	});

	afterEach(function() {
		fixture.innerHTML = '';
	});

	it('is a function', function() {
		assert.isFunction(rule.matches);
	});

	it('returns true for input elements', function() {
		var elm = document.createElement('input');
		elm.setAttribute('autocomplete', 'foo');
		fixture.appendChild(elm);
		assert.isTrue(rule.matches(elm));
	});

	it('returns true for select elements', function() {
		var elm = document.createElement('select');
		elm.setAttribute('autocomplete', 'foo');
		fixture.appendChild(elm);
		assert.isTrue(rule.matches(elm));
	});

	it('returns true for textarea elements', function() {
		var elm = document.createElement('textarea');
		elm.setAttribute('autocomplete', 'foo');
		fixture.appendChild(elm);
		assert.isTrue(rule.matches(elm));
	});

	it('returns false for buttons elements', function() {
		var elm = document.createElement('button');
		elm.setAttribute('autocomplete', 'foo');
		fixture.appendChild(elm);
		assert.isFalse(rule.matches(elm));
	});

	it('should return false for non-form field elements', function() {
		var elm = document.createElement('div');
		elm.setAttribute('autocomplete', 'foo');
		fixture.appendChild(elm);
		assert.isFalse(rule.matches(elm));
	});

	it('returns false for input buttons', function() {
		['reset', 'submit', 'button'].forEach(function(type) {
			var elm = document.createElement('input');
			elm.setAttribute('autocomplete', 'foo');
			elm.type = type;
			fixture.appendChild(elm);
			assert.isFalse(rule.matches(elm));
		});
	});

	it('returns false for elements with an empty autocomplete', function() {
		var elm = document.createElement('input');
		elm.setAttribute('autocomplete', '  ');
		fixture.appendChild(elm);
		assert.isFalse(rule.matches(elm));
	});

	it('returns false for intput[type=hidden]', function() {
		var elm = document.createElement('input');
		elm.setAttribute('autocomplete', 'foo');
		elm.type = 'hidden';
		fixture.appendChild(elm);
		assert.isFalse(rule.matches(elm));
	});

	it('returns false for disabled fields', function() {
		['input', 'select', 'textarea'].forEach(function(tagName) {
			var elm = document.createElement(tagName);
			elm.setAttribute('autocomplete', 'foo');
			elm.disabled = true;
			fixture.appendChild(elm);
			assert.isFalse(rule.matches(elm));
		});
	});

	it('returns false for aria-disabled=true fields', function() {
		['input', 'select', 'textarea'].forEach(function(tagName) {
			var elm = document.createElement(tagName);
			elm.setAttribute('autocomplete', 'foo');
			elm.setAttribute('aria-disabled', 'true');
			fixture.appendChild(elm);
			assert.isFalse(rule.matches(elm));
		});
	});

	it('returns true for aria-disabled=false fields', function() {
		['input', 'select', 'textarea'].forEach(function(tagName) {
			var elm = document.createElement(tagName);
			elm.setAttribute('autocomplete', 'foo');
			elm.setAttribute('aria-disabled', 'false');
			fixture.appendChild(elm);
			assert.isTrue(rule.matches(elm));
		});
	});

	it('returns false for non-widget roles with tabindex=-1', function() {
		var nonWidgetRoles = ['application', 'fakerole', 'main'];
		nonWidgetRoles.forEach(function(role) {
			var elm = document.createElement('input');
			elm.setAttribute('autocomplete', 'foo');
			elm.setAttribute('role', role);
			elm.setAttribute('tabindex', '-1');
			fixture.appendChild(elm);
			assert.isFalse(
				rule.matches(elm),
				'Expect role=' + role + ' to be ignored when it has tabindex=-1'
			);
		});
	});

	it('returns true for form fields with a widget role with tabindex=-1', function() {
		var nonWidgetRoles = ['button', 'menuitem', 'slider'];
		nonWidgetRoles.forEach(function(role) {
			var elm = document.createElement('input');
			elm.setAttribute('autocomplete', 'foo');
			elm.setAttribute('role', role);
			elm.setAttribute('tabindex', '-1');
			fixture.appendChild(elm);
			assert.isTrue(rule.matches(elm));
		});
	});

	it('returns true for form fields with tabindex=-1', function() {
		['input', 'select', 'textarea'].forEach(function(tagName) {
			var elm = document.createElement(tagName);
			elm.setAttribute('autocomplete', 'foo');
			elm.setAttribute('tabindex', -1);
			fixture.appendChild(elm);
			assert.isTrue(rule.matches(elm));
		});
	});

	it('returns false for off screen and hidden form fields with tabindex=-1', function() {
		var elm = document.createElement('input');
		elm.setAttribute('autocomplete', 'foo');
		elm.setAttribute('tabindex', -1);
		elm.setAttribute('style', 'position:absolute; top:-9999em');

		parent = document.createElement('div');
		parent.appendChild(elm);
		parent.setAttribute('aria-hidden', 'true');

		fixture.appendChild(parent);
		assert.isFalse(rule.matches(elm));
	});
});
