describe('p-as-heading-matches', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var rule;

	before(function () {
		rule = axe._audit.rules.find(function (rule) {
			return rule.id === 'p-as-heading';
		});
	});

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('is a function', function () {
		assert.isFunction(rule.matches);
	});

	it('returns true on a p element', function () {
		fixture.innerHTML = '<p id="target">some text</p><p>some other text</p>';
		var target = fixture.getElementById('target');

		assert.isTrue(rule.matches(target));
	});

	it('ignores the first p element in a list of children', function () {
		fixture.innerHTML = '<p id="target">some text</p><p>some other text</p>';
		var target = fixture.getElementById('target');

		assert.isFalse(rule.matches(target));
	});

	it('ignores p elements that contain punctuation marks', function () {
		fixture.innerHTML = '<p id="target">some text</p><p>some other text</p>';
		var target = fixture.getElementById('target');

		assert.isFalse(rule.matches(target));
	});

	it('ignores p elements that have no text-like characters', function () {
		fixture.innerHTML = '<p id="target">some text</p><p>some other text</p>';
		var target = fixture.getElementById('target');

		assert.isFalse(rule.matches(target));
	});

});