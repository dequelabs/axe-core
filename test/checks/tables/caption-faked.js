describe('caption-faked', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	var captionFaked;
	beforeEach(function () {
		captionFaked = checks['caption-faked'];
	});

	it('returns true if the first row has multiple cells', function () {
		fixture.innerHTML =
			'<table>' +
			'  <tr> <td></td> <td></td> </tr>' +
			'  <tr> <td></td> <td></td> </tr>' +
			'</table>';

		var node = fixture.querySelector('table');
		assert.isTrue(captionFaked.evaluate(node));
	});

	it('returns true if the table has only one column', function () {
		fixture.innerHTML =
			'<table>' +
			'  <tr> <td></td> </tr>' +
			'  <tr> <td></td> </tr>' +
			'</table>';

		var node = fixture.querySelector('table');
		assert.isTrue(captionFaked.evaluate(node));
	});

	it('returns true if the table has only one <tr>', function () {
		fixture.innerHTML =
			'<table>' +
			// Accessibility: Expect the unexpected
			'  <tr> <td rowspan="2" colspan="2"></td> </tr>' +
			'</table>';

		var node = fixture.querySelector('table');
		assert.isTrue(captionFaked.evaluate(node));
	});

	it('returns true if the first column does not span the entire table', function () {
		fixture.innerHTML =
			'<table>' +
			'  <tr> <td></td> </tr>' +
			'  <tr> <td></td> <td></td> </tr>' +
			'</table>';

		var node = fixture.querySelector('table');
		assert.isTrue(captionFaked.evaluate(node));
	});

	it('returns false if the first is only a single td', function () {
		fixture.innerHTML =
			'<table>' +
			'  <tr> <td colspan="2"></td> </tr>' +
			'  <tr> <td></td> <td></td> </tr>' +
			'</table>';

		var node = fixture.querySelector('table');
		assert.isFalse(captionFaked.evaluate(node));
	});

	it('returns false if the first is only a single th', function () {
		fixture.innerHTML =
			'<table>' +
			'  <tr> <th colspan="2"></th> </tr>' +
			'  <tr> <td></td> <td></td> </tr>' +
			'</table>';

		var node = fixture.querySelector('table');
		assert.isFalse(captionFaked.evaluate(node));
	});

});