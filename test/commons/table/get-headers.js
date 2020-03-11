describe('table.getHeaders', function() {
	'use strict';
	function $id(id) {
		return document.getElementById(id);
	}

	var fixture = $id('fixture');
	var origToGrid = axe.commons.table.toGrid;
	var origCellPosition = axe.commons.table.getCellPosition;

	afterEach(function() {
		fixture.innerHTML = '';
		axe._tree = undefined;
		axe.commons.table.toGrid = origToGrid;
		axe.commons.table.getCellPosition = origCellPosition;
	});

	it('should work with scope=auto', function() {
		fixture.innerHTML =
			'<table>' +
			'<tr><td></td><th id="t1">1</th><th>2</th></tr>' +
			'<tr><th id="t2">2</th><td id="target">ok</td><td></td></tr>' +
			'</table>';

		var target = $id('target');

		axe.testUtils.flatTreeSetup(fixture.firstChild);
		assert.deepEqual(axe.commons.table.getHeaders(target), [
			$id('t1'),
			$id('t2')
		]);
	});

	it('should work with scope set', function() {
		fixture.innerHTML =
			'<table>' +
			'<tr><td></td><th scope="col" id="t1">1</th><th scope="col">2</th></tr>' +
			'<tr><th scope="row" id="t2">1</th><td id="target">ok</td><td></td></tr>' +
			'</table>';

		var target = $id('target');

		axe.testUtils.flatTreeSetup(fixture.firstChild);
		assert.deepEqual(axe.commons.table.getHeaders(target), [
			$id('t1'),
			$id('t2')
		]);
	});

	it('should find multiple column headers', function() {
		fixture.innerHTML =
			'<table>' +
			'<tr><td></td><th scope="col" id="t1">1</th><th scope="col">2</th></tr>' +
			'<tr><td></td><th scope="col" id="t2">1</th><th scope="col">2</th></tr>' +
			'<tr><th scope="row" id="t3">1</th><td id="target">ok</td><td></td></tr>' +
			'</table>';

		var target = $id('target');

		axe.testUtils.flatTreeSetup(fixture.firstChild);
		assert.deepEqual(axe.commons.table.getHeaders(target), [
			$id('t1'),
			$id('t2'),
			$id('t3')
		]);
	});

	it('should find multiple row headers', function() {
		fixture.innerHTML =
			'<table>' +
			'<tr><td></td><th scope="col">1</th><th scope="col" id="t1">2</th></tr>' +
			'<tr><th scope="row" id="t2">1</th><th scope="row" id="t3">2</th><td id="target">ok</td></tr>' +
			'</table>';

		var target = $id('target');

		axe.testUtils.flatTreeSetup(fixture.firstChild);
		assert.deepEqual(axe.commons.table.getHeaders(target), [
			$id('t1'),
			$id('t2'),
			$id('t3')
		]);
	});

	it('should handle colspans', function() {
		fixture.innerHTML =
			'<table>' +
			'<tr><td></td><th scope="col">1</th><th scope="col" id="t1">2</th></tr>' +
			'<tr><td colspan="2"></td><td id="target"></td></tr>' +
			'</table>';

		var target = $id('target');

		axe.testUtils.flatTreeSetup(fixture.firstChild);
		assert.deepEqual(axe.commons.table.getHeaders(target), [$id('t1')]);
	});

	it('should handle rowspans', function() {
		fixture.innerHTML =
			'<table>' +
			'<tr><td rowspan="2"></td><th scope="col">1</th><th scope="col" id="t1">2</th></tr>' +
			'<tr><th scope="row" id="t2"></th><td id="target"></td></tr>' +
			'</table>';

		var target = $id('target');

		axe.testUtils.flatTreeSetup(fixture.firstChild);
		assert.deepEqual(axe.commons.table.getHeaders(target), [
			$id('t1'),
			$id('t2')
		]);
	});

	it('should handle headers attribute', function() {
		fixture.innerHTML =
			'<table>' +
			'<tr><td id="t1">t1</td><td id="t2">t2</td></tr>' +
			'<tr><td id="t3">t3</td><td id="target" headers="t1 t2 t3"></td></tr>' +
			'</table>';

		var target = $id('target');

		axe.testUtils.flatTreeSetup(fixture.firstChild);
		assert.deepEqual(axe.commons.table.getHeaders(target), [
			$id('t1'),
			$id('t2'),
			$id('t3')
		]);
	});

	it('should handle empty headers attribute', function() {
		fixture.innerHTML =
			'<table>' +
			'<tr>' +
			'<th scope="col" id="t1">Projects</th>' +
			'<th scope="col" id="t2">Progress</th>' +
			'</tr>' +
			'<tr>' +
			'<td headers="" id="target">My Project</td>' +
			'<td>15%</td>' +
			'</tr>' +
			'</table>';

		var target = $id('target');

		axe.testUtils.flatTreeSetup(fixture.firstChild);
		assert.deepEqual(axe.commons.table.getHeaders(target), [$id('t1')]);
	});

	it('should work with tables that have inconsistent columns', function() {
		fixture.innerHTML =
			'<table>' +
			'<tr><td id="t1">t1</td><td id="t2">t2</td></tr>' +
			'<tr><td id="t3">t3</td><td headers="t1 t2 t3"></td><td id="target"></td></tr>' +
			'</table>';

		var target = $id('target');

		axe.testUtils.flatTreeSetup(fixture.firstChild);
		assert.deepEqual(axe.commons.table.getHeaders(target), []);
	});

	it('should not call toGrid if a tableGrid is passed in', function() {
		fixture.innerHTML =
			'<table id="table">' +
			'<tr><td></td><th id="t1">1</th><th>2</th></tr>' +
			'<tr><th id="t2">2</th><td id="target">ok</td><td></td></tr>' +
			'</table>';

		var target = $id('target');
		var table = $id('table');

		axe.testUtils.flatTreeSetup(fixture.firstChild);
		var tableGrid = axe.commons.table.toGrid(table);

		// getCellPosition will eventually call into toGrid when checking for
		// scope but we're only interested if the toGrid call was called before
		// cellPosition
		var called = false;
		axe.commons.table.toGrid = function(table) {
			called = true;
			return origToGrid(table);
		};
		axe.commons.table.getCellPosition = function(cell, tableGrid) {
			axe.commons.table.toGrid = origToGrid;
			return origCellPosition(cell, tableGrid);
		};

		axe.commons.table.getHeaders(target, tableGrid);
		assert.isFalse(called);
		assert.deepEqual(axe.commons.table.getHeaders(target), [
			$id('t1'),
			$id('t2')
		]);
	});
});
