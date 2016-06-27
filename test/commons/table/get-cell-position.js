describe('table.getCellPosition', function () {
	'use strict';
	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should get x, y coordinates given a cell', function () {
		fixture.innerHTML = '<table>' +
			'<tr><td></td><td></td><td></td></tr>' +
			'<tr><td></td><td id="target"></td><td></td></tr>' +
			'<tr><td></td><td></td><td></td></tr>' +
			'</table>';

		var target = document.getElementById('target');

		assert.deepEqual(axe.commons.table.getCellPosition(target), {
			x: 1,
			y: 1
		});
	});

	it('should handle colspans', function () {
		fixture.innerHTML = '<table>' +
			'<tr><td></td><td></td><td></td></tr>' +
			'<tr><td colspan="2"></td><td id="target"></td></tr>' +
			'<tr><td></td><td></td><td></td></tr>' +
			'</table>';

		var target = document.getElementById('target');

		assert.deepEqual(axe.commons.table.getCellPosition(target), {
			x: 2,
			y: 1
		});
	});

	it('should handle rowspans', function () {
		fixture.innerHTML = '<table>' +
			'<tr><td rowspan="2"></td><td></td><td></td></tr>' +
			'<tr><td></td><td id="target"></td></tr>' +
			'<tr><td></td><td></td><td></td></tr>' +
			'</table>';

		var target = document.getElementById('target');

		assert.deepEqual(axe.commons.table.getCellPosition(target), {
			x: 2,
			y: 1
		});
	});


	it('should handle rowspans and colspans', function () {
		fixture.innerHTML = '<table>' +
			'<tr><td rowspan="2" colspan="2"></td><td></td></tr>' +
			'<tr><td id="target"></td></tr>' +
			'<tr><td></td><td></td><td></td></tr>' +
			'</table>';

		var target = document.getElementById('target');

		assert.deepEqual(axe.commons.table.getCellPosition(target), {
			x: 2,
			y: 1
		});
	});

	it('should handle intermittent empty rows', function () {
		fixture.innerHTML = '<table>' +
			'<tr><td></td><td></td><td></td></tr>' +
			'<tr></tr>' +
			'<tr><td></td><td id="target"></td><td></td></tr>' +
			'<tr><td></td><td></td><td></td></tr>' +
			'<tr></tr>' +
			'</table>';

		var target = document.getElementById('target');

		assert.deepEqual(axe.commons.table.getCellPosition(target), {
			x: 1,
			y: 2
		});

	});


});
