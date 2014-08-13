describe('rowspan', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var checkContext = {
		_relatedNodes: [],
		relatedNodes: function (rn) {
			this._relatedNodes = rn;
		}
	};

	afterEach(function () {
		fixture.innerHTML = '';
		checkContext._relatedNodes = [];
	});

	it('should return true when rowSpan is not 1', function () {
		fixture.innerHTML = '<table><tr><td rowspan="2">Oh noes</td></tr></table>';
		var node = fixture.querySelector('table');

		assert.isTrue(checks.rowspan.evaluate.call(checkContext, node));
		assert.deepEqual(checkContext._relatedNodes, [node.querySelector('td')]);

	});

	it('should return false if rowSpan is 1 - explicit', function () {
		fixture.innerHTML = '<table><tr><td rowspan="1">Oh noes</td></tr></table>';
		var node = fixture.querySelector('table');

		assert.isFalse(checks.rowspan.evaluate(node));

	});

	it('should return false if rowSpan is 1 - implicit', function () {
		fixture.innerHTML = '<table><tr><td>Oh noes</td></tr></table>';
		var node = fixture.querySelector('table');

		assert.isFalse(checks.rowspan.evaluate(node));

	});

});