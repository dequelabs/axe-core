describe('table.isColumnHeader', function() {
	'use strict';

	var table = axe.commons.table;
	var fixture = document.querySelector('#fixture');

	var tableFixture =
		'<table>' +
		'<tr>' +
		'<th id="ch1">column header 1</th>' +
		'<th scope="col" id="ch2">column header 2</th>' +
		'</tr>' +
		'<tr>' +
		'<th scope="row" id="rh">row header 1</th>' +
		'<td id="cell">cell</td>' +
		'</table>';

	it('returns false if not a column header', function() {
		fixture.innerHTML = tableFixture;
		var cell = document.querySelector('#cell');
		assert.isFalse(table.isColumnHeader(cell));
	});

	it('returns true if scope="auto"', function() {
		fixture.innerHTML = tableFixture;
		var cell = document.querySelector('#ch1');
		assert.isTrue(table.isColumnHeader(cell));
	});

	it('returns true if scope="col"', function() {
		fixture.innerHTML = tableFixture;
		var cell = document.querySelector('#ch2');
		assert.isTrue(table.isColumnHeader(cell));
	});

	it('returns false if scope="row"', function() {
		fixture.innerHTML = tableFixture;
		var cell = document.querySelector('#rh');
		assert.isFalse(table.isColumnHeader(cell));
	});
});
