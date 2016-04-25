describe('table.isColumnHeader', function () {
	'use strict';

	var table, origGetScope;
	beforeEach(function () {
		table = axe.commons.table;
		origGetScope = table.getScope;
	});

	afterEach(function () {
		table.getScope = origGetScope;
	});

	it('passes an argument to table.getScope', function () {
		var called = false;
		axe.commons.table.getScope = function (arg) {
			assert.equal(arg, 'Buzz Lightyear');
			called = true;
			return 'auto';
		};
		axe.commons.table.isColumnHeader('Buzz Lightyear');

		assert.isTrue(called);
	});

	it('returns false if table.getScope returns false', function () {
		table.getScope = function () {
			return false;
		};
		assert.isFalse(table.isColumnHeader());
	});

	it('returns true if table.getScope returns auto', function () {
		table.getScope = function () {
			return 'auto';
		};
		assert.isTrue(table.isColumnHeader());
	});

	it('returns true if table.getScope returns col', function () {
		table.getScope = function () {
			return 'col';
		};
		assert.isTrue(table.isColumnHeader());
	});

	it('returns false if table.getScope returns row', function () {
		table.getScope = function () {
			return 'row';
		};
		assert.isFalse(table.isColumnHeader());
	});
});
