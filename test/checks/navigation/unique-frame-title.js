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

	it('should convert text to lower case', function () {
		checks['unique-frame-title'].evaluate.call(checkContext, {
			title: '\t  app\t \n \rle  '
		});
		assert.equal(checkContext._data, 'app le');
	});

	it('should take out space differences', function () {
		checks['unique-frame-title'].evaluate.call(checkContext, {
			title: 'APPLE'
		});
		assert.equal(checkContext._data, 'apple');
	});
});
