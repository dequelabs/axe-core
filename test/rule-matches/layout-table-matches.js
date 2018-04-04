describe('layout-table-matches', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var rule;

	beforeEach(function () {
		rule = axe._audit.rules.find(function (rule) {
			return rule.id === 'layout-table';
		});
	});

	it('returns false for element that is not focusable and has presentation role', function () {
		fixture.innerHTML = '<table role="presentation"></table>';
		var target = fixture.querySelector('table');

		assert.isFalse(rule.matches(target));
	});

	it('returns false for element that is not focusable and has none role', function () {
		fixture.innerHTML = '<table role="none"></table>';
		var target = fixture.querySelector('table');

		assert.isFalse(rule.matches(target));
	});
});
