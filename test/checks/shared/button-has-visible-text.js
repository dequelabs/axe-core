describe('button-has-visible-text', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	var checkContext = {
		_data: null,
		data: function (d) {
			this._data = d;
		}
	};

	afterEach(function () {
		fixture.innerHTML = '';
		checkContext._data = null;
	});

	it('should return false if button element is empty', function () {
		fixture.innerHTML = '<button></button>';

		var node = fixture.querySelector('button');
		assert.isFalse(checks['button-has-visible-text'].evaluate.call(checkContext, node));
	});

	it('should return true if a button element has text', function () {
		fixture.innerHTML = '<button>Name</button>';

		var node = fixture.querySelector('button');
		assert.isTrue(checks['button-has-visible-text'].evaluate.call(checkContext, node));
		assert.deepEqual(checkContext._data, 'Name');
	});

	it('should return true if ARIA button has text', function () {
		fixture.innerHTML = '<div role="button">Text</div>';

		var node = fixture.querySelector('div');
		assert.isTrue(checks['button-has-visible-text'].evaluate.call(checkContext, node));
		assert.deepEqual(checkContext._data, 'Text');
	});

	it('should return false if ARIA button has no text', function () {
		fixture.innerHTML = '<div role="button"></div>';

		var node = fixture.querySelector('div');
		assert.isFalse(checks['button-has-visible-text'].evaluate.call(checkContext, node));
	});
});