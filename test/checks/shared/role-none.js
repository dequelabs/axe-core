describe('role-none', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});


	it('should detect role="none" on the element', function () {
		fixture.innerHTML = '<div role="none"></div>';
		var node = fixture.querySelector('div');

		assert.isTrue(checks['role-none'].evaluate(node));

	});


	it('should return false when role !== none', function () {
		fixture.innerHTML = '<div role="cats"></div>';
		var node = fixture.querySelector('div');

		assert.isFalse(checks['role-none'].evaluate(node));

	});


	it('should return false when there is no role attribute', function () {
		fixture.innerHTML = '<div></div>';
		var node = fixture.querySelector('div');

		assert.isFalse(checks['role-none'].evaluate(node));

	});

});