/* global fixture */
describe('table.traverse', function () {

	var table, dummyTable, topRight, bottomLeft;
	beforeEach(function () {
		table = axe.commons.table;
		dummyTable = [
			['1a', '1b', '1c'],
			['2a', '2b', '2c'],
			['3a', '3b', '3c']
		];
		topRight = { x:0, y:0 };
		bottomLeft = { x:2, y:2 };
	});

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('traverses in the `right` direction', function () {
		var iterations = 0;
		var expect = ['1b', '1c'];

		table.traverse({ x:1, y:0 }, topRight, dummyTable,
				function (cell) {
			assert.equal(cell, expect[iterations]);
			iterations += 1;
		});
		assert.equal(iterations, expect.length);
	});


	it('returns an array of traversed cells', function () {
		var result = table.traverse({ x:1, y:0 }, topRight, dummyTable);
		assert.deepEqual(result, ['1b', '1c']);
	});

	it('traverses in the `down` direction', function () {
		var iterations = 0;
		var expect = ['2a', '3a'];

		table.traverse({ x:0, y:1 }, topRight, dummyTable,
				function (cell) {
			assert.equal(cell, expect[iterations]);
			iterations += 1;
		});
		assert.equal(iterations, expect.length);
	});

	it('traverses in the `left` direction', function () {
		var iterations = 0;
		var expect = ['3b', '3a'];

		table.traverse({ x:-1, y:0 }, bottomLeft, dummyTable,
				function (cell) {
			assert.equal(cell, expect[iterations]);
			iterations += 1;
		});
		assert.equal(iterations, expect.length);
	});

	it('traverses in the `up` direction', function () {
		var iterations = 0;
		var expect = ['2c', '1c'];

		table.traverse({ x:0, y:-1 }, bottomLeft, dummyTable,
				function (cell) {
			assert.equal(cell, expect[iterations]);
			iterations += 1;
		});
		assert.equal(iterations, expect.length);
	});

	it('takes string values as directions', function () {
		var iterations = 0;
		var expect = ['1b', '1c'];
		table.traverse('right', topRight, dummyTable,
				function (cell) {
			assert.equal(cell, expect[iterations]);
			iterations += 1;
		});

		iterations = 0;
		expect = ['2a', '3a'];
		table.traverse('down', topRight, dummyTable,
				function (cell) {
			assert.equal(cell, expect[iterations]);
			iterations += 1;
		});

		iterations = 0;
		expect = ['3b', '3a'];
		table.traverse('left', bottomLeft, dummyTable,
				function (cell) {
			assert.equal(cell, expect[iterations]);
			iterations += 1;
		});

		iterations = 0;
		expect = ['2c', '1c'];
		table.traverse('up', bottomLeft, dummyTable,
				function (cell) {
			assert.equal(cell, expect[iterations]);
			iterations += 1;
		});
	});

	it('stops when the callback returned true', function () {
		var iterations = 0;
		table.traverse({ x:1, y:1 }, topRight, dummyTable,
				function (cell) {
			assert.equal(cell, '2b'); // or not, to be?
			iterations += 1;
			return true;
		});
		assert.equal(iterations, 1);
	});

	it('starts at top-right of no position is given', function () {
		var iterations = 0;
		var expect = ['1b', '1c'];

		table.traverse({ x:1, y:0 }, dummyTable, function (cell) {
			assert.equal(cell, expect[iterations]);
			iterations += 1;
		});
		assert.equal(iterations, expect.length);
	});


});