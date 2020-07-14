describe('aria-labelledby', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var queryFixture = axe.testUtils.queryFixture;

	afterEach(function() {
		fixture.innerHTML = '';
	});

	it('should return true if an aria-labelledby and its target is present', function() {
		var node = queryFixture(
			'<div id="target" aria-labelledby="woohoo"></div><div id="woohoo">bananas</div>'
		);

		assert.isTrue(axe.testUtils.getCheckEvaluate('aria-labelledby')(node));
	});

	it('should return true if only one element referenced by aria-labelledby has visible text', function() {
		var node = queryFixture(
			'<div id="target" aria-labelledby="woohoo noexist hehe"></div><div id="woohoo">bananas</div>'
		);

		assert.isTrue(axe.testUtils.getCheckEvaluate('aria-labelledby')(node));
	});

	it('should return false if an aria-labelledby is not present', function() {
		var node = queryFixture('<div id="target"></div>');

		assert.isFalse(axe.testUtils.getCheckEvaluate('aria-labelledby')(node));
	});

	it('should return true if an aria-labelledby is present that references hidden elements', function() {
		var node = queryFixture(
			'<div id="target" aria-labelledby="woohoo noexist hehe"></div><div id="woohoo" style="display:none">bananas</div>'
		);

		assert.isTrue(axe.testUtils.getCheckEvaluate('aria-labelledby')(node));
	});

	it('should return false if an aria-labelledby is present, but references an element with only hidden content', function() {
		var node = queryFixture(
			'<div id="target" aria-labelledby="woohoo noexist hehe"></div><div id="woohoo"><span style="display: none">bananas</span></div>'
		);

		assert.isFalse(axe.testUtils.getCheckEvaluate('aria-labelledby')(node));
	});

	it('should return true if an aria-labelledby is present that references elements with has aria-hidden=true', function() {
		var node = queryFixture(
			'<div id="target" aria-labelledby="woohoo"></div><div id="woohoo" aria-hidden="true">bananas</div>'
		);

		assert.isTrue(axe.testUtils.getCheckEvaluate('aria-labelledby')(node));
	});

	it('should return false if an aria-labelledby is present that references elements with has aria-hidden=true in the content', function() {
		var node = queryFixture(
			'<div id="target" aria-labelledby="woohoo"></div><div id="woohoo"><span aria-hidden="true">bananas</span></div>'
		);

		assert.isFalse(axe.testUtils.getCheckEvaluate('aria-labelledby')(node));
	});

	describe('SerialVirtualNode', function() {
		it('should return false if an aria-labelledby is not present', function() {
			var node = new axe.SerialVirtualNode({
				nodeName: 'div'
			});

			assert.isFalse(axe.testUtils.getCheckEvaluate('aria-labelledby')(node));
		});

		it('should return undefined if an aria-labelledby is present', function() {
			var node = new axe.SerialVirtualNode({
				nodeName: 'div',
				attributes: {
					'aria-labelledby': 'woohoo'
				}
			});

			assert.isUndefined(
				axe.testUtils.getCheckEvaluate('aria-labelledby')(node)
			);
		});
	});
});
