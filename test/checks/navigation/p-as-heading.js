describe('p-as-heading', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('exists', function () {
		assert.isFunction(checks['p-as-heading'].evaluate);
	});

});