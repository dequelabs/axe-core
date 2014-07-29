describe('has-summary', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should return false when the table has no summary', function () {
		fixture.innerHTML = '<table>' +
				'<tr><td></td></tr>' +
			'</table>';

		var node = fixture.querySelector('table');

		assert.isFalse(checks['has-summary'].evaluate(node));
	});

	it('should return true when the table has a summary', function () {
		fixture.innerHTML = '<table summary="hi">' +
				'<tr><td></td></tr>' +
			'</table>';

		var node = fixture.querySelector('table');

		assert.isTrue(checks['has-summary'].evaluate(node));
	});

	it('should not detect nested table with summary', function () {
		fixture.innerHTML = '<table>' +
				'<tr><td><table summary="hi"><tr><td>hi</td></tr></table></td></tr>' +
			'</table>';

		var node = fixture.querySelector('table');

		assert.isFalse(checks['has-summary'].evaluate(node));
	});
});