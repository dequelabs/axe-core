function createContentHidden() {
	'use strict';
	var group = document.createElement('div');
	group.innerHTML = '<label id="mylabel">Label</label><input aria-labelledby="mylabel" type="text" />';
	return group;
}

function makeShadowTreeHidden(node) {
	'use strict';
	var root = node.attachShadow({mode: 'open'});
	var div = document.createElement('div');
	div.className = 'parent';
	root.appendChild(div);
	div.appendChild(createContentHidden());
}

describe('axe.utils.isHidden', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var shadowSupported = axe.testUtils.shadowSupport.v1;

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should be a function', function () {
		assert.isFunction(axe.utils.isHidden);
	});

	it('should return false on detached elements', function () {
		var el = document.createElement('div');
		el.innerHTML = 'I am not visible because I am detached!';

		assert.isTrue(axe.utils.isHidden(el));
	});

	it('should return false on a document', function () {
		assert.isFalse(axe.utils.isHidden(document));
	});

	it('should return true if `aria-hidden` is set', function () {
		fixture.innerHTML = '<div id="target" aria-hidden="true">Hidden from screen readers</div>';

		var el = document.getElementById('target');
		assert.isTrue(axe.utils.isHidden(el));
	});

	it('should return true if `display: none` is set', function () {
		fixture.innerHTML = '<div id="target" style="display: none">Hidden from screen readers</div>';

		var el = document.getElementById('target');
		assert.isTrue(axe.utils.isHidden(el));
	});

	it('should return true if `aria-hidden` is set on parent', function () {
		fixture.innerHTML = '<div aria-hidden="true"><div id="target">Hidden from screen readers</div></div>';

		var el = document.getElementById('target');
		assert.isTrue(axe.utils.isHidden(el));
	});

	it('should know how `visibility` works', function () {
		fixture.innerHTML = '<div style="visibility: hidden;">' +
				'<div id="target" style="visibility: visible;">Hi</div>' +
			'</div>';

		var el = document.getElementById('target');
		assert.isFalse(axe.utils.isHidden(el));
	});

	it('not hidden: should work when the element is inside shadow DOM', function () {
		var tree, node;

		if (shadowSupported) {
			// shadow DOM v1 - note: v0 is compatible with this code, so no need
			// to specifically test this
			fixture.innerHTML = '<div></div>';
			makeShadowTreeHidden(fixture.firstChild);
			tree = axe.utils.getFlattenedTree(fixture.firstChild);
			node = axe.utils.querySelectorAll(tree, 'input')[0];
			assert.isFalse(axe.utils.isHidden(node.actualNode));
		}
	});

	it('hidden: should work when the element is inside shadow DOM', function () {
		var tree, node;

		if (shadowSupported) {
			// shadow DOM v1 - note: v0 is compatible with this code, so no need
			// to specifically test this
			fixture.innerHTML = '<div style="display:none"></div>';
			makeShadowTreeHidden(fixture.firstChild);
			tree = axe.utils.getFlattenedTree(fixture.firstChild);
			node = axe.utils.querySelectorAll(tree, 'input')[0];
			assert.isTrue(axe.utils.isHidden(node.actualNode));
		}
	});
	it('should work with hiddent slotted elements', function () {
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
		if (shadowSupported) {
			fixture.innerHTML = '<div><p><a>hello</a></p></div>';
			makeShadowTree(fixture.firstChild);
			var tree = axe.utils.getFlattenedTree(fixture.firstChild);
			var el = axe.utils.querySelectorAll(tree, 'a')[0];
			assert.isTrue(axe.utils.isHidden(el.actualNode));
		}
	});

});