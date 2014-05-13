describe('aria-labelledby', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should return true if an aria-labelledby and its target is present', function () {
		var node = document.createElement('div');
		node.setAttribute('aria-labelledby', 'woohoo');
		fixture.appendChild(node);
		var target = document.createElement('div');
		target.id = 'woohoo';
		fixture.appendChild(target);

		assert.isTrue(checks['aria-labelledby'].evaluate(node));
	});

	it('should return false if an aria-labelledby is not present', function () {
		var node = document.createElement('div');
		fixture.appendChild(node);

		assert.isFalse(checks['aria-labelledby'].evaluate(node));
	});

	it('should return false if an aria-label is present, but references an element that is not present', function () {
		var node = document.createElement('div');
		node.setAttribute('aria-labelledby', 'noexist woohoo');
		fixture.appendChild(node);
		var target = document.createElement('div');
		target.id = 'woohoo';
		fixture.appendChild(target);

		assert.isFalse(checks['aria-labelledby'].evaluate(node));
	});
});