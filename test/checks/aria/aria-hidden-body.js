describe('aria-hidden', function() {
	'use strict';

	var checkContext = axe.testUtils.MockCheckContext();
	var queryFixture = axe.testUtils.queryFixture;

	afterEach(function() {
		checkContext.reset();
	});

	it('should not be present on document.body', function() {
		var vNode = queryFixture('<body id="target"></body>');
		assert.isTrue(
			axe.testUtils
				.getCheckEvaluate('aria-hidden-body')
				.call(checkContext, null, {}, vNode)
		);
	});

	it('fails appropriately if aria-hidden=true on document.body', function() {
		var vNode = queryFixture('<body id="target" aria-hidden="true"></body>');
		assert.isFalse(
			axe.testUtils
				.getCheckEvaluate('aria-hidden-body')
				.call(checkContext, null, {}, vNode)
		);
	});

	it('passes if aria-hidden=false on document.body', function() {
		var vNode = queryFixture('<body id="target" aria-hidden="false"></body>');
		assert.isTrue(
			axe.testUtils
				.getCheckEvaluate('aria-hidden-body')
				.call(checkContext, null, {}, vNode)
		);
	});
});
