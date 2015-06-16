describe('non-empty-alt', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should return true if an alt is present', function () {
		var node = document.createElement('img');
		node.setAttribute('alt', 'woohoo');
		fixture.appendChild(node);

		assert.isTrue(checks['non-empty-alt'].evaluate(node));
	});

	it('should return false if an alt is not present', function () {
		var node = document.createElement('img');
		fixture.appendChild(node);

		assert.isFalse(checks['non-empty-alt'].evaluate(node));
	});

	it('should return false if an alt is present, but empty', function () {
		var node = document.createElement('img');
		node.setAttribute('alt', ' ');
		fixture.appendChild(node);

		assert.isFalse(checks['non-empty-alt'].evaluate(node));
	});

	it('should collapse whitespace', function () {
		var node = document.createElement('div');
		node.setAttribute('alt', ' \t \n \r \t  \t\r\n ');
		fixture.appendChild(node);

		assert.isFalse(checks['non-empty-alt'].evaluate(node));

	});
});