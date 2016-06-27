describe('table.isHeader', function () {
	'use strict';
	function $id(id) {
		return document.getElementById(id);
	}

	var fixture = $id('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should return true if table.isColumnHeader return true', function () {
		var orig = axe.commons.table.isColumnHeader;
		axe.commons.table.isColumnHeader = function () {
			return true;
		};
		var orig2 = axe.commons.table.isRowHeader;
		axe.commons.table.isRowHeader = function () {
			return false;
		};
		assert.isTrue(axe.commons.table.isHeader({}));

		axe.commons.table.isColumnHeader = orig;
		axe.commons.table.isRowHeader = orig2;
	});

	it('should return true if table.isRowHeader return true', function () {
		var orig = axe.commons.table.isRowHeader;
		axe.commons.table.isRowHeader = function () {
			return true;
		};
		var orig2 = axe.commons.table.isColumnHeader;
		axe.commons.table.isColumnHeader = function () {
			return false;
		};
		assert.isTrue(axe.commons.table.isHeader({}));

		axe.commons.table.isRowHeader = orig;
		axe.commons.table.isColumnHeader = orig2;
	});

	it('should return false if table.isRowHeader and table.isColumnHeader return false', function () {
		var orig = axe.commons.table.isRowHeader;
		axe.commons.table.isRowHeader = function () {
			return false;
		};
		var orig2 = axe.commons.table.isColumnHeader;
		axe.commons.table.isColumnHeader = function () {
			return false;
		};
		assert.isFalse(axe.commons.table.isHeader({}));

		axe.commons.table.isRowHeader = orig;
		axe.commons.table.isColumnHeader = orig2;
	});

	it('should return true if referenced by another cells headers attr', function () {
		fixture.innerHTML = '<table>' +
			'<tr><td id="target">1</td><td headers="bar target foo"></tr>' +
			'</table>';

		var target = $id('target');

		assert.isTrue(axe.commons.table.isHeader(target));
	});

	it('should return false otherwise', function () {
		fixture.innerHTML = '<table>' +
			'<tr><td class="target">1</td><td headers="bar monkeys foo"></tr>' +
			'</table>';

		var target = document.querySelector('.target');

		assert.isFalse(axe.commons.table.isHeader(target));
	});

});
