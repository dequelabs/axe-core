function makeShadowTreeGRN(node) {
	'use strict';
	var root = node.attachShadow({mode: 'open'});
	var div = document.createElement('div');
	div.className = 'parent';
	root.appendChild(div);
}

describe('dom.getRootNode', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var shadowSupported = axe.testUtils.shadowSupport.v1;

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should return the document when the node is just a normal node', function () {
		fixture.innerHTML = '<div id="target"></div>';
		var node = document.getElementById('target');
		assert.isTrue(axe.commons.dom.getRootNode(node) === document);
	});
	it('should return the document when the node is disconnected', function () {
		var node = document.createElement('div');
		assert.isTrue(axe.commons.dom.getRootNode(node) === document);
	});
	it('should return the shadow root when it is inside the shadow DOM', function () {
		var shadEl;

		if (shadowSupported) {
			// shadow DOM v1 - note: v0 is compatible with this code, so no need
			// to specifically test this
			fixture.innerHTML = '<div></div>';
			makeShadowTreeGRN(fixture.firstChild);
			shadEl = fixture.firstChild.shadowRoot.querySelector('div');
			assert.isTrue(axe.commons.dom.getRootNode(shadEl) !== document);
			assert.isTrue(axe.commons.dom.getRootNode(shadEl) === fixture.firstChild.shadowRoot);
		}
	});
});