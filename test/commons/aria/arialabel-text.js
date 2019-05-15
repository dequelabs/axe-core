describe('aria.arialabelText', function() {
	'use strict';
	var aria = axe.commons.aria;

	it('returns "" if there is no aria-label', function() {
		var node = document.createElement('div');
		assert.equal(aria.arialabelText(node), '');
	});

	it('returns the aria-label attribute of nodes', function() {
		var node = document.createElement('div');
		var label = ' my label ';
		node.setAttribute('aria-label', label);
		assert.equal(aria.arialabelText(node), label);
	});

	it('returns the aria-label attribute of virtual nodes', function() {
		var node = document.createElement('div');
		var label = ' my label ';
		node.setAttribute('aria-label', label);
		var vNode = { actualNode: node };
		assert.equal(aria.arialabelText(vNode), label);
	});

	it('returns "" if there is no aria-label', function() {
		var node = document.createElement('div');
		assert.equal(aria.arialabelText(node), '');
	});

	it('returns "" if the node is not an element', function() {
		var node = document.createTextNode('my text node');
		assert.equal(aria.arialabelText(node), '');
	});
});
