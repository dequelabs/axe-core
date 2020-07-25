describe('is-element-focusable', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var checkContext = axe.testUtils.MockCheckContext();

	afterEach(function() {
		fixture.innerHTML = '';
		checkContext.reset();
	});

	it('should return true for div with a tabindex', function() {
		var node = document.createElement('div');
		node.id = 'target';
		node.tabIndex = 1;
		fixture.appendChild(node);

		assert.isTrue(
			axe.testUtils
				.getCheckEvaluate('is-element-focusable')
				.call(checkContext, node)
		);
	});

	it('should return false for natively unfocusable element', function() {
		var node = document.createElement('span');
		node.id = 'target';
		node.role = 'link';
		node.href = '#';
		fixture.appendChild(node);
		assert.isFalse(
			axe.testUtils
				.getCheckEvaluate('is-element-focusable')
				.call(checkContext, node)
		);
	});
});
