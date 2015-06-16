describe('has-caption', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should return false when the table has no caption', function () {
		fixture.innerHTML = '<table>' +
				'<tr><td></td></tr>' +
			'</table>';

		var node = fixture.querySelector('table');

		assert.isFalse(checks['has-caption'].evaluate(node));
	});

	it('should return true when the table has a caption', function () {
		fixture.innerHTML = '<table>' +
				'<caption></caption>' +
				'<tr><td></td></tr>' +
			'</table>';

		var node = fixture.querySelector('table');

		assert.isTrue(checks['has-caption'].evaluate(node));
	});

	it('should not detect nested table with caption', function () {
		fixture.innerHTML = '<table>' +
				'<tr><td><table><caption>hi</caption></table></td></tr>' +
			'</table>';

		var node = fixture.querySelector('table');

		assert.isFalse(checks['has-caption'].evaluate(node));
	});
});