describe('applet-alt', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should return true if element got alt text and body text', function () {
		var node = document.createElement('applet');
		node.setAttribute('alt', 'woohoo');
		node.innerHTML = 'Some new text';
		fixture.appendChild(node);

		assert.isTrue(checks['applet-alt'].evaluate(node));
	});

	it('should return false if element got alt text and no body text', function () {
		var node = document.createElement('applet');
		node.setAttribute('alt', 'woohoo');
		node.innerHTML = ' ';
		fixture.appendChild(node);

		assert.isFalse(checks['applet-alt'].evaluate(node));
	});

	it('should return false if no alt label pressent', function () {
		var node = document.createElement('div');
		fixture.appendChild(node);

		assert.isFalse(checks['applet-alt'].evaluate(node));
	});

	it('should return false if an alt label got no text', function () {
		var node = document.createElement('div');
		node.setAttribute('alt', ' ');
		fixture.appendChild(node);

		assert.isFalse(checks['applet-alt'].evaluate(node));
	});
});
