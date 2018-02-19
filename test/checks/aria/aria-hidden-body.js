describe('aria-hidden', function () {
	'use strict';

	var node = document.getElementsByTagName('body')[0];
	var checkContext = axe.testUtils.MockCheckContext();

	afterEach(function () {
		checkContext.reset();
		node.removeAttribute('aria-hidden');
	});

	it('should not be present on document.body', function () {
		assert.isTrue(checks['aria-hidden-body'].evaluate.call(checkContext, node));
	});

	it('fails appropriately if aria-hidden=true on document.body', function () {
		node.setAttribute('aria-hidden', 'true');
		assert.isFalse(checks['aria-hidden-body'].evaluate.call(checkContext, node));
	});

	it('passes if aria-hidden=false on document.body', function () {
		node.setAttribute('aria-hidden', 'false');
		assert.isTrue(checks['aria-hidden-body'].evaluate.call(checkContext, node));
	});

});
