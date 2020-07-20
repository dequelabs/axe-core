describe('svg-non-empty-title tests', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var checkSetup = axe.testUtils.checkSetup;
	var checkEvaluate = axe.testUtils.getCheckEvaluate('svg-non-empty-title');

	afterEach(function() {
		fixture.innerHTML = '';
	});

	it('returns true if the element has a `title` child', function() {
		var checkArgs = checkSetup(
			'<svg id="target"><title>Time II: Party</title></svg>'
		);
		assert.isTrue(checkEvaluate.apply(null, checkArgs));
	});

	it('returns true if the `title` child has text nested in another element', function() {
		var checkArgs = checkSetup(
			'<svg id="target"><title><g>Time II: Party</g></title></svg>'
		);
		assert.isTrue(checkEvaluate.apply(null, checkArgs));
	});

	it('returns false if the element has no `title` child', function() {
		var checkArgs = checkSetup('<svg id="target"></svg>');
		assert.isFalse(checkEvaluate.apply(null, checkArgs));
	});

	it('returns false if the `title` child is empty', function() {
		var checkArgs = checkSetup('<svg id="target"><title></title></svg>');
		assert.isFalse(checkEvaluate.apply(null, checkArgs));
	});

	it('returns false if the `title` is a grandchild', function() {
		var checkArgs = checkSetup(
			'<svg id="target"><circle><title>Time II: Party</title></circle></svg>'
		);
		assert.isFalse(checkEvaluate.apply(null, checkArgs));
	});

	it('returns false if the `title` child has only whitespace', function() {
		var checkArgs = checkSetup(
			'<svg id="target"><title> \t\r\n </title></svg>'
		);
		assert.isFalse(checkEvaluate.apply(null, checkArgs));
	});

	it('returns false if there are multiple titles, and the first is empty', function() {
		var checkArgs = checkSetup(
			'<svg id="target"><title></title><title>Time II: Party</title></svg>'
		);
		assert.isFalse(checkEvaluate.apply(null, checkArgs));
	});

	describe('Serial Virtual Node', function() {
		it('returns true if the element has a `title` child', function() {
			var serialNode = new axe.SerialVirtualNode({
				nodeName: 'svg'
			});
			var child = new axe.SerialVirtualNode({
				nodeName: 'title'
			});
			var text = new axe.SerialVirtualNode({
				nodeName: '#text',
				nodeType: 3,
				nodeValue: 'Time II: Party'
			});
			child.parent = serialNode;
			child.children = [text];
			serialNode.children = [child];

			assert.isTrue(checkEvaluate(null, {}, serialNode));
		});

		it('returns false if the element has no `title` child', function() {
			var serialNode = new axe.SerialVirtualNode({
				nodeName: 'svg'
			});
			serialNode.children = [];

			assert.isFalse(checkEvaluate(null, {}, serialNode));
		});

		it('returns undefined if the element has empty children', function() {
			var serialNode = new axe.SerialVirtualNode({
				nodeName: 'svg'
			});

			assert.isUndefined(checkEvaluate(null, {}, serialNode));
		});
	});
});
