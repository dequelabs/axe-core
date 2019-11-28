describe('aria.arialabelText', function() {
	'use strict';
	var aria = axe.commons.aria;

	it('returns "" if there is no aria-label', function() {
		var vNode = new axe.SerialVirtualNode({ nodeName: 'div' });
		assert.equal(aria.arialabelText(vNode), '');
	});

	it('returns the aria-label attribute of serialised nodes', function() {
		var label = ' my label ';
		var vNode = new axe.SerialVirtualNode({
			nodeName: 'div',
			attributes: { 'aria-label': label }
		});
		assert.equal(aria.arialabelText(vNode), label);
	});

	it('returns the aria-label attribute of virtual nodes', function() {
		var node = document.createElement('div');
		var label = ' my label ';
		node.setAttribute('aria-label', label);
		var vNode = new axe.VirtualNode(node);
		assert.equal(aria.arialabelText(vNode), label);
	});

	it('returns "" if there is no aria-label', function() {
		var node = document.createElement('div');
		var vNode = new axe.VirtualNode(node);
		assert.equal(aria.arialabelText(vNode), '');
	});

	it('returns "" if the node is not an element', function() {
		var node = document.createTextNode('my text node');
		assert.equal(aria.arialabelText(node), '');
	});

	it('looks up the node in the virtualNode tree', function() {
		var label = 'harambe';
		var node = document.createElement('div');
		node.setAttribute('aria-label', label);

		axe.utils.getFlattenedTree(node);
		assert.equal(aria.arialabelText(node), label);
	});
});
