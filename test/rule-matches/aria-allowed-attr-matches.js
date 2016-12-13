describe('aria-allowed-attr-matches', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var rule;

	beforeEach(function () {
		rule = axe._audit.rules.find(function (rule) {
			return rule.id === 'aria-allowed-attr';
		});
	});

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('is a function', function () {
		assert.isFunction(rule.matches);
	});

	it('should return false on elements with no role or no implicit role', function () {
		var orig = axe.commons.aria.implicitRole;
		axe.commons.aria.implicitRole = function (nd) {
			assert.equal(nd, div);
			return null;
		};
		var div = document.createElement('div');
		fixture.appendChild(div);

		assert.isFalse(rule.matches(div));
		axe.commons.aria.implicitRole = orig;
	});

	it('should return false on elements that have no allowed attributes', function () {
		var orig = axe.commons.aria.allowedAttr;
		axe.commons.aria.allowedAttr = function (role) {
			assert.equal(role, 'button');
			return null;
		};
		var div = document.createElement('div');
		div.setAttribute('role', 'button');
		fixture.appendChild(div);

		assert.isFalse(rule.matches(div));
		axe.commons.aria.allowedAttr = orig;
	});

	it('should return false on elements that have a role but no aria attributes', function () {
		var div = document.createElement('div');
		div.setAttribute('role', 'button');
		fixture.appendChild(div);

		assert.isFalse(rule.matches(div));
	});


	it('should return true on elements that have a role', function () {
		var div = document.createElement('div');
		div.setAttribute('role', 'button');
		div.setAttribute('aria-cats', 'meow');
		fixture.appendChild(div);

		assert.isTrue(rule.matches(div));
	});

	it('should return true on elements that have an implicit role', function () {
		var div = document.createElement('a');
		div.setAttribute('href', '#monkeys');
		div.setAttribute('aria-cats', 'meow');
		fixture.appendChild(div);

		assert.isTrue(rule.matches(div));
	});

});