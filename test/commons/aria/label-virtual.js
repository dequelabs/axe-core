describe('aria.labelVirtual', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var fixtureSetup = axe.testUtils.fixtureSetup;

	afterEach(function() {
		fixture.innerHTML = '';
		axe._tree = undefined;
	});

	it('is called through aria.label with a DOM node', function () {
		fixtureSetup('<div id="monkeys">monkeys</div><div id="bananas">bananas</div>' +
			'<input id="target" aria-labelledby="monkeys bananas">');
		var target = fixture.querySelector('#target');

		assert.equal(axe.commons.aria.label(target), 'monkeys bananas');
	});

	describe('aria-labelledby', function() {
		it('should join text with a single space', function() {
			fixtureSetup('<div id="monkeys">monkeys</div><div id="bananas">bananas</div>' +
				'<input id="target" aria-labelledby="monkeys bananas">');
			var target = axe.utils.querySelectorAll(axe._tree[0], '#target')[0];

			assert.equal(axe.commons.aria.labelVirtual(target), 'monkeys bananas');
		});

		it('should filter invisible elements', function() {
			fixtureSetup('<div id="monkeys">monkeys</div><div id="bananas" style="display: none">bananas</div>' +
				'<input id="target" aria-labelledby="monkeys bananas">');
			var target = axe.utils.querySelectorAll(axe._tree[0], '#target')[0];

			assert.equal(axe.commons.aria.labelVirtual(target), 'monkeys');
		});

		it('should take precedence over aria-label', function() {
			fixtureSetup('<div id="monkeys">monkeys</div><div id="bananas">bananas</div>' +
				'<input id="target" aria-labelledby="monkeys bananas" aria-label="nope">');
			var target = axe.utils.querySelectorAll(axe._tree[0], '#target')[0];

			assert.equal(axe.commons.aria.labelVirtual(target), 'monkeys bananas');
		});

		it('should ignore whitespace only labels', function() {
			fixtureSetup('<div id="monkeys">	\n  </div><div id="bananas"></div>' +
				'<input id="target" aria-labelledby="monkeys bananas">');
			var target = axe.utils.querySelectorAll(axe._tree[0], '#target')[0];

			assert.isNull(axe.commons.aria.labelVirtual(target));
		});
	});

	describe('aria-label', function() {
		it('should detect it', function() {
			fixtureSetup('<input id="target" aria-label="monkeys">');
			var target = axe.utils.querySelectorAll(axe._tree[0], '#target')[0];

			assert.equal(axe.commons.aria.labelVirtual(target), 'monkeys');
		});

		it('should ignore whitespace only labels', function() {
			fixtureSetup('<input id="target" aria-label="   \n	">');
			var target = axe.utils.querySelectorAll(axe._tree[0], '#target')[0];

			assert.isNull(axe.commons.aria.labelVirtual(target));
		});
	});
});
