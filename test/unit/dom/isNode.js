describe('dom.isNode', function () {
	'use strict';

	it('nodes', function () {
		var node;
		node = document;
		assert.isTrue(kslib.dom.isNode(node), 'Document');

		node = document.body;
		assert.isTrue(kslib.dom.isNode(node), 'Body');

		node = document.documentElement;
		assert.isTrue(kslib.dom.isNode(node), 'Document Element');

		node = document.createTextNode('cats');
		assert.isTrue(kslib.dom.isNode(node), 'Text Nodes');

		node = document.createElement('div');
		assert.isTrue(kslib.dom.isNode(node), 'Elements');

		node = document.createComment('div');
		assert.isTrue(kslib.dom.isNode(node), 'Comment nodes');

		node = document.createDocumentFragment();
		assert.isTrue(kslib.dom.isNode(node), 'Document fragments');
	});

	it('non-nodes', function () {
		var node;

		node = {};
		assert.isFalse(kslib.dom.isNode(node));

		node = null;
		assert.isFalse(kslib.dom.isNode(node));

		node = window;
		assert.isFalse(kslib.dom.isNode(node));

		node = [];
		assert.isFalse(kslib.dom.isNode(node));

		node = 'cats';
		assert.isFalse(kslib.dom.isNode(node));

		node = undefined;
		assert.isFalse(kslib.dom.isNode(node));

		node = false;
		assert.isFalse(kslib.dom.isNode(node));
	});
});