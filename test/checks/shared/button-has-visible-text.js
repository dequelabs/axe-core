describe('button-has-visible-text', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var checkSetup = axe.testUtils.checkSetup;
	var checkContext = axe.testUtils.MockCheckContext();

	afterEach(function() {
		fixture.innerHTML = '';
		checkContext.reset();
	});

	it('should return false if button element is empty', function() {
		var checkArgs = checkSetup('<button></button>', 'button');

		assert.isFalse(
			axe.testUtils
				.getCheckEvaluate('button-has-visible-text')
				.apply(checkContext, checkArgs)
		);
	});

	it('should return true if a button element has text', function() {
		var checkArgs = checkSetup('<button>Name</button>', 'button');

		assert.isTrue(
			axe.testUtils
				.getCheckEvaluate('button-has-visible-text')
				.apply(checkContext, checkArgs)
		);
	});

	it('should return true if ARIA button has text', function() {
		var checkArgs = checkSetup(
			'<div role="button">Text</div>',
			'[role=button]'
		);

		assert.isTrue(
			axe.testUtils
				.getCheckEvaluate('button-has-visible-text')
				.apply(checkContext, checkArgs)
		);
	});

	it('should return false if ARIA button has no text', function() {
		var checkArgs = checkSetup('<div role="button"></div>', '[role=button]');

		assert.isFalse(
			axe.testUtils
				.getCheckEvaluate('button-has-visible-text')
				.apply(checkContext, checkArgs)
		);
	});

	describe('SerialVirtualNode', function() {
		it('should return undefined if no other attributes are provided', function() {
			var node = new axe.SerialVirtualNode({
				nodeName: 'button'
			});

			assert.isUndefined(
				axe.testUtils.getCheckEvaluate('has-visible-text')(null, {}, node)
			);
		});
	});
});
