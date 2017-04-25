describe('p-as-heading-matches', function () {
	'use strict';

	var rule;
	var fixture = document.getElementById('fixture');

	beforeEach(function () {
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

	it('matches p elements', function () {
		fixture.innerHTML = '<p id="target">some text</p><p>some other text</p>';
		var target = fixture.querySelector('#target');

		assert.isTrue(rule.matches(target));
	});

	it('ignores the last p element in a list of children', function () {
		fixture.innerHTML = '<p>some text</p><p id="target">some other text</p>';
		var target = fixture.querySelector('#target');

		assert.isFalse(rule.matches(target));
	});

	it('ignores p elements that contains punctuation marks', function () {
		fixture.innerHTML = '<p id="target">A text. Paragraph?</p><p>some other text</p>';
		var target = fixture.querySelector('#target');

		assert.isFalse(rule.matches(target));
	});

	it('matches p elements with a single punctuation mark', function () {
		fixture.innerHTML = '<p id="target">A paragraph?</p><p>some other text</p>';
		var target = fixture.querySelector('#target');

		assert.isTrue(rule.matches(target));
	});

	it('ignores p elements that have no text-like characters', function () {
		fixture.innerHTML = '<p id="target"> \n\t\r </p><p>some other text</p>';
		var target = fixture.querySelector('#target');

		assert.isFalse(rule.matches(target));
	});

	it('ignores siblings that are not p elements', function () {
		fixture.innerHTML = '<p id="target">some text</p><div></div><p>some other text</p>';
		var target = fixture.querySelector('#target');

		assert.isTrue(rule.matches(target));

		fixture.innerHTML = '<p id="target">some text</p><div></div>';
		target = fixture.querySelector('#target');

		assert.isFalse(rule.matches(target));
	});

	it('ignores empty p elements as siblings', function () {
		fixture.innerHTML = '<p id="target">some text</p><p> <!-- nothing here --><img src="" alt="" /></p>';
		var target = fixture.querySelector('#target');

		assert.isFalse(rule.matches(target));
	});

});