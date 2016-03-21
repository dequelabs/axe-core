describe('table.isDataCell', function () {
	'use strict';
	function $id(id) {
		return document.getElementById(id);
	}

	var fixture = $id('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should work with TH', function () {
		fixture.innerHTML = '<table>' +
			'<tr><th id="target">1</th></tr>' +
			'</table>';

		var target = $id('target');

		assert.isFalse(axe.commons.table.isDataCell(target));
	});

	it('should work with TD', function () {
		fixture.innerHTML = '<table>' +
			'<tr><td id="target">1</td></tr>' +
			'</table>';

		var target = $id('target');

		assert.isTrue(axe.commons.table.isDataCell(target));
	});

	it('should work with empty TD', function () {
		fixture.innerHTML = '<table>' +
			'<tr><td id="target"></td></tr>' +
			'</table>';

		var target = $id('target');

		assert.isFalse(axe.commons.table.isDataCell(target));
	});

});
