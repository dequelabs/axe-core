describe('table.isColumnHeader', function () {
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
			'<tr><td></td><th id="target">1</th></tr>' +
			'<tr><th>2</th><td>ok</td><td></td></tr>' +
			'</table>';

		var target = $id('target');

		assert.isTrue(axe.commons.table.isColumnHeader(target));
	});

	it('should work with scope=col', function () {
		fixture.innerHTML = '<table>' +
			'<tr><td></td><th id="target" scope="col">1</th></tr>' +
			'<tr><th>2</th><td>ok</td><td></td></tr>' +
			'</table>';

		var target = $id('target');

		assert.isTrue(axe.commons.table.isColumnHeader(target));
	});

	it('should work with scope=row', function () {
		fixture.innerHTML = '<table>' +
			'<tr><td></td><th id="target" scope="row">1</th></tr>' +
			'<tr><th>2</th><td>ok</td><td></td></tr>' +
			'</table>';

		var target = $id('target');

		assert.isFalse(axe.commons.table.isColumnHeader(target));
	});

	it('should work with scope=auto on TD', function () {
		fixture.innerHTML = '<table>' +
			'<tr><td></td><td id="target">1</td></tr>' +
			'<tr><th>2</th><td>ok</td></tr>' +
			'</table>';

		var target = $id('target');

		assert.isFalse(axe.commons.table.isColumnHeader(target));
	});

	it('should work with scope=col on TD', function () {
		fixture.innerHTML = '<table>' +
			'<tr><td></td><td id="target" scope="col">1</td></tr>' +
			'<tr><th>2</th><td>ok</td></tr>' +
			'</table>';

		var target = $id('target');

		assert.isTrue(axe.commons.table.isColumnHeader(target));
	});

	it('should work with scope=auto with data cells in the same row', function () {
		fixture.innerHTML = '<table>' +
			'<tr><th id="target">1</th><td>ok</td></tr>' +
			'<tr><td>ok</td><td>ok</td></tr>' +
			'</table>';

		var target = $id('target');

		assert.isFalse(axe.commons.table.isColumnHeader(target));
	});
});
