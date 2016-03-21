describe('aria.label', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	afterEach(function() {
		fixture.innerHTML = '';
	});

	describe('aria-labelledby', function() {
		it('should join text with a single space', function() {
			fixture.innerHTML = '<div id="monkeys">monkeys</div><div id="bananas">bananas</div>' +
				'<input id="target" aria-labelledby="monkeys bananas">';

			var target = document.getElementById('target');
			assert.equal(axe.commons.text.label(target), 'monkeys bananas');
		});

		it('should filter invisible elements', function() {
			fixture.innerHTML = '<div id="monkeys">monkeys</div><div id="bananas" style="display: none">bananas</div>' +
				'<input id="target" aria-labelledby="monkeys bananas">';

			var target = document.getElementById('target');
			assert.equal(axe.commons.text.label(target), 'monkeys');
		});

		it('should take precedence over aria-label', function() {
			fixture.innerHTML = '<div id="monkeys">monkeys</div><div id="bananas">bananas</div>' +
				'<input id="target" aria-labelledby="monkeys bananas" aria-label="nope">';

			var target = document.getElementById('target');
			assert.equal(axe.commons.text.label(target), 'monkeys bananas');
		});

		it('should ignore whitespace only labels', function() {
			fixture.innerHTML = '<div id="monkeys">	\n  </div><div id="bananas"></div>' +
				'<input id="target" aria-labelledby="monkeys bananas">';

			var target = document.getElementById('target');
			assert.isNull(axe.commons.text.label(target));
		});
	});

	describe('aria-label', function() {
		it('should detect it', function() {
			fixture.innerHTML = '<input id="target" aria-label="monkeys">';

			var target = document.getElementById('target');
			assert.equal(axe.commons.text.label(target), 'monkeys');
		});

		it('should ignore whitespace only labels', function() {
			fixture.innerHTML = '<input id="target" aria-label="   \n	">';

			var target = document.getElementById('target');
			assert.isNull(axe.commons.text.label(target));
		});
	});
});
