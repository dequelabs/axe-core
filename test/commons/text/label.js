describe('text.label', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	afterEach(function () {
		fixture.innerHTML = '';
	});

	describe('aria-labelledby', function () {
		it('should join text with a single space', function () {
			fixture.innerHTML = '<div id="monkeys">monkeys</div><div id="bananas">bananas</div>' +
				'<input id="target" aria-labelledby="monkeys bananas">';

			var target = document.getElementById('target');
			assert.equal(axe.commons.text.label(target), 'monkeys bananas');
		});

		it('should filter invisible elements', function () {
			fixture.innerHTML = '<div id="monkeys">monkeys</div><div id="bananas" style="display: none">bananas</div>' +
				'<input id="target" aria-labelledby="monkeys bananas">';

			var target = document.getElementById('target');
			assert.equal(axe.commons.text.label(target), 'monkeys');
		});

		it('should take precedence over aria-label', function () {
			fixture.innerHTML = '<div id="monkeys">monkeys</div><div id="bananas">bananas</div>' +
				'<input id="target" aria-labelledby="monkeys bananas" aria-label="nope">';

			var target = document.getElementById('target');
			assert.equal(axe.commons.text.label(target), 'monkeys bananas');
		});

		it('should take precedence over explicit labels', function () {
			fixture.innerHTML = '<div id="monkeys">monkeys</div><div id="bananas">bananas</div>' +
				'<label for="target">nope</label>' +
				'<input id="target" aria-labelledby="monkeys bananas">';

			var target = document.getElementById('target');
			assert.equal(axe.commons.text.label(target), 'monkeys bananas');
		});

		it('should take precedence over implicit labels', function () {
			fixture.innerHTML = '<div id="monkeys">monkeys</div><div id="bananas">bananas</div>' +
				'<label>nope' +
				'<input id="target" aria-labelledby="monkeys bananas"></label>';

			var target = document.getElementById('target');
			assert.equal(axe.commons.text.label(target), 'monkeys bananas');
		});

		it('should ignore whitespace only labels', function () {
			fixture.innerHTML = '<div id="monkeys">	\n  </div><div id="bananas"></div>' +
				'<input id="target" aria-labelledby="monkeys bananas">';

			var target = document.getElementById('target');
			assert.isNull(axe.commons.text.label(target));
		});
	});

	describe('aria-label', function () {
		it('should detect it', function () {
			fixture.innerHTML = '<input id="target" aria-label="monkeys">';

			var target = document.getElementById('target');
			assert.equal(axe.commons.text.label(target), 'monkeys');
		});

		it('should ignore whitespace only labels', function () {
			fixture.innerHTML = '<input id="target" aria-label="   \n	">';

			var target = document.getElementById('target');
			assert.isNull(axe.commons.text.label(target));
		});

		it('should take precedence over explicit labels', function () {
			fixture.innerHTML = '<label for="target">nope</label>' +
				'<input id="target" aria-label="monkeys">';

			var target = document.getElementById('target');
			assert.equal(axe.commons.text.label(target), 'monkeys');
		});

		it('should take precedence over implicit labels', function () {
			fixture.innerHTML = '<label>nope' +
				'<input id="target" aria-label="monkeys"></label>';

			var target = document.getElementById('target');
			assert.equal(axe.commons.text.label(target), 'monkeys');
		});
	});

	describe('explicit label', function () {
		it('should detect it', function () {
			fixture.innerHTML = '<label for="target">monkeys</label>' +
				'<input id="target">';

			var target = document.getElementById('target');
			assert.equal(axe.commons.text.label(target), 'monkeys');
		});

		it('should ignore whitespace only or empty labels', function () {
			fixture.innerHTML = '<label for="target">	\n\r  </label>' +
				'<input id="target">';

			var target = document.getElementById('target');
			assert.isNull(axe.commons.text.label(target));
		});

		it('should take precedence over implicit labels', function () {
			fixture.innerHTML = '<label for="target">monkeys</label>' +
				'<label>nope' +
				'<input id="target"></label>';

			var target = document.getElementById('target');
			assert.equal(axe.commons.text.label(target), 'monkeys');

		});
	});

	describe('implicit label', function () {
		it('should detect it', function () {
			fixture.innerHTML = '<label>monkeys' +
				'<input id="target"><label>';

			var target = document.getElementById('target');
			assert.equal(axe.commons.text.label(target), 'monkeys');
		});

		it('should ignore whitespace only or empty labels', function () {
			fixture.innerHTML = '<label> ' +
				'<input id="target"><label>';

			var target = document.getElementById('target');
			assert.isNull(axe.commons.text.label(target));
		});
	});
});
