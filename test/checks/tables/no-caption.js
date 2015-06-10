describe('no-caption', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should return false if there is a caption', function () {
		fixture.innerHTML = '<table>' +
				'<caption>Mwa</caption>' +
				'<tr><td>hello</td></tr>' +
			'</table>';

		var node = fixture.querySelector('table');

		assert.isFalse(checks['no-caption'].evaluate(node));
	});

	it('should return true if there is no caption', function () {
		fixture.innerHTML = '<table>' +
				'<tr><td>hello</td></tr>' +
			'</table>';

		var node = fixture.querySelector('table');

		assert.isTrue(checks['no-caption'].evaluate(node));
	});

	it('should return true if the caption has no text', function () {
		fixture.innerHTML = '<table>' +
				'<caption></caption>' +
				'<tr><td>hello</td></tr>' +
			'</table>';

		var node = fixture.querySelector('table');

		assert.isTrue(checks['no-caption'].evaluate(node));
	});
});