describe('dom.isNode', function () {
	'use strict';

	it('nodes', function () {
		var node;
		node = document;
		assert.isTrue(axe.commons.dom.isNode(node), 'Document');

		node = document.body;
		assert.isTrue(axe.commons.dom.isNode(node), 'Body');

		node = document.documentElement;
		assert.isTrue(axe.commons.dom.isNode(node), 'Document Element');

		node = document.createTextNode('cats');
		assert.isTrue(axe.commons.dom.isNode(node), 'Text Nodes');

		node = document.createElement('div');
		assert.isTrue(axe.commons.dom.isNode(node), 'Elements');

		node = document.createComment('div');
		assert.isTrue(axe.commons.dom.isNode(node), 'Comment nodes');

		node = document.createDocumentFragment();
		assert.isTrue(axe.commons.dom.isNode(node), 'Document fragments');
	});

	it('non-nodes', function () {
		var node;

		node = {};
		assert.isFalse(axe.commons.dom.isNode(node));

		node = null;
		assert.isFalse(axe.commons.dom.isNode(node));

		node = window;
		assert.isFalse(axe.commons.dom.isNode(node));

		node = [];
		assert.isFalse(axe.commons.dom.isNode(node));

		node = 'cats';
		assert.isFalse(axe.commons.dom.isNode(node));

		node = undefined;
		assert.isFalse(axe.commons.dom.isNode(node));

		node = false;
		assert.isFalse(axe.commons.dom.isNode(node));
	});
});