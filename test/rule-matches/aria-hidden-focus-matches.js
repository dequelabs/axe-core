describe('aria-hidden-focus-matches', function() {
	'use strict';

	var rule;
	var fixtureSetup = axe.testUtils.fixtureSetup;

	beforeEach(function() {
		rule = axe._audit.rules.find(function(rule) {
			return rule.id === 'aria-hidden-focus';
		});
	});

	afterEach(function() {
		var fixture = document.getElementById('fixture');
		fixture.innerHTML = '';
	});

	it('is a function', function() {
		assert.isFunction(rule.matches);
	});

	it('return true when there is no parent with aria-hidden', function() {
		var fixture = fixtureSetup('<div id="target">' + '</div>');
		var node = fixture.querySelector('#target');
		var actual = rule.matches(node);
		assert.isTrue(actual);
	});

	it('return false when has a parent element with aria-hidden', function() {
		var fixture = fixtureSetup(
			'<div aria-hidden="true">' +
				'<div id="target" aria-hidden="true">' +
				'</div>' +
				'</div>'
		);
		var node = fixture.querySelector('#target');
		var actual = rule.matches(node);
		assert.isFalse(actual);
	});

	it('return false when has any parent element with aria-hidden', function() {
		var fixture = fixtureSetup(
			'<div aria-hidden="true">' +
				'<div>' +
				'<div id="target" aria-hidden="true">' +
				'</div>' +
				'</div>' +
				'</div>'
		);
		var node = fixture.querySelector('#target');
		var actual = rule.matches(node);
		assert.isFalse(actual);
	});

	it('return false when has any parent element with aria-hidden', function() {
		var fixture = fixtureSetup(
			'<div aria-hidden="true">' +
				'<div aria-hidden="true">' +
				'<button id="target">btn</button>' +
				'</div>' +
				'</div>'
		);
		var node = fixture.querySelector('#target');
		var actual = rule.matches(node);
		assert.isFalse(actual);
	});
});
