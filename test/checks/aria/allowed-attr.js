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

	it('should determine attribute validity by calling kslib.aria.allowedAttr', function () {
		var node = document.createElement('div');
		node.id = 'test';
		node.tabIndex = 1;
		node.setAttribute('role', 'cats');
		node.setAttribute('aria-cats', 'maybe');
		node.setAttribute('aria-bats', 'dead');
		fixture.appendChild(node);

		var orig = kslib.aria.allowedAttr;
		var called = 0;
		kslib.aria.allowedAttr = function (role) {
			assert.equal(role, 'cats');
			called++;
			return ['aria-cats', 'aria-bats'];
		};
		assert.isTrue(checks['aria-allowed-attr'].evaluate.call(checkContext, node));
		assert.isNull(checkContext._data);
		assert.equal(called, 1);

		kslib.aria.allowedAttr = orig;
	});

	describe('matches', function () {
		it('should return false on elements with no role or no implicit role', function () {
			var orig = kslib.aria.implicitRole;
			kslib.aria.implicitRole = function (nd) {
				assert.equal(nd, div);
				return null;
			};
			var div = document.createElement('div');
			fixture.appendChild(div);

			assert.isFalse(checks['aria-allowed-attr'].matches(div));
			kslib.aria.implicitRole = orig;
		});

		it('should return false on elements that have no allowed attributes', function () {
			var orig = kslib.aria.allowedAttr;
			kslib.aria.allowedAttr = function (role) {
				assert.equal(role, 'button');
				return null;
			};
			var div = document.createElement('div');
			div.setAttribute('role', 'button');
			fixture.appendChild(div);

			assert.isFalse(checks['aria-allowed-attr'].matches(div));
			kslib.aria.allowedAttr = orig;
		});

		it('should return true on elements that have a role', function () {
			var div = document.createElement('div');
			div.setAttribute('role', 'button');
			fixture.appendChild(div);

			assert.isTrue(checks['aria-allowed-attr'].matches(div));
		});

		it('should return true on elements that have an implicit role', function () {
			var div = document.createElement('a');
			div.setAttribute('href', '#monkeys');
			fixture.appendChild(div);

			assert.isTrue(checks['aria-allowed-attr'].matches(div));
		});
	});

});