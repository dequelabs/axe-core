describe('skip-link-matches', function() {
	'use strict';

	var rule, link;
	var fixture = document.getElementById('fixture');

	beforeEach(function() {
		rule = axe._audit.rules.find(function(rule) {
			return rule.id === 'skip-link';
		});
		link = document.createElement('a');
	});

	afterEach(function() {
		fixture.innerHTML = '';
	});

	it('is a function', function() {
		assert.isFunction(rule.matches);
	});

	it('returns false if the href attribute does not start with #', function() {
		link.href = 'foo#bar';
		assert.isFalse(rule.matches(link));
	});

	it('returns false if the href attribute is `#`', function() {
		link.href = '#';
		assert.isFalse(rule.matches(link));
	});

	it('returns true if the href attribute starts with #', function() {
		link.href = '#foo';
		assert.isTrue(rule.matches(link));
	});

	it('returns false if the href attribute starts with #!', function() {
		link.href = '#!foo';
		assert.isFalse(rule.matches(link));
	});

	it('returns false if the href attribute starts with #/', function() {
		link.href = '#/foo';
		assert.isFalse(rule.matches(link));
	});
});
