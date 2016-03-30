describe('table.isRowHeader', function () {
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
			'<tr><th id="target">2</th><td>ok</td><td></td></tr>' +
			'</table>';

		var target = $id('target');

		assert.isTrue(axe.commons.table.isRowHeader(target));
	});

	it('should work with scope=row', function () {
		fixture.innerHTML = '<table>' +
			'<tr><th scope="row" id="target">2</th><td>ok</td><td></td></tr>' +
			'</table>';

		var target = $id('target');

		assert.isTrue(axe.commons.table.isRowHeader(target));
	});

	it('should work with scope=col', function () {
		fixture.innerHTML = '<table>' +
			'<tr><th id="target">2</th><th>ok</th><th></th></tr>' +
			'<tr><td>2</td><td>ok</td><td></td></tr>' +
			'</table>';

		var target = $id('target');

		assert.isFalse(axe.commons.table.isRowHeader(target));
	});

	it('should work with scope=auto on TD', function () {
		fixture.innerHTML = '<table>' +
			'<tr><td id="target">2</td><td>ok</td></tr>' +
			'</table>';

		var target = $id('target');

		assert.isFalse(axe.commons.table.isRowHeader(target));
	});

	it('should work with scope=row on TD', function () {
		fixture.innerHTML = '<table>' +
			'<tr><td scope="row" id="target">2</td><td>ok</td></tr>' +
			'</table>';

		var target = $id('target');

		assert.isTrue(axe.commons.table.isRowHeader(target));
	});

	it('should work with scope=auto with data cells in the same column', function () {
		fixture.innerHTML = '<table>' +
			'<tr><th id="target">1</th><td>ok</td></tr>' +
			'<tr><td>ok</td><td>ok</td></tr>' +
			'</table>';

		var target = $id('target');

		assert.isFalse(axe.commons.table.isRowHeader(target));
	});

});
