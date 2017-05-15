describe('aria-hidden', function () {
	'use strict';

	var node = document.body;

	var checkContext = {
		_data: null,
		data: function (d) {
			this._data = d;
		}
	};

	it('should not be present on document.body', function () {
		assert.isTrue(checks['aria-hidden-body'].evaluate.call(checkContext, node));
	});

	it('fails appropriately if aria-hidden on document.body', function () {
		node.setAttribute('aria-hidden', 'false');
		assert.isFalse(checks['aria-hidden-body'].evaluate.call(checkContext, node));
	});

});
