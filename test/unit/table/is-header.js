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
		var orig = kslib.table.isColumnHeader;
		kslib.table.isColumnHeader = function () {
			return true;
		};
		var orig2 = kslib.table.isRowHeader;
		kslib.table.isRowHeader = function () {
			return false;
		};
		assert.isTrue(kslib.table.isHeader({}));

		kslib.table.isColumnHeader = orig;
		kslib.table.isRowHeader = orig2;
	});

	it('should return true if table.isRowHeader return true', function () {
		var orig = kslib.table.isRowHeader;
		kslib.table.isRowHeader = function () {
			return true;
		};
		var orig2 = kslib.table.isColumnHeader;
		kslib.table.isColumnHeader = function () {
			return false;
		};
		assert.isTrue(kslib.table.isHeader({}));

		kslib.table.isRowHeader = orig;
		kslib.table.isColumnHeader = orig2;
	});

	it('should return false if table.isRowHeader and table.isColumnHeader return false', function () {
		var orig = kslib.table.isRowHeader;
		kslib.table.isRowHeader = function () {
			return false;
		};
		var orig2 = kslib.table.isColumnHeader;
		kslib.table.isColumnHeader = function () {
			return false;
		};
		assert.isFalse(kslib.table.isHeader({}));

		kslib.table.isRowHeader = orig;
		kslib.table.isColumnHeader = orig2;
	});

	it('should return true if referenced by another cells headers attr', function () {
		fixture.innerHTML = '<table>' +
			'<tr><td id="target">1</td><td headers="bar target foo"></tr>' +
			'</table>';

		var target = $id('target');

		assert.isTrue(kslib.table.isHeader(target));
	});

	it('should return false otherwise', function () {
		fixture.innerHTML = '<table>' +
			'<tr><td class="target">1</td><td headers="bar monkeys foo"></tr>' +
			'</table>';

		var target = document.querySelector('.target');

		assert.isFalse(kslib.table.isHeader(target));
	});

});
