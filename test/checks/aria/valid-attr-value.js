describe('aria-valid-attr-value', function () {
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

	it('should not check the validity of attribute names', function () {
		var node = document.createElement('div');
		node.id = 'test';
		node.tabIndex = 1;
		node.setAttribute('aria-cats', 'true');
		node.setAttribute('aria-selected', 'true');
		fixture.appendChild(node);

		assert.isTrue(checks['aria-valid-attr-value'].evaluate.call(checkContext, node));
		assert.isNull(checkContext._data);


	});

	it('should return true if all values are valid', function () {
		var node = document.createElement('div');
		node.id = 'test';
		node.tabIndex = 1;
		node.setAttribute('aria-selected', 'true');
		node.setAttribute('aria-checked', 'true');
		fixture.appendChild(node);

		assert.isTrue(checks['aria-valid-attr-value'].evaluate.call(checkContext, node));
		assert.isNull(checkContext._data);


	});

	it('should return false if any values are invalid', function () {
		var node = document.createElement('div');
		node.id = 'test';
		node.tabIndex = 1;
		node.setAttribute('aria-live', 'polite');
		node.setAttribute('aria-selected', '0');
		fixture.appendChild(node);

		assert.isFalse(checks['aria-valid-attr-value'].evaluate.call(checkContext, node));
		assert.deepEqual(checkContext._data, ['aria-selected="0"']);
	});

	it('should determine attribute validity by calling kslib.aria.validateAttrValue', function () {
		var node = document.createElement('div');
		node.id = 'test';
		node.tabIndex = 1;
		node.setAttribute('aria-selected', 'maybe');
		node.setAttribute('aria-live', 'dead');
		fixture.appendChild(node);

		var orig = kslib.aria.validateAttrValue;
		var called = 0;
		kslib.aria.validateAttrValue = function (nd, attrName) {
			assert.equal(nd, node);
			assert.match(attrName, /^aria-/);
			called++;
			return true;
		};
		assert.isTrue(checks['aria-valid-attr-value'].evaluate.call(checkContext, node));
		assert.isNull(checkContext._data);
		assert.equal(called, 2);

		kslib.aria.validateAttrValue = orig;
	});

});