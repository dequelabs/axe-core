describe('label-content-name-mismatch', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var check = undefined;
	var options = undefined;
	// var checkSetup = axe.testUtils.checkSetup;
	// var shadowSupport = axe.testUtils.shadowSupport;

	beforeEach(function() {
		check = checks['label-content-name-mismatch'];
	});

	afterEach(function() {
		fixture.innerHTML = '';
		check = undefined;
		axe._tree = undefined;
	});

	it('returns false when element has an empty aria-label', function() {
		fixture.innerHTML =
			'<button id="target" name="link" aria-label="">The full label</button>';
		var node = fixture.querySelector('#target');
		var tree = (axe._tree = axe.utils.getFlattenedTree(fixture));
		var vNode = axe.utils.getNodeFromTree(tree[0], node);
		var actual = check.evaluate(node, options, vNode);
		assert.isFalse(actual);
	});

	it('returns false when element has an empty aria-labelledby', function() {
		fixture.innerHTML =
			'<button id="target" name="link" aria-labelledby="">The full label</button>';
		var node = fixture.querySelector('#target');
		var tree = (axe._tree = axe.utils.getFlattenedTree(fixture));
		var actual = check.evaluate(
			node,
			options,
			axe.utils.getNodeFromTree(tree[0], node)
		);
		assert.isFalse(actual);
	});

	it('returns false when element has no text content', function() {
		fixture.innerHTML =
			'<button id="target" name="link" aria-label="Ok"></button>';
		var node = fixture.querySelector('#target');
		var tree = (axe._tree = axe.utils.getFlattenedTree(fixture));
		var actual = check.evaluate(
			node,
			options,
			axe.utils.getNodeFromTree(tree[0], node)
		);
		assert.isFalse(actual);
	});

	it('returns false when accessible text does not contain text content', function() {
		fixture.innerHTML =
			'<button id="target" name="link" aria-label="Ok">test page</button>';
		var node = fixture.querySelector('#target');
		var tree = (axe._tree = axe.utils.getFlattenedTree(fixture));
		var actual = check.evaluate(
			node,
			options,
			axe.utils.getNodeFromTree(tree[0], node)
		);
		assert.isFalse(actual);
	});

	it('returns true when visible label and accessible name matches when trailing white spaces are removed', function() {
		fixture.innerHTML =
			'<div id="target" role="link" aria-label="next page ">next page</div>';
		var node = fixture.querySelector('#target');
		var tree = (axe._tree = axe.utils.getFlattenedTree(fixture));
		var actual = check.evaluate(
			node,
			options,
			axe.utils.getNodeFromTree(tree[0], node)
		);
		assert.isTrue(actual);
	});

	it('returns true when visible label and accessible name matches after handling character insensitivity', function() {
		fixture.innerHTML =
			'<div id="target" role="link" aria-label="Next Page">next page</div>';
		var node = fixture.querySelector('#target');
		var tree = (axe._tree = axe.utils.getFlattenedTree(fixture));
		var actual = check.evaluate(
			node,
			options,
			axe.utils.getNodeFromTree(tree[0], node)
		);
		assert.isTrue(actual);
	});

	it('returns true when full visible label is contained in the accessible name', function() {
		fixture.innerHTML =
			'<button id="target" name="link" aria-label="Next Page in the list">Next Page</button>';
		var node = fixture.querySelector('#target');
		var tree = (axe._tree = axe.utils.getFlattenedTree(fixture));
		var actual = check.evaluate(
			node,
			options,
			axe.utils.getNodeFromTree(tree[0], node)
		);
		assert.isTrue(actual);
	});

	it('returns false when visible label doesn’t match accessible name', function() {
		fixture.innerHTML =
			'<div id="target" role="link" aria-label="OK">Next</div>';
		var node = fixture.querySelector('#target');
		var tree = (axe._tree = axe.utils.getFlattenedTree(fixture));
		var vNode = axe.utils.getNodeFromTree(tree[0], node);
		var actual = check.evaluate(node, options, vNode);
		assert.isFalse(actual);
	});

	it('returns false when not all of visible label is included in accessible name', function() {
		fixture.innerHTML =
			'<button id="target" name="link" aria-label="the full">The full label</button>';
		var node = fixture.querySelector('#target');
		var tree = (axe._tree = axe.utils.getFlattenedTree(fixture));
		var vNode = axe.utils.getNodeFromTree(tree[0], node);
		var actual = check.evaluate(node, options, vNode);
		assert.isFalse(actual);
	});
});
