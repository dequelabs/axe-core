describe('aria-allowed-attr', function () {
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

	it('should detect incorrectly used attributes', function () {
		var node = document.createElement('div');
		node.setAttribute('role', 'link');
		node.id = 'test';
		node.tabIndex = 1;
		node.setAttribute('aria-selected', 'true');
		fixture.appendChild(node);

		assert.isFalse(checks['aria-allowed-attr'].evaluate.call(checkContext, node));
		assert.deepEqual(checkContext._data, ['aria-selected="true"']);


	});

	it('should not report on required attributes', function () {
		var node = document.createElement('div');
		node.setAttribute('role', 'checkbox');
		node.id = 'test';
		node.tabIndex = 1;
		node.setAttribute('aria-checked', 'true');
		fixture.appendChild(node);

		assert.isTrue(checks['aria-allowed-attr'].evaluate.call(checkContext, node));


	});

	it('should detect incorrectly used attributes - implicit role', function () {
		var node = document.createElement('a');
		node.href = '#';
		node.id = 'test';
		node.tabIndex = 1;
		node.setAttribute('aria-selected', 'true');
		fixture.appendChild(node);

		assert.isFalse(checks['aria-allowed-attr'].evaluate.call(checkContext, node));
		assert.deepEqual(checkContext._data, ['aria-selected="true"']);


	});

	it('should return true if there is no role', function () {
		var node = document.createElement('div');
		node.id = 'test';
		node.tabIndex = 1;
		node.setAttribute('aria-selected', 'true');
		node.setAttribute('aria-checked', 'true');
		fixture.appendChild(node);

		assert.isTrue(checks['aria-allowed-attr'].evaluate.call(checkContext, node));
		assert.isNull(checkContext._data);


	});

	it('should determine attribute validity by calling axe.commons.aria.allowedAttr', function () {
		var node = document.createElement('div');
		node.id = 'test';
		node.tabIndex = 1;
		node.setAttribute('role', 'cats');
		node.setAttribute('aria-cats', 'maybe');
		node.setAttribute('aria-bats', 'dead');
		fixture.appendChild(node);

		var orig = axe.commons.aria.allowedAttr;
		var called = 0;
		axe.commons.aria.allowedAttr = function (role) {
			assert.equal(role, 'cats');
			called++;
			return ['aria-cats', 'aria-bats'];
		};
		assert.isTrue(checks['aria-allowed-attr'].evaluate.call(checkContext, node));
		assert.isNull(checkContext._data);
		assert.equal(called, 1);

		axe.commons.aria.allowedAttr = orig;
	});

	it('should not report on invalid attributes', function () {
		var node = document.createElement('div');
		node.id = 'test';
		node.tabIndex = 1;
		node.setAttribute('aria-cats', 'true');
		node.setAttribute('role', 'dialog');
		fixture.appendChild(node);

		assert.isTrue(checks['aria-allowed-attr'].evaluate.call(checkContext, node));
		assert.isNull(checkContext._data);


	});

});