describe('cell-no-header', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var checkContext = {
		_relatedNodes: [],
		_data: null,
		data: function (d) {
			this._data = d;
		},
		relatedNodes: function (rn) {
			this._relatedNodes = rn;
		}
	};

	afterEach(function () {
		fixture.innerHTML = '';
		checkContext._relatedNodes = [];
		checkContext._data = null;
	});

	it('should return false each non-empty cell has a row header', function () {
		fixture.innerHTML = '<table>' +
				'<tr><th>hi</th><td>hello</td></tr>' +
			'</table>';

		var node = fixture.querySelector('table');

		assert.isFalse(checks['cell-no-header'].evaluate.call(checkContext, node));
	});

	it('should return false each non-empty cell has a column header', function () {
		fixture.innerHTML = '<table>' +
				'<tr><th></th><th></th></tr>' +
				'<tr><td>hi</td><td>hello</td></tr>' +
			'</table>';

		var node = fixture.querySelector('table');

		assert.isFalse(checks['cell-no-header'].evaluate.call(checkContext, node));
	});

	it('should return false if the only data cells are empty', function () {
		fixture.innerHTML = '<table>' +
				'<tr><td></td><td></td></tr>' +
			'</table>';

		var node = fixture.querySelector('table');

		assert.isFalse(checks['cell-no-header'].evaluate.call(checkContext, node));

	});

	it('should return true if a cell has no headers', function () {
		fixture.innerHTML = '<table>' +
				'<tr><td>hi</td><td>hello</td></tr>' +
			'</table>';

		var node = fixture.querySelector('table');

		assert.isTrue(checks['cell-no-header'].evaluate.call(checkContext, node));
		assert.deepEqual(checkContext._relatedNodes, [
			node.rows[0].cells[0], node.rows[0].cells[1]
		]);


	});

	it('should return true if a cell has no headers - complex table', function () {
		fixture.innerHTML = '<table>' +
				'<tr><td colspan="3">Psuedo-Caption</td></tr>' +
				'<tr><td>hi</td><td>hello</td><td>Ok</td></tr>' +
			'</table>';

		var node = fixture.querySelector('table');

		assert.isTrue(checks['cell-no-header'].evaluate.call(checkContext, node));
		assert.deepEqual(checkContext._relatedNodes, [
			node.rows[0].cells[0], node.rows[1].cells[0], node.rows[1].cells[1], node.rows[1].cells[2]
		]);


	});
});