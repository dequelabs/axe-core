describe('non-empty-value', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should return true if an value is present', function () {
		var node = document.createElement('input');
		node.setAttribute('value', 'woohoo');
		fixture.appendChild(node);

		assert.isTrue(checks['non-empty-value'].evaluate(node));
	});

	it('should return false if an value is not present', function () {
		var node = document.createElement('input');
		fixture.appendChild(node);

		assert.isFalse(checks['non-empty-value'].evaluate(node));
	});

	it('should return false if an value is present, but empty', function () {
		var node = document.createElement('input');
		node.setAttribute('value', ' ');
		fixture.appendChild(node);

		assert.isFalse(checks['non-empty-value'].evaluate(node));
	});

	it('should collapse whitespace', function () {
		var node = document.createElement('div');
		node.setAttribute('value', ' \t \n \r \t  \t\r\n ');
		fixture.appendChild(node);

		assert.isFalse(checks['non-empty-value'].evaluate(node));

	});
});
