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

	it('should return false if a value is present', function () {
		var node = document.createElement('input');
		node.setAttribute('type', 'submit');
		node.setAttribute('value', 'woohoo');
		fixture.appendChild(node);

		assert.isFalse(checks['non-empty-if-present'].evaluate.call(checkContext, node));
	});

	it('should return true if a value is not present', function () {
		var node = document.createElement('input');
		node.setAttribute('type', 'submit');
		fixture.appendChild(node);

		assert.isTrue(checks['non-empty-if-present'].evaluate.call(checkContext, node));
		assert.isNull(checkContext._data);
	});

	it('should return false if an value is present, but empty', function () {
		var node = document.createElement('input');
		node.setAttribute('type', 'submit');
		node.setAttribute('value', '');
		fixture.appendChild(node);

		assert.isFalse(checks['non-empty-if-present'].evaluate.call(checkContext, node));
		assert.equal(checkContext._data, '');
	});

	it('should return false if the element is not a submit or reset input', function () {
		var node = document.createElement('input');
		node.setAttribute('type', 'text');
		fixture.appendChild(node);
		assert.isFalse(checks['non-empty-if-present'].evaluate.call(checkContext, node));

		node = document.createElement('input');
		node.setAttribute('type', 'button');
		fixture.appendChild(node);
		assert.isFalse(checks['non-empty-if-present'].evaluate.call(checkContext, node));

		node = document.createElement('button');
		node.setAttribute('type', 'submit');
		fixture.appendChild(node);
		assert.isFalse(checks['non-empty-if-present'].evaluate.call(checkContext, node));
	});

});
