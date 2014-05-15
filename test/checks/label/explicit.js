describe('explicit-label', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should return true if an label is present', function () {
		var node = document.createElement('input');
		node.id = 'input';
		node.type = 'text';
		fixture.appendChild(node);

		var label = document.createElement('label');
		label.htmlFor = 'input';
		fixture.appendChild(label);

		assert.isTrue(checks['explicit-label'].evaluate(node));
	});

	it('should return false if a label is not present', function () {
		var node = document.createElement('input');
		node.type = 'text';
		fixture.appendChild(node);

		assert.isFalse(checks['explicit-label'].evaluate(node));
	});

});