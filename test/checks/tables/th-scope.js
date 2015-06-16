describe('th-scope', function () {
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

	it('should return false there are no THs', function () {
		fixture.innerHTML = '<table>' +
				'<tr><td>hi</td><td>hello</td></tr>' +
			'</table>';

		var node = fixture.querySelector('table');

		assert.isFalse(checks['th-scope'].evaluate.call(checkContext, node));
	});

	it('should return true THs do not use scope attr', function () {
		fixture.innerHTML = '<table>' +
				'<tr><th>hi</th><th>hello</th></tr>' +
				'<tr><td>hi</td><td>hello</td></tr>' +
			'</table>';

		var node = fixture.querySelector('table');

		assert.isTrue(checks['th-scope'].evaluate.call(checkContext, node));
		assert.deepEqual(checkContext._relatedNodes, [
			node.rows[0].cells[0], node.rows[0].cells[1]
		]);
	});

	it('should return true THs use scope attr', function () {
		fixture.innerHTML = '<table>' +
				'<tr><th scope="col">hi</th><th scope="col">hello</th></tr>' +
				'<tr><td>hi</td><td>hello</td></tr>' +
			'</table>';

		var node = fixture.querySelector('table');

		assert.isFalse(checks['th-scope'].evaluate.call(checkContext, node));
	});

});