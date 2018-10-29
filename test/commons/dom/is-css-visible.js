describe('dom.isCssVisible', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var shadowSupported = axe.testUtils.shadowSupport.v1;

	afterEach(function() {
		document.getElementById('fixture').innerHTML = '';
	});

	it('should return false if computedStyle return null for whatever reason', function() {
		var orig = window.getComputedStyle;
		var fakeNode = {
			nodeType: Node.ELEMENT_NODE,
			nodeName: 'div'
		};
		window.getComputedStyle = function() {
			return null;
		};
		assert.isFalse(axe.commons.dom.isCssVisible(fakeNode));
		window.getComputedStyle = orig;
	});

	it('should return true on static-positioned, visible elements', function() {
		fixture.innerHTML = '<div id="target">Hello!</div>';
		var el = document.getElementById('target');
		assert.isTrue(axe.commons.dom.isCssVisible(el));
	});

	it('should return true on absolutely positioned elements that are on-screen', function() {
		fixture.innerHTML =
			'<div id="target" style="position: absolute; left: 10px; right: 10px">hi</div>';
		var el = document.getElementById('target');
		assert.isTrue(axe.commons.dom.isCssVisible(el));
	});

	it('should return true for off-screen and aria-hidden element', function() {
		fixture.innerHTML =
			'<button id="target" aria-hidden=“true” style=“position:absolute: top:-999em”>I am Css Visible</button>';
		var el = document.getElementById('target');
		assert.isTrue(axe.commons.dom.isCssVisible(el));
	});

	it('should return true on fixed position elements that are on-screen', function() {
		fixture.innerHTML =
			'<div id="target" style="position:fixed; bottom: 0; left: 0;">StickySticky</div>';
		var el = document.getElementById('target');
		assert.isTrue(axe.commons.dom.isCssVisible(el));
	});

	it('should return true for off-screen absolutely positioned element', function() {
		fixture.innerHTML =
			'<div id="target" style="position: absolute; left: -9999px">Hi</div>';
		var el = document.getElementById('target');
		assert.isTrue(axe.commons.dom.isCssVisible(el));
	});

	it('should return true for off-screen fixed positioned element', function() {
		fixture.innerHTML =
			'<div id="target" style="position: fixed; top: -9999px">Hi</div>';
		var el = document.getElementById('target');
		assert.isTrue(axe.commons.dom.isCssVisible(el));
	});

	it('should return true on detached elements', function() {
		var el = document.createElement('div');
		el.innerHTML = 'I am not visible because I am detached!';
		assert.isFalse(axe.commons.dom.isCssVisible(el));
	});

	it('should return true on a document', function() {
		assert.isTrue(axe.commons.dom.isCssVisible(document));
	});

	it('should return true if positioned staticly but top/left is set', function() {
		fixture.innerHTML =
			'<div id="target" style="top: -9999px; left: -9999px;' +
			'right: -9999px; bottom: -9999px;">Hi</div>';
		var el = document.getElementById('target');
		assert.isTrue(axe.commons.dom.isCssVisible(el));
	});

	it('should return true, and not be affected by `aria-hidden`', function() {
		fixture.innerHTML =
			'<div id="target" aria-hidden="true">Hidden from screen readers</div>';

		var el = document.getElementById('target');
		assert.isTrue(axe.commons.dom.isCssVisible(el));
	});

	it('should return true and not calculate position on parents', function() {
		fixture.innerHTML =
			'<div style="position: absolute; top: -400px; left: -400px;">' +
			'<div id="target" style="position: absolute; top: 500px; left: 500px">Hi</div>' +
			'</div>';

		var el = document.getElementById('target');
		assert.isTrue(axe.commons.dom.isCssVisible(el));
	});

	it('should return false and consider know how `visibility` of parent is configured', function() {
		fixture.innerHTML =
			'<div style="visibility: hidden;">' +
			'<div id="target" style="visibility: visible;">Hi</div>' +
			'</div>';

		var el = document.getElementById('target');
		assert.isFalse(axe.commons.dom.isCssVisible(el));
	});

	it('should correctly handle visible slotted elements', function() {
		function createContentSlotted() {
			var group = document.createElement('div');
			group.innerHTML = '<div id="target">Stuff<slot></slot></div>';
			return group;
		}
		function makeShadowTree(node) {
			var root = node.attachShadow({ mode: 'open' });
			var div = document.createElement('div');
			root.appendChild(div);
			div.appendChild(createContentSlotted());
		}
		if (shadowSupported) {
			fixture.innerHTML = '<div><a>hello</a></div>';
			makeShadowTree(fixture.firstChild);
			var tree = axe.utils.getFlattenedTree(fixture.firstChild);
			var el = axe.utils.querySelectorAll(tree, 'a')[0];
			assert.isTrue(axe.commons.dom.isCssVisible(el.actualNode));
		}
	});

	it('should correctly handle hidden slotted elements', function() {
		function createContentSlotted() {
			var group = document.createElement('div');
			group.innerHTML =
				'<div id="target" style="display:none;">Stuff<slot></slot></div>';
			return group;
		}
		function makeShadowTree(node) {
			var root = node.attachShadow({ mode: 'open' });
			var div = document.createElement('div');
			root.appendChild(div);
			div.appendChild(createContentSlotted());
		}
		if (shadowSupported) {
			fixture.innerHTML = '<div><p><a>hello</a></p></div>';
			makeShadowTree(fixture.firstChild);
			var tree = axe.utils.getFlattenedTree(fixture.firstChild);
			var el = axe.utils.querySelectorAll(tree, 'a')[0];
			assert.isFalse(axe.commons.dom.isCssVisible(el.actualNode));
		}
	});
});
