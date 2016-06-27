describe('table.getHeaders', function () {
	'use strict';
	function $id(id) {
		return document.getElementById(id);
	}

	var fixture = $id('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should work with scope=auto', function () {
		fixture.innerHTML = '<table>' +
			'<tr><td></td><th id="t1">1</th><th>2</th></tr>' +
			'<tr><th id="t2">2</th><td id="target">ok</td><td></td></tr>' +
			'</table>';

		var target = $id('target');

		assert.deepEqual(axe.commons.table.getHeaders(target), [$id('t1'), $id('t2')]);
	});


	it('should work with scope set', function () {
		fixture.innerHTML = '<table>' +
			'<tr><td></td><th scope="col" id="t1">1</th><th scope="col">2</th></tr>' +
			'<tr><th scope="row" id="t2">1</th><td id="target">ok</td><td></td></tr>' +
			'</table>';

		var target = $id('target');

		assert.deepEqual(axe.commons.table.getHeaders(target), [$id('t1'), $id('t2')]);
	});


	it('should find multiple column headers', function () {
		fixture.innerHTML = '<table>' +
			'<tr><td></td><th scope="col" id="t1">1</th><th scope="col">2</th></tr>' +
			'<tr><td></td><th scope="col" id="t2">1</th><th scope="col">2</th></tr>' +
			'<tr><th scope="row" id="t3">1</th><td id="target">ok</td><td></td></tr>' +
			'</table>';

		var target = $id('target');

		assert.deepEqual(axe.commons.table.getHeaders(target), [$id('t1'), $id('t2'), $id('t3')]);
	});


	it('should find multiple row headers', function () {
		fixture.innerHTML = '<table>' +
			'<tr><td></td><th scope="col">1</th><th scope="col" id="t1">2</th></tr>' +
			'<tr><th scope="row" id="t2">1</th><th scope="row" id="t3">2</th><td id="target">ok</td></tr>' +
			'</table>';

		var target = $id('target');

		assert.deepEqual(axe.commons.table.getHeaders(target), [$id('t1'), $id('t2'), $id('t3')]);
	});

	it('should handle colspans', function () {
		fixture.innerHTML = '<table>' +
			'<tr><td></td><th scope="col">1</th><th scope="col" id="t1">2</th></tr>' +
			'<tr><td colspan="2"></td><td id="target"></td></tr>' +
			'</table>';

		var target = $id('target');

		assert.deepEqual(axe.commons.table.getHeaders(target), [$id('t1')]);
	});

	it('should handle rowspans', function () {
		fixture.innerHTML = '<table>' +
			'<tr><td rowspan="2"></td><th scope="col">1</th><th scope="col" id="t1">2</th></tr>' +
			'<tr><th scope="row" id="t2"></th><td id="target"></td></tr>' +
			'</table>';

		var target = $id('target');

		assert.deepEqual(axe.commons.table.getHeaders(target), [$id('t1'), $id('t2')]);
	});

	it('should handle headers attribute', function () {
		fixture.innerHTML = '<table>' +
			'<tr><td id="t1">t1</td><td id="t2">t2</td></tr>' +
			'<tr><td id="t3">t3</td><td id="target" headers="t1 t2 t3"></td></tr>' +
			'</table>';

		var target = $id('target');

		assert.deepEqual(axe.commons.table.getHeaders(target), [$id('t1'), $id('t2'), $id('t3')]);

	});

	it('should work with tables that have inconsistent columns', function () {
		fixture.innerHTML = '<table>' +
			'<tr><td id="t1">t1</td><td id="t2">t2</td></tr>' +
			'<tr><td id="t3">t3</td><td headers="t1 t2 t3"></td><td id="target"></td></tr>' +
			'</table>';

		var target = $id('target');

		assert.deepEqual(axe.commons.table.getHeaders(target), []);

	});

});
