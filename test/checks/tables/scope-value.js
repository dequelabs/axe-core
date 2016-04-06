describe('scope-value', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should return true if scope is "col"', function () {
		fixture.innerHTML = '<table><tr><td scope="col"></td></tr></table>';
		var node = fixture.querySelector('td');

		assert.isTrue(checks['scope-value'].evaluate(node));

	});

	it('should return true if scope is "row"', function () {
		fixture.innerHTML = '<table><tr><td scope="row"></td></tr></table>';
		var node = fixture.querySelector('td');

		assert.isTrue(checks['scope-value'].evaluate(node));

	});

	it('should return false otherwise', function () {
		fixture.innerHTML = '<table><tr><td scope="hahahahanothx"></td></tr></table>';
		var node = fixture.querySelector('td');

		assert.isFalse(checks['scope-value'].evaluate(node));

	});

});