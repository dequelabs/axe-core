describe('dom.isNode', function () {
	'use strict';

	var isNode = kslib.dom.isNode;

	it('nodes', function () {
		var node;
		node = document;
		assert.ok(isNode(node), 'Document');

		node = document.body;
		assert.ok(isNode(node), 'Body');

		node = document.documentElement;
		assert.ok(isNode(node), 'Document Element');

		node = document.createTextNode('cats');
		assert.ok(isNode(node), 'Text Nodes');

		node = document.createElement('div');
		assert.ok(isNode(node), 'Elements');

		node = document.createComment('div');
		assert.ok(isNode(node), 'Comment nodes');

		node = document.createDocumentFragment();
		assert.ok(isNode(node), 'Document fragments');
	});

	it('non-nodes', function () {
		var node;

		node = {};
		assert.ok(!isNode(node));

		node = null;
		assert.ok(!isNode(node));

		node = window;
		assert.ok(!isNode(node));

		node = [];
		assert.ok(!isNode(node));

		node = 'cats';
		assert.ok(!isNode(node));

		node = undefined;
		assert.ok(!isNode(node));

		node = false;
		assert.ok(!isNode(node));
	});
});
