describe('implicit-label', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should return false if an empty label is present', function () {
		fixture.innerHTML = '<label><input type="text" id="target"></label>';
		var node = fixture.querySelector('#target');
		assert.isFalse(checks['implicit-label'].evaluate(node));
	});

	it('should return false if an invisible non-empty label is present', function () {
		fixture.innerHTML = '<label><span style="display: none">Text</span> <input type="text" id="target"></label>';
		var node = fixture.querySelector('#target');
		assert.isFalse(checks['implicit-label'].evaluate(node));
	});

	it('should return true if a non-empty label is present', function () {
		fixture.innerHTML = '<label>Text <input type="text" id="target"></label>';
		var node = fixture.querySelector('#target');
		assert.isTrue(checks['implicit-label'].evaluate(node));
	});

	it('should return false if a label is not present', function () {
		var node = document.createElement('input');
		node.type = 'text';
		fixture.appendChild(node);

		assert.isFalse(checks['implicit-label'].evaluate(node));
	});

});
