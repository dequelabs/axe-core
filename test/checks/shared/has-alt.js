describe('has-alt', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should return true if an alt is present', function () {
		var node = document.createElement('img');
		node.setAttribute('alt', 'woohoo');
		fixture.appendChild(node);

		assert.isTrue(checks['has-alt'].evaluate(node));
	});

	it('should return false if an alt is not present', function () {
		var node = document.createElement('img');
		fixture.appendChild(node);

		assert.isFalse(checks['has-alt'].evaluate(node));
	});

});