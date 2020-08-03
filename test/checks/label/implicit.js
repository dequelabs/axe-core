describe('implicit-label', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var fixtureSetup = axe.testUtils.fixtureSetup;

	afterEach(function() {
		fixture.innerHTML = '';
		axe._tree = undefined;
	});

	it('should return false if an empty label is present', function() {
		fixtureSetup('<label><input type="text" id="target"></label>');
		var node = fixture.querySelector('#target');
		var virtualNode = axe.utils.getNodeFromTree(node);
		assert.isFalse(
			axe.testUtils.getCheckEvaluate('implicit-label')(null, {}, virtualNode)
		);
	});

	it('should return false if an invisible non-empty label is present', function() {
		fixtureSetup(
			'<label><span style="display: none">Text</span> <input type="text" id="target"></label>'
		);
		var node = fixture.querySelector('#target');
		var virtualNode = axe.utils.getNodeFromTree(node);
		assert.isFalse(
			axe.testUtils.getCheckEvaluate('implicit-label')(null, {}, virtualNode)
		);
	});

	it('should return true if a non-empty label is present', function() {
		fixtureSetup('<label>Text <input type="text" id="target"></label>');
		var node = fixture.querySelector('#target');
		var virtualNode = axe.utils.getNodeFromTree(node);
		assert.isTrue(
			axe.testUtils.getCheckEvaluate('implicit-label')(null, {}, virtualNode)
		);
	});

	it('should return false if a label is not present', function() {
		var node = document.createElement('input');
		node.type = 'text';
		fixtureSetup(node);

		var virtualNode = axe.utils.getNodeFromTree(node);
		assert.isFalse(
			axe.testUtils.getCheckEvaluate('implicit-label')(null, {}, virtualNode)
		);
	});

	describe('SerialVirtualNode', function() {
		it('should return false if no implicit label', function() {
			var virtualNode = new axe.SerialVirtualNode({
				nodeName: 'input',
				attributes: {
					type: 'text'
				}
			});
			virtualNode.parent = null;

			assert.isFalse(
				axe.testUtils.getCheckEvaluate('implicit-label')(null, {}, virtualNode)
			);
		});

		it('should return undefined if tree is not complete', function() {
			var virtualNode = new axe.SerialVirtualNode({
				nodeName: 'input',
				attributes: {
					type: 'text'
				}
			});

			assert.isUndefined(
				axe.testUtils.getCheckEvaluate('implicit-label')(null, {}, virtualNode)
			);
		});
	});
});
