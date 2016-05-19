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
		node.setAttribute('aria-relevant', 'additions removals');
		fixture.appendChild(node);

		assert.isTrue(checks['aria-valid-attr-value'].evaluate.call(checkContext, node));
		assert.isNull(checkContext._data);
	});

	it('should return true if idref(s) values are valid', function () {
		var node = document.createElement('div');
		var testTgt1 = document.createElement('div');
		var testTgt2 = document.createElement('div');

		node.id = 'test';
		testTgt1.id = 'test_tgt1';
		testTgt2.id = 'test_tgt2';
		node.setAttribute('aria-owns', 'test_tgt1 test_tgt2');
		node.setAttribute('aria-activedescendant', 'test_tgt1');

		node.tabIndex = 1;
		fixture.appendChild(node);
		fixture.appendChild(testTgt1);
		fixture.appendChild(testTgt2);

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

	it('should determine attribute validity by calling axe.commons.aria.validateAttrValue', function () {
		var node = document.createElement('div');
		node.id = 'test';
		node.tabIndex = 1;
		node.setAttribute('aria-selected', 'maybe');
		node.setAttribute('aria-live', 'dead');
		fixture.appendChild(node);

		var orig = axe.commons.aria.validateAttrValue;
		var called = 0;
		axe.commons.aria.validateAttrValue = function (nd, attrName) {
			assert.equal(nd, node);
			assert.match(attrName, /^aria-/);
			called++;
			return true;
		};
		assert.isTrue(checks['aria-valid-attr-value'].evaluate.call(checkContext, node));
		assert.isNull(checkContext._data);
		assert.equal(called, 2);

		axe.commons.aria.validateAttrValue = orig;
	});

	describe('options', function () {
		it('should exclude supplied attributes', function () {
			fixture.innerHTML = '<div id="target" aria-live="nope" aria-describedby="no exist k thx"></div>';
			var target = fixture.querySelector('#target');
			assert.isTrue(checks['aria-valid-attr-value'].evaluate.call(checkContext, target, ['aria-live', 'aria-describedby']));
		});
	});

});
