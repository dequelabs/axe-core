describe('aria-label', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should return true if an aria-label is present', function () {
		var node = document.createElement('div');
		node.setAttribute('aria-label', 'woohoo');
		fixture.appendChild(node);

		assert.isTrue(checks['aria-label'].evaluate(node));
	});

	it('should return false if an aria-label is not present', function () {
		var node = document.createElement('div');
		fixture.appendChild(node);

		assert.isFalse(checks['aria-label'].evaluate(node));
	});

	it('should return false if an aria-label is present, but empty', function () {
		var node = document.createElement('div');
		node.setAttribute('aria-label', ' ');
		fixture.appendChild(node);

		assert.isFalse(checks['aria-label'].evaluate(node));
	});

	it('should collapse whitespace', function () {
		var node = document.createElement('div');
		node.setAttribute('aria-label', ' \t \n \r \t  \t\r\n ');
		fixture.appendChild(node);

		assert.isFalse(checks['aria-label'].evaluate(node));

	});
});