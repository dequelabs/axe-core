describe('role-presentation', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});


	it('should detect role="presentation" on the element', function () {
		fixture.innerHTML = '<div role="presentation"></div>';
		var node = fixture.querySelector('div');

		assert.isTrue(checks['role-presentation'].evaluate(node));

	});


	it('should return false when role !== presentation', function () {
		fixture.innerHTML = '<div role="cats"></div>';
		var node = fixture.querySelector('div');

		assert.isFalse(checks['role-presentation'].evaluate(node));

	});


	it('should return false when there is no role attribute', function () {
		fixture.innerHTML = '<div></div>';
		var node = fixture.querySelector('div');

		assert.isFalse(checks['role-presentation'].evaluate(node));

	});

});