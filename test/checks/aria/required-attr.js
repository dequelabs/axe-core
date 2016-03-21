describe('aria-required-attr', function () {
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

	it('should detect missing attributes', function () {
		var node = document.createElement('div');
		node.setAttribute('role', 'checkbox');
		node.id = 'test';
		node.tabIndex = 1;
		fixture.appendChild(node);

		assert.isFalse(checks['aria-required-attr'].evaluate.call(checkContext, node));
		assert.deepEqual(checkContext._data, ['aria-checked']);


	});

	it('should return true if there is no role', function () {
		var node = document.createElement('div');
		fixture.appendChild(node);

		assert.isTrue(checks['aria-required-attr'].evaluate.call(checkContext, node));
		assert.isNull(checkContext._data);

	});

	it('should determine attribute validity by calling axe.commons.aria.requiredAttr', function () {
		var node = document.createElement('div');
		node.id = 'test';
		node.tabIndex = 1;
		node.setAttribute('role', 'cats');
		node.setAttribute('aria-cats', 'maybe');
		fixture.appendChild(node);

		var orig = axe.commons.aria.requiredAttr;
		var called = 0;
		axe.commons.aria.requiredAttr = function (role) {
			assert.equal(role, 'cats');
			called++;
			return ['aria-cats', 'aria-bats'];
		};
		assert.isFalse(checks['aria-required-attr'].evaluate.call(checkContext, node));
		assert.deepEqual(checkContext._data, ['aria-bats']);
		assert.equal(called, 1);

		axe.commons.aria.requiredAttr = orig;
	});

});