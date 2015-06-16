describe('th-single-row-column', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should return false there are no THs', function () {
		fixture.innerHTML = '<table>' +
				'<tr><td></td><td></td></tr>' +
			'</table>';

		var node = fixture.querySelector('table');

		assert.isFalse(checks['th-single-row-column'].evaluate(node));
	});

	it('should return false there is only a single row and column of THs', function () {
		fixture.innerHTML = '<table>' +
				'<tr><th>1</th><th>2</th></tr>' +
				'<tr><th>3</th><td>4</td></tr>' +
			'</table>';

		var node = fixture.querySelector('table');

		assert.isFalse(checks['th-single-row-column'].evaluate(node));
	});

	it('should return true there is more than one row of THs', function () {
		fixture.innerHTML = '<table>' +
				'<tr><th>1</th><th>2</th></tr>' +
				'<tr><th>3</th><th>4</th></tr>' +
			'</table>';

		var node = fixture.querySelector('table');

		assert.isTrue(checks['th-single-row-column'].evaluate(node));
	});

	it('should return true there is more than one column of THs', function () {
		fixture.innerHTML = '<table>' +
				'<tr><th>1</th><th>1a</th><td>2</td></tr>' +
				'<tr><th>3</th><th>3a</th><td>4</td></tr>' +
			'</table>';

		var node = fixture.querySelector('table');

		assert.isTrue(checks['th-single-row-column'].evaluate(node));
	});

});