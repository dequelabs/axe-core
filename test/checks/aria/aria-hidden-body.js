describe('aria-hidden', function () {
	'use strict';

	var node = document.getElementsByTagName('body')[0];

	var checkContext = {
		_data: null,
		data: function (d) {
			this._data = d;
		}
	};

	afterEach(function () {
		checkContext._data = null;
		node.removeAttribute('aria-hidden');
	});

	it('should not be present on document.body', function () {
		assert.isTrue(checks['aria-hidden-body'].evaluate.call(checkContext, node));
	});

	it('fails appropriately if aria-hidden on document.body', function () {
		node.setAttribute('aria-hidden', 'true');
		assert.isFalse(checks['aria-hidden-body'].evaluate.call(checkContext, node));
	});

});
