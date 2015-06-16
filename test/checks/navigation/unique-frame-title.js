describe('unique-frame-title', function () {
	'use strict';

	var checkContext = {
		_data: null,
		data: function (d) {
			this._data = d;
		}
	};

	afterEach(function () {
		checkContext._data = null;
	});


	it('should log title to data and return true', function () {
		assert.isTrue(checks['unique-frame-title'].evaluate.call(checkContext, {
			title: 'bananas'
		}));
		assert.equal(checkContext._data, 'bananas');
	});
});
