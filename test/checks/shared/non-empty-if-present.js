describe('non-empty-if-present', function () {
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

	it('should return true if an value is present', function () {
		var node = document.createElement('input');
		node.setAttribute('value', 'woohoo');
		fixture.appendChild(node);

		assert.isTrue(checks['non-empty-if-present'].evaluate.call(checkContext, node));
		assert.equal(checkContext._data, 'woohoo');
	});

	it('should return true if an value is not present', function () {
		var node = document.createElement('input');
		fixture.appendChild(node);

		assert.isTrue(checks['non-empty-if-present'].evaluate.call(checkContext, node));
		assert.isNull(checkContext._data);
	});

	it('should return false if an value is present, but empty', function () {
		var node = document.createElement('input');
		node.setAttribute('value', '');
		fixture.appendChild(node);

		assert.isFalse(checks['non-empty-if-present'].evaluate.call(checkContext, node));
		assert.equal(checkContext._data, '');
	});

	it('should collapse whitespace', function () {
		var node = document.createElement('div');
		node.setAttribute('value', ' \t \n \r \t  \t\r\n ');
		fixture.appendChild(node);

		assert.isFalse(checks['non-empty-if-present'].evaluate.call(checkContext, node));
		assert.equal(checkContext._data, ' \t \n \r \t  \t\r\n ');

	});
});
