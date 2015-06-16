describe('th-headers-attr', function () {
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

		assert.isFalse(checks['th-headers-attr'].evaluate.call(checkContext, node));
	});

	it('should return false THs do not use headers attr', function () {
		fixture.innerHTML = '<table>' +
				'<tr><th>hi</th><td>hello</td></tr>' +
			'</table>';

		var node = fixture.querySelector('table');

		assert.isFalse(checks['th-headers-attr'].evaluate.call(checkContext, node));
	});

	it('should return true THs use headers attr', function () {
		fixture.innerHTML = '<table>' +
				'<tr><th headers="hehe">hi</th><th headers="no">hello</th></tr>' +
				'<tr><td>hi</td><td>hello</td></tr>' +
			'</table>';

		var node = fixture.querySelector('table');

		assert.isTrue(checks['th-headers-attr'].evaluate.call(checkContext, node));
		assert.deepEqual(checkContext._relatedNodes, [
			node.rows[0].cells[0], node.rows[0].cells[1]
		]);
	});

});