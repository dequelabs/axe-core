describe('rowspan', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should return true for any non-1 rowSpan', function () {
		fixture.innerHTML = '<table><tr><td rowspan="2">Oh noes</td></tr></table>';
		var node = fixture.querySelector('td');

		assert.isTrue(checks.rowspan.evaluate(node));

	});

	it('should return false for any 1 rowSpan', function () {
		fixture.innerHTML = '<table><tr><td rowspan="1">Oh noes</td></tr></table>';
		var node = fixture.querySelector('td');

		assert.isFalse(checks.rowspan.evaluate(node));

	});

});