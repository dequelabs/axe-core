describe('aria.label', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var fixtureSetup = axe.testUtils.fixtureSetup;

	afterEach(function() {
		fixture.innerHTML = '';
		axe._tree = undefined;
	});

	describe('aria-labelledby', function() {
		it('should join text with a single space', function() {
			fixtureSetup('<div id="monkeys">monkeys</div><div id="bananas">bananas</div>' +
				'<input id="target" aria-labelledby="monkeys bananas">');
			var target = fixture.querySelector('#target');

			assert.equal(axe.commons.aria.label(target), 'monkeys bananas');
		});

		it('should filter invisible elements', function() {
			fixtureSetup('<div id="monkeys">monkeys</div><div id="bananas" style="display: none">bananas</div>' +
				'<input id="target" aria-labelledby="monkeys bananas">');
			var target = fixture.querySelector('#target');

			assert.equal(axe.commons.aria.label(target), 'monkeys');
		});

		it('should take precedence over aria-label', function() {
			fixtureSetup('<div id="monkeys">monkeys</div><div id="bananas">bananas</div>' +
				'<input id="target" aria-labelledby="monkeys bananas" aria-label="nope">');
			var target = fixture.querySelector('#target');

			assert.equal(axe.commons.aria.label(target), 'monkeys bananas');
		});

		it('should ignore whitespace only labels', function() {
			fixtureSetup('<div id="monkeys">	\n  </div><div id="bananas"></div>' +
				'<input id="target" aria-labelledby="monkeys bananas">');
			var target = fixture.querySelector('#target');

			assert.isNull(axe.commons.aria.label(target));
		});
	});

	describe('aria-label', function() {
		it('should detect it', function() {
			fixtureSetup('<input id="target" aria-label="monkeys">');
			var target = fixture.querySelector('#target');

			assert.equal(axe.commons.aria.label(target), 'monkeys');
		});

		it('should ignore whitespace only labels', function() {
			fixtureSetup('<input id="target" aria-label="   \n	">');
			var target = fixture.querySelector('#target');

			assert.isNull(axe.commons.aria.label(target));
		});
	});
});
