describe('link-text', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var fixtureSetup = axe.testUtils.fixtureSetup;
	var shadowSupport = axe.testUtils.shadowSupport.v1;

	afterEach(function() {
		fixture.innerHTML = '';
		axe._tree = undefined;
	});

	it('should return true if title text is different then other "a" tag and link text is same', function() {
		var node = document.createElement('a');
		node.setAttribute('title', 'woohoo');
		node.setAttribute('href', '#1');
		node.textContent = 'some text';
		var node2 = document.createElement('a');
		node2.setAttribute('title', 'woohoo2');
		node2.setAttribute('href', '#2');
		node2.textContent = 'some text';
		fixtureSetup([node, node2]);

		assert.isTrue(checks['link-text'].evaluate(node));
	});

	it('should return true if both links have the same href', function() {
		var node = document.createElement('a');
		node.setAttribute('title', 'woohoo');
		node.setAttribute('href', '#1');
		node.textContent = 'some text';
		var node2 = document.createElement('a');
		node2.setAttribute('title', 'woohoo');
		node2.setAttribute('href', '#1');
		node2.textContent = 'some text';
		fixtureSetup([node, node2]);

		assert.isTrue(checks['link-text'].evaluate(node));
	});

	it('should return true if link text different then other "a" tag and title text is same', function() {
		var node = document.createElement('a');
		node.setAttribute('title', 'woohoo');
		node.setAttribute('href', '#1');
		node.textContent = 'some text';
		var node2 = document.createElement('a');
		node2.setAttribute('title', 'woohoo');
		node2.setAttribute('href', '#2');
		node2.textContent = 'some text1';
		fixtureSetup([node, node2]);

		assert.isTrue(checks['link-text'].evaluate(node));
	});

	it('should return false if both link and title text is the same as other "a" tag', function() {
		var node = document.createElement('a');
		node.setAttribute('title', 'woohoo');
		node.setAttribute('href', '#1');
		node.textContent = 'some text';
		var node2 = document.createElement('a');
		node2.setAttribute('title', 'woohoo');
		node2.setAttribute('href', '#2');
		node2.textContent = 'some text';
		fixtureSetup([node, node2]);

		assert.isFalse(checks['link-text'].evaluate(node));
	});

	(shadowSupport ? it : xit)('works on elements in a shadow DOM', function() {
		fixture.innerHTML =
			'<div id="shadow"> <a id="anchor1" href="#1" title="1">some text</a> </div>';
		var shadowRoot = document
			.getElementById('shadow')
			.attachShadow({ mode: 'open' });
		shadowRoot.innerHTML = '<a id="anchor2" href="#2" title="1">some text</a>';
		axe._tree = axe.utils.getFlattenedTree(fixture);

		var anchor1 = document.querySelector('#anchor1');
		var virtualAnchor1 = axe.utils.getNodeFromTree(axe._tree[0], anchor1);
		assert.isTrue(
			checks['link-text'].evaluate(anchor1, undefined, virtualAnchor1)
		);

		var anchor2 = shadowRoot.querySelector('#anchor2');
		var virtualAnchor2 = axe.utils.getNodeFromTree(axe._tree[0], anchor2);
		assert.isTrue(
			checks['link-text'].evaluate(anchor2, undefined, virtualAnchor2)
		);
	});
});
