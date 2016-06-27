describe('has-th', function () {
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

	it('should return false when the table has no th', function () {
		fixture.innerHTML = '<table>' +
				'<tr><td></td></tr>' +
			'</table>';

		var node = fixture.querySelector('table');

		assert.isFalse(checks['has-th'].evaluate.call(checkContext, node));
	});

	it('should return true when the table has a th', function () {
		fixture.innerHTML = '<table>' +
				'<tr><th></th></tr>' +
			'</table>';

		var node = fixture.querySelector('table');

		assert.isTrue(checks['has-th'].evaluate.call(checkContext, node));
		assert.deepEqual(checkContext._relatedNodes, [
			node.querySelector('th')
		]);
	});

	it('should return true when the table has a td with role=columnheader', function () {
		fixture.innerHTML = '<table>' +
				'<tr><td role="columnheader"></td></tr>' +
			'</table>';

		var node = fixture.querySelector('table');

		assert.isTrue(checks['has-th'].evaluate.call(checkContext, node));
		assert.deepEqual(checkContext._relatedNodes, [
			node.querySelector('td')
		]);
	});

	it('should not detect nested table with th', function () {
		fixture.innerHTML = '<table>' +
				'<tr><td><table><tr><th>hi</th></tr></table></td></tr>' +
			'</table>';

		var node = fixture.querySelector('table');

		assert.isFalse(checks['has-th'].evaluate.call(checkContext, node));
	});
});