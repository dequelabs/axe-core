describe('implicit-label', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should return true if an label is present', function () {
		var node = document.createElement('input');
		node.type = 'text';

		var label = document.createElement('label');
		label.appendChild(node);
		fixture.appendChild(label);

		assert.isTrue(checks['implicit-label'].execute(node));
	});

	it('should return false if a label is not present', function () {
		var node = document.createElement('input');
		node.type = 'text';
		fixture.appendChild(node);

		assert.isFalse(checks['implicit-label'].execute(node));
	});

});