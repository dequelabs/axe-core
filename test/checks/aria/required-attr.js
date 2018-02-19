describe('aria-required-attr', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var checkContext = axe.testUtils.MockCheckContext();

	afterEach(function () {
		fixture.innerHTML = '';
		checkContext.reset();
	});

	it('should detect missing attributes', function () {
		var node = document.createElement('div');
		node.setAttribute('role', 'slider');
		node.id = 'test';
		node.tabIndex = 1;
		fixture.appendChild(node);

		assert.isFalse(checks['aria-required-attr'].evaluate.call(checkContext, node));
		assert.deepEqual(checkContext._data, ['aria-valuenow', 'aria-valuemax', 'aria-valuemin']);
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

	describe('options', function () {
		it('should require provided attribute names for a role', function () {
			axe.commons.aria.lookupTable.role.mccheddarton = {
				type: 'widget',
				attributes: {
					required: ['aria-valuemax']
				},
				owned: null,
				nameFrom: ['author'],
				context: null
			};
			fixture.innerHTML = '<div role="mccheddarton" id="target"></div>';
			var target = fixture.children[0];
			var options = {
				'mccheddarton': ['aria-snuggles']
			};
			assert.isFalse(checks['aria-required-attr'].evaluate.call(checkContext, target, options));
			assert.deepEqual(checkContext._data, ['aria-snuggles', 'aria-valuemax']);
			delete axe.commons.aria.lookupTable.role.mccheddarton;
		});
	});
});