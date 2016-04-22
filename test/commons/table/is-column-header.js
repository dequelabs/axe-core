describe('table.isColumnHeader', function () {
	'use strict';
	function $id(id) {
		return document.getElementById(id);
	}

	var fixture = $id('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('return true with implicit row and col scope', function () {
		fixture.innerHTML = '<table>' +
			'<tr><td></td><th id="target">1</th></tr>' +
			'<tr><th>2</th><td>ok</td><td></td></tr>' +
			'</table>';

		var target = $id('target');

		assert.isTrue(axe.commons.table.isColumnHeader(target));
	});

	it('should return true with explicit col scope', function () {
		fixture.innerHTML = '<table>' +
			'<tr><td></td><th id="target" scope="col">1</th></tr>' +
			'<tr><th>2</th><td>ok</td><td></td></tr>' +
			'</table>';

		var target = $id('target');

		assert.isTrue(axe.commons.table.isColumnHeader(target));
	});

	it('return false with explicit row scope', function () {
		fixture.innerHTML = '<table>' +
			'<tr><td></td><th id="target" scope="row">1</th></tr>' +
			'<tr><th>2</th><td>ok</td><td></td></tr>' +
			'</table>';

		var target = $id('target');

		assert.isFalse(axe.commons.table.isColumnHeader(target));
	});

	it('should return false without scope attribute on TD', function () {
		fixture.innerHTML = '<table>' +
			'<tr><td></td><td id="target">1</td></tr>' +
			'<tr><th>2</th><td>ok</td></tr>' +
			'</table>';

		var target = $id('target');

		assert.isFalse(axe.commons.table.isColumnHeader(target));
	});

	it('return true with explicit col scope', function () {
		fixture.innerHTML = '<table>' +
			'<tr><td></td><td id="target" scope="col">1</td></tr>' +
			'<tr><th>2</th><td>ok</td></tr>' +
			'</table>';

		var target = $id('target');

		assert.isTrue(axe.commons.table.isColumnHeader(target));
	});

	it('return true with implicit row + col scope', function () {
		fixture.innerHTML = '<table>' +
			'<tr><th id="target">1</th><td>ok</td></tr>' +
			'<tr><td>ok</td><td>ok</td></tr>' +
			'</table>';

		var target = $id('target');

		assert.isTrue(axe.commons.table.isColumnHeader(target));
	});
});
