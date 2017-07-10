describe('dom.findUp', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var shadowSupport = axe.testUtils.shadowSupport;

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should find parents based on selector', function () {
		fixture.innerHTML = '<div class="target"><div id="target" class="target"><span><span><span><div>' +
			'<div><div id="start"></div></div></div></span></span></span></div></div>';

		var start = document.getElementById('start'),
			target = document.getElementById('target');

		assert.equal(axe.commons.dom.findUp(start, '.target'), target, 'Should find it!');


	});

	it('should return null if it cant find a match anywhere in the document', function () {
		fixture.innerHTML = '<div id="start"></div>';
		var start = document.getElementById('start');

		assert.isNull(axe.commons.dom.findUp(start, '.nomatchyplzkthx'));

	});

	it('should return null if it cant find a match anywhere above the start', function () {
		fixture.innerHTML = '<div id="start"></div><div class="target"></div>';
		var start = document.getElementById('start');

		assert.isNull(axe.commons.dom.findUp(start, '.target'));

	});

	it('should walk up the assigned slot', function () {
		function createContentSlotted() {
			var group = document.createElement('div');
			group.innerHTML = '<div id="target" style="display:none;">Stuff<slot></slot></div>';
			return group;
		}
		function makeShadowTree(node) {
			var root = node.attachShadow({mode: 'open'});
			var div = document.createElement('div');
			root.appendChild(div);
			div.appendChild(createContentSlotted());
		}
		if (shadowSupport.v1) {
			fixture.innerHTML = '<label><div><p><a>hello</a></p></div></label>';
			makeShadowTree(fixture.querySelector('div'));
			var tree = axe.utils.getFlattenedTree(fixture.firstChild);
			var el = axe.utils.querySelectorAll(tree, 'a')[0];
			assert.equal(axe.commons.dom.findUp(el.actualNode, 'label'), fixture.firstChild);
		}
	});

	it('should walk up the shadow DOM', function () {
		function createContent() {
			var group = document.createElement('div');
			group.innerHTML = '<a>thing</a>';
			return group;
		}
		function makeShadowTree(node) {
			var root = node.attachShadow({mode: 'open'});
			var div = document.createElement('div');
			root.appendChild(div);
			div.appendChild(createContent());
		}
		if (shadowSupport.v1) {
			fixture.innerHTML = '<label><div></div></label>';
			makeShadowTree(fixture.querySelector('div'));
			var tree = axe.utils.getFlattenedTree(fixture.firstChild);
			var el = axe.utils.querySelectorAll(tree, 'a')[0];
			assert.equal(axe.commons.dom.findUp(el.actualNode, 'label'), fixture.firstChild);
		}
	});
});