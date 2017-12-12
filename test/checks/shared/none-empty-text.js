describe('none-empty-text', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should return true if element got text', function () {
		var node = document.createElement('applet');
		node.innerHTML = 'I gotz text';
		fixture.appendChild(node);

		assert.isTrue(checks['none-empty-text'].evaluate(node));
	});

	it('should return false if an element got no text', function () {
		var node = document.createElement('div');
		fixture.appendChild(node);

		assert.isFalse(checks['none-empty-text'].evaluate(node));
	});
});
