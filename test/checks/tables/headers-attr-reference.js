describe('headers-attr-reference', function () {
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

	it('should return true if headers references a non-existent element', function () {
		fixture.innerHTML = '<table>' +
				'<tr><td headers="foo">hi</td></tr>' +
			'</table>';

		var node = fixture.querySelector('table');

		assert.isTrue(checks['headers-attr-reference'].evaluate.call(checkContext, node));
		assert.deepEqual(checkContext._relatedNodes, [
			node.rows[0].cells[0]
		]);
	});

	it('should return true if headers references an element with no text', function () {
		fixture.innerHTML = '<table>' +
				'<tr><td id="foo"></td></tr>' +
				'<tr><td headers="foo">hi</td></tr>' +
			'</table>';

		var node = fixture.querySelector('table');

		assert.isTrue(checks['headers-attr-reference'].evaluate.call(checkContext, node));
		assert.deepEqual(checkContext._relatedNodes, [
			node.rows[1].cells[0]
		]);
	});

	it('should return true if only one reference is bad', function () {
		fixture.innerHTML = '<table>' +
				'<tr><td id="foo">hello</td></tr>' +
				'<tr><td headers="foo bar">hi</td></tr>' +
			'</table>';

		var node = fixture.querySelector('table');

		assert.isTrue(checks['headers-attr-reference'].evaluate.call(checkContext, node));
		assert.deepEqual(checkContext._relatedNodes, [
			node.rows[1].cells[0]
		]);
	});



	it('should return false if all referenced elements exist and have visible text', function () {

		fixture.innerHTML = '<table>' +
				'<tr><td></td><td id="foo">hello</td></tr>' +
				'<tr><td id="bar">bar</td><td headers="foo bar">hi</td></tr>' +
			'</table>';

		var node = fixture.querySelector('table');

		assert.isFalse(checks['headers-attr-reference'].evaluate.call(checkContext, node));
	});


});