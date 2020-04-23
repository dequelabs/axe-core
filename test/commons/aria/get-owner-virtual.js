describe('aria.getOwnerVirtual', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var queryFixture = axe.testUtils.queryFixture;
	var shadowSupported = axe.testUtils.shadowSupport.v1;
	var aria = axe.commons.aria;

	afterEach(function() {
		fixture.innerHTML = '';
		axe._tree = undefined;
	});

	it('returns owner element - `div` which is a direct parent (not `aria-owns`)', function() {
		var vNode = queryFixture(
			'<div><p role="listitem" id="target">Nothing here.</p></div>'
		);

		var owner = aria.getOwnerVirtual(vNode);
		assert.equal(owner.nodeName.toUpperCase(), 'DIV');
	});

	it('returns owner element which references via `aria-owns`', function() {
		var vNode = queryFixture(
			'<div role="list"><div aria-owns="parent"></div></div>' +
				'<div id="parent"><p role="listitem" id="target">Nothing here.</p></div>'
		);

		var owner = aria.getOwnerVirtual(vNode);
		assert.equal(owner.nodeName.toUpperCase(), 'DIV');
		assert.equal(owner.getAttribute('aria-owns'), 'parent');
	});

	it('returns owner element (excluding role="presentation")', function() {
		var vNode = queryFixture(
			'<div role="list">' +
				'<div role="presentation">' +
				'<div id="target" role="listitem">List item 1</div>' +
				'</div>' +
				'</div>'
		);

		var owner = aria.getOwnerVirtual(vNode);
		assert.equal(owner.nodeName.toUpperCase(), 'DIV');
		assert.equal(owner.getAttribute('role'), 'list');
	});

	(shadowSupported ? it : xit)(
		'returns owner element referenced via `aria-owns` across shadow boundary',
		function() {
			fixture.innerHTML = '<div role="list" id="parent"></div>';
			var shadowRoot = document
				.querySelector('#parent')
				.attachShadow({ mode: 'open' });
			shadowRoot.innerHTML = '<p role="listitem" id="target">Nothing here.</p>';

			axe.testUtils.flatTreeSetup(fixture);
			var shadowContent = shadowRoot.querySelector('#target');
			var virtualTarget = axe.utils.getNodeFromTree(shadowContent);

			var owner = aria.getOwnerVirtual(virtualTarget);
			assert.equal(owner.nodeName.toUpperCase(), 'DIV');
			assert.equal(owner.getAttribute('role'), 'list');
		}
	);

	it('returns owner element (excluding role="none")', function() {
		var vNode = queryFixture(
			'<div role="tabpanel">' +
				'<div role="none">' +
				'<div id="target" role="listitem">List item 1</div>' +
				'</div>' +
				'</div>'
		);

		var owner = aria.getOwnerVirtual(vNode);
		assert.equal(owner.nodeName.toUpperCase(), 'DIV');
		assert.equal(owner.getAttribute('role'), 'tabpanel');
	});
});
