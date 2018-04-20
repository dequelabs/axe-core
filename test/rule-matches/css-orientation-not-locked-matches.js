describe('css-orientation-not-locked-matches', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var rule;

	beforeEach(function () {
		rule = axe._audit.rules.find(function (rule) {
			return rule.id === 'css-orientation-not-locked';
		});
	});

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('is a function', function () {
		assert.isFunction(rule.matches);
	});

});