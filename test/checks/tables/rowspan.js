describe('rowspan', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should return false when rowSpan is not 1', function () {
		fixture.innerHTML = '<table><tr><td rowspan="2">Oh noes</td></tr></table>';
		var node = fixture.querySelector('td');

		assert.isFalse(checks.rowspan.evaluate(node));

	});

	it('should return true if rowSpan is 1 - explicit', function () {
		fixture.innerHTML = '<table><tr><td rowspan="1">Oh noes</td></tr></table>';
		var node = fixture.querySelector('td');

		assert.isTrue(checks.rowspan.evaluate(node));

	});

	it('should return true if rowSpan is 1 - implicit', function () {
		fixture.innerHTML = '<table><tr><td>Oh noes</td></tr></table>';
		var node = fixture.querySelector('td');

		assert.isTrue(checks.rowspan.evaluate(node));

	});

});