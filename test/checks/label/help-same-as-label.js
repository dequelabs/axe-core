describe('help-same-as-label', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var queryFixture = axe.testUtils.queryFixture;

	afterEach(function() {
		fixture.innerHTML = '';
		axe._tree = undefined;
	});

	it('should return true if an element has a label and a title with the same text', function() {
		var vNode = queryFixture(
			'<input id="target" type="text" title="Duplicate" aria-label="Duplicate" />'
		);
		assert.isTrue(
			axe.testUtils.getCheckEvaluate('help-same-as-label')(null, {}, vNode)
		);
	});

	it('should return true if an element has a label and aria-describedby with the same text', function() {
		var vNode = queryFixture(
			'<div id="dby">Duplicate</div><input id="target" type="text" aria-label="Duplicate" aria-describedby="dby" />'
		);
		assert.isTrue(
			axe.testUtils.getCheckEvaluate('help-same-as-label')(null, {}, vNode)
		);
	});

	it('should return false if input only has a title', function() {
		var vNode = queryFixture(
			'<input id="target" type="text" title="Duplicate" />'
		);
		assert.isFalse(
			axe.testUtils.getCheckEvaluate('help-same-as-label')(null, {}, vNode)
		);
	});

	it('should return true if an input only has aria-describedby', function() {
		var vNode = queryFixture(
			'<div id="dby">Duplicate</div><input id="target" type="text" aria-describedby="dby" />'
		);
		assert.isFalse(
			axe.testUtils.getCheckEvaluate('help-same-as-label')(null, {}, vNode)
		);
	});

	describe('SerialVirtualNode', function() {
		it('should return true if an element has a label and a title with the same text', function() {
			var vNode = new axe.SerialVirtualNode({
				nodeName: 'input',
				attributes: {
					type: 'text',
					title: 'Duplicate',
					'aria-label': 'Duplicate'
				}
			});
			assert.isTrue(
				axe.testUtils.getCheckEvaluate('help-same-as-label')(null, {}, vNode)
			);
		});

		it('should return undefined if an aria-describedby is present', function() {
			var node = new axe.SerialVirtualNode({
				nodeName: 'input',
				attributes: {
					type: 'text',
					'aria-describedby': 'woohoo'
				}
			});

			assert.isUndefined(
				axe.testUtils.getCheckEvaluate('help-same-as-label')(node)
			);
		});

		it('should return undefined if input only has a title', function() {
			var vNode = new axe.SerialVirtualNode({
				nodeName: 'input',
				attributes: {
					type: 'text',
					title: 'Duplicate'
				}
			});
			assert.isUndefined(
				axe.testUtils.getCheckEvaluate('help-same-as-label')(null, {}, vNode)
			);
		});
	});
});
