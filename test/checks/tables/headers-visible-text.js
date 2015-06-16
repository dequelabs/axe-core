describe('headers-visible-text', function () {
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

	it('should return true if a single header has no text', function () {
		fixture.innerHTML = '<table>' +
				'<tr><th scope="col"></th></tr>' +
				'<tr><td>hi</td></tr>' +
			'</table>';

		var node = fixture.querySelector('table');

		assert.isTrue(checks['headers-visible-text'].evaluate.call(checkContext, node));
		assert.deepEqual(checkContext._relatedNodes, [
			node.rows[0].cells[0]
		]);
	});

	it('should return true if a single header has hidden text', function () {
		fixture.innerHTML = '<table>' +
				'<tr><th scope="col"><span style="display:none">h</span></th><th><span style="visibility: hidden">hide</span></tr>' +
				'<tr><td>hi</td></tr>' +
			'</table>';

		var node = fixture.querySelector('table');

		assert.isTrue(checks['headers-visible-text'].evaluate.call(checkContext, node));
		assert.deepEqual(checkContext._relatedNodes, [
			node.rows[0].cells[0], node.rows[0].cells[1]
		]);
	});

	it('should return false if there are no headers', function () {
		fixture.innerHTML = '<table>' +
				'<tr><td>hi</td></tr>' +
				'<tr><td>hi</td></tr>' +
			'</table>';

		var node = fixture.querySelector('table');

		assert.isFalse(checks['headers-visible-text'].evaluate.call(checkContext, node));
	});

	it('should return false if all headers have visible text', function () {
		fixture.innerHTML = '<table>' +
				'<tr><th>hi</th><th>hello</th></tr>' +
				'<tr><td>hi</td><td>ok</td></tr>' +
			'</table>';

		var node = fixture.querySelector('table');

		assert.isFalse(checks['headers-visible-text'].evaluate.call(checkContext, node));
	});
});