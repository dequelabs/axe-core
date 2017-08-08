describe('title-only', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
		axe._tree = undefined;
	});

	it('should return true if an element only has a title', function () {
		var node = document.createElement('input');
		node.type = 'text';
		node.title = 'Duplicate';

		fixture.appendChild(node);

		var tree = axe._tree = axe.utils.getFlattenedTree(fixture);

		assert.isTrue(checks['title-only'].evaluate(node, undefined, axe.utils.getNodeFromTree(tree[0], node)));
		node.setAttribute('aria-label', 'woop');
		assert.isFalse(checks['title-only'].evaluate(node, undefined, axe.utils.getNodeFromTree(tree[0], node)));
	});

	it('should return true if an element only has aria-describedby', function () {
		var node = document.createElement('input');
		node.type = 'text';
		node.setAttribute('aria-describedby', 'dby');
		var dby = document.createElement('div');
		dby.id = 'dby';
		dby.innerHTML = 'woop';

		fixture.appendChild(node);
		fixture.appendChild(dby);

		var tree = axe._tree = axe.utils.getFlattenedTree(fixture);

		assert.isTrue(checks['title-only'].evaluate(node, undefined, axe.utils.getNodeFromTree(tree[0], node)));
		node.setAttribute('aria-label', 'woop');
		assert.isFalse(checks['title-only'].evaluate(node, undefined, axe.utils.getNodeFromTree(tree[0], node)));
	});

});