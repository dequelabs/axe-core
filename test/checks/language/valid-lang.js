describe('valid-lang', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	var checkContext = {
		_data: null,
		data: function (data) {
			this._data = data;
		}
	};

	afterEach(function () {
		fixture.innerHTML = '';
		checkContext._data = null;
	});

	describe('lang', function () {

		it('should return false if a lang attribute is present in options', function () {
			var node = document.createElement('div');
			node.setAttribute('lang', 'woohoo');
			fixture.appendChild(node);

			assert.isFalse(checks['valid-lang'].evaluate.call(checkContext, node, ['blah', 'blah', 'woohoo']));
		});

		it('should lowercase options and attribute first', function () {
			var node = document.createElement('div');
			node.setAttribute('lang', 'wooHOo');
			fixture.appendChild(node);

			assert.isFalse(checks['valid-lang'].evaluate.call(checkContext, node, ['blah', 'blah', 'wOohoo']));

		});

		it('should return true if a lang attribute is not present in options', function () {
			var node = document.createElement('div');
			node.setAttribute('lang', 'en-FOO');
			fixture.appendChild(node);

			assert.isTrue(checks['valid-lang'].evaluate.call(checkContext, node, []));
			assert.deepEqual(checkContext._data, ['lang="en-FOO"']);
		});

		it('should return true (and not throw) when given no options', function () {
			var node = document.createElement('div');
			node.setAttribute('lang', 'en-US');
			fixture.appendChild(node);

			assert.isTrue(checks['valid-lang'].evaluate.call(checkContext, node));
			assert.deepEqual(checkContext._data, ['lang="en-US"']);
		});

		it('should return true if the language is badly formatted', function () {
			var node = document.createElement('div');
			node.setAttribute('lang', 'en_US');
			fixture.appendChild(node);

			assert.isTrue(checks['valid-lang'].evaluate.call(checkContext, node, ['en']));
			assert.deepEqual(checkContext._data, ['lang="en_US"']);

		});

		it('should return false if it matches a substring proceeded by -', function () {
			var node = document.createElement('div');
			node.setAttribute('lang', 'en-LOL');
			fixture.appendChild(node);

			assert.isFalse(checks['valid-lang'].evaluate.call(checkContext, node, ['en']));

		});

	});

	describe('xml:lang', function () {

		it('should return false if a lang attribute is present in options', function () {
			var node = document.createElement('div');
			node.setAttribute('xml:lang', 'woohoo');
			fixture.appendChild(node);

			assert.isFalse(checks['valid-lang'].evaluate.call(checkContext, node, ['blah', 'blah', 'woohoo']));
		});

		it('should lowercase options and attribute first', function () {
			var node = document.createElement('div');
			node.setAttribute('xml:lang', 'wooHOo');
			fixture.appendChild(node);

			assert.isFalse(checks['valid-lang'].evaluate.call(checkContext, node, ['blah', 'blah', 'wOohoo']));

		});

		it('should return true if a lang attribute is not present in options', function () {
			var node = document.createElement('div');
			node.setAttribute('xml:lang', 'en-FOO');
			fixture.appendChild(node);

			assert.isTrue(checks['valid-lang'].evaluate.call(checkContext, node, []));
			assert.deepEqual(checkContext._data, ['xml:lang="en-FOO"']);
		});

		it('should return true (and not throw) when given no options', function () {
			var node = document.createElement('div');
			node.setAttribute('xml:lang', 'en-US');
			fixture.appendChild(node);

			assert.isTrue(checks['valid-lang'].evaluate.call(checkContext, node));
			assert.deepEqual(checkContext._data, ['xml:lang="en-US"']);
		});

		it('should return true if the language is badly formatted', function () {
			var node = document.createElement('div');
			node.setAttribute('xml:lang', 'en_US');
			fixture.appendChild(node);

			assert.isTrue(checks['valid-lang'].evaluate.call(checkContext, node, ['en']));
			assert.deepEqual(checkContext._data, ['xml:lang="en_US"']);

		});

		it('should return false if it matches a substring proceeded by -', function () {
			var node = document.createElement('div');
			node.setAttribute('xml:lang', 'en-LOL');
			fixture.appendChild(node);

			assert.isFalse(checks['valid-lang'].evaluate.call(checkContext, node, ['en']));

		});

	});

});