describe('implicit-label', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var fixtureSetup = axe.testUtils.fixtureSetup;

	afterEach(function () {
		fixture.innerHTML = '';
		axe._tree = undefined;
	});

	it('should return false if an empty label is present', function () {
		fixtureSetup('<label><input type="text" id="target"></label>');
		var node = fixture.querySelector('#target');
		var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
		assert.isFalse(checks['implicit-label'].evaluate(node, {}, virtualNode));
	});

	it('should return false if an invisible non-empty label is present', function () {
		fixtureSetup('<label><span style="display: none">Text</span> <input type="text" id="target"></label>');
		var node = fixture.querySelector('#target');
		var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
		assert.isFalse(checks['implicit-label'].evaluate(node, {}, virtualNode));
	});

	it('should return true if a non-empty label is present', function () {
		fixtureSetup('<label>Text <input type="text" id="target"></label>');
		var node = fixture.querySelector('#target');
		var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
		assert.isTrue(checks['implicit-label'].evaluate(node, {}, virtualNode));
	});

	it('should return false if a label is not present', function () {
		var node = document.createElement('input');
		node.type = 'text';
		fixtureSetup(node);

		var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
		assert.isFalse(checks['implicit-label'].evaluate(node, {}, virtualNode));
	});

});
