describe('layout-table-matches', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var fixtureSetup = axe.testUtils.fixtureSetup;
	var rule;

	beforeEach(function() {
		rule = axe._audit.rules.find(function(rule) {
			return rule.id === 'layout-table';
		});
	});

	afterEach(function() {
		fixture.innerHTML = '';
	});

	it('returns false for element that is not focusable and has presentation role', function() {
		fixtureSetup('<table role="presentation"></table>');
		var target = fixture.querySelector('table');

		assert.isFalse(rule.matches(target));
	});

	it('returns false for element that is not focusable and has none role', function() {
		fixtureSetup('<table role="none"></table>');
		var target = fixture.querySelector('table');

		assert.isFalse(rule.matches(target));
	});

	it('returns trie for element that is a table without presentation/none role', function() {
		fixtureSetup('<table></table>');
		var target = fixture.querySelector('table');

		assert.isTrue(rule.matches(target));
	});

	it('returns true for element that is focusable and has none role', function() {
		fixtureSetup('<table role="none" tabindex="0"></table>');
		var target = fixture.querySelector('table');

		assert.isTrue(rule.matches(target));
	});

	it('returns true for element that is focusable and has presentation role', function() {
		fixtureSetup('<table role="presentation" tabindex="0"></table>');
		var target = fixture.querySelector('table');

		assert.isTrue(rule.matches(target));
	});
});
