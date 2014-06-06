describe('valid-lang', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should return true if a lang attribute is present in options', function () {
		var node = document.createElement('div');
		node.setAttribute('lang', 'woohoo');
		fixture.appendChild(node);

		assert.isTrue(checks['valid-lang'].evaluate(node, ['blah', 'blah', 'woohoo']));
	});

	it('should return false if a lang attribute is not present in options', function () {
		var node = document.createElement('div');
		node.setAttribute('lang', 'en-FOO');
		fixture.appendChild(node);

		assert.isFalse(checks['valid-lang'].evaluate(node, []));
	});

	it('should return false (and not throw) when given no options', function () {
		var node = document.createElement('div');
		node.setAttribute('lang', 'en-US');
		fixture.appendChild(node);

		assert.isFalse(checks['valid-lang'].evaluate(node));
	});

});