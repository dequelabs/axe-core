describe('dom.getFocusableElements', function() {
	'use strict';

	var fixtureSetup = axe.testUtils.fixtureSetup;
	var shadowSupported = axe.testUtils.shadowSupport.v1;
	var getFocusableElementsFn = axe.commons.dom.getFocusableElements;

	afterEach(function() {
		document.getElementById('fixture').innerHTML = '';
	});

	it('returns true when element contains focusable element', function() {
		var fixture = fixtureSetup(
			'<div id="target">' +
				'<label>Enter your comments:' +
				'<textarea tabindex="-1"></textarea>' +
				'</label>' +
				'</div>'
		);
		var node = fixture.querySelector('#target');
		var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
		var actual = getFocusableElementsFn(virtualNode);
		assert.isTrue(actual);
	});

	it('returns false when element contains disabled (focusable) element', function() {
		var fixture = fixtureSetup(
			'<div id="target">' + '<button disabled>Submit Me</button>' + '</div>'
		);
		var node = fixture.querySelector('#target');
		var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
		var actual = getFocusableElementsFn(virtualNode);
		assert.isFalse(actual);
	});

	it('returns false when element does not contain focusable element', function() {
		var fixture = fixtureSetup(
			'<div id="target">' + '<p>Some text</p>' + '</div>'
		);
		var node = fixture.querySelector('#target');
		var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
		var actual = getFocusableElementsFn(virtualNode);
		assert.isFalse(actual);
	});

	(shadowSupported ? it : xit)(
		'returns true when element contains focusable element inside shadowDOM',
		function() {
			var fixture = fixtureSetup('<div id="target"></div>`');
			var node = fixture.querySelector('#target');
			var shadow = node.attachShadow({ mode: 'open' });
			shadow.innerHTML = '<button>btn</button>';
			// re build tree after shadowDOM is constructed
			axe._tree = axe.utils.getFlattenedTree(fixture);
			axe._selectorData = axe.utils.getSelectorData(axe._tree);
			var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
			var actual = getFocusableElementsFn(virtualNode);
			assert.isTrue(actual);
		}
	);

	(shadowSupported ? it : xit)(
		'returns false when element contains disabled (focusable) element inside shadowDOM',
		function() {
			var fixture = fixtureSetup('<div id="target"></div>`');
			var node = fixture.querySelector('#target');
			var shadow = node.attachShadow({ mode: 'open' });
			shadow.innerHTML = '<button disabled>btn</button>';
			// re build tree after shadowDOM is constructed
			axe._tree = axe.utils.getFlattenedTree(fixture);
			axe._selectorData = axe.utils.getSelectorData(axe._tree);
			var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
			var actual = getFocusableElementsFn(virtualNode);
			assert.isFalse(actual);
		}
	);

	(shadowSupported ? it : xit)(
		'returns false when element does not contain focusable element inside shadowDOM',
		function() {
			var fixture = fixtureSetup('<div id="target"></div>`');
			var node = fixture.querySelector('#target');
			var shadow = node.attachShadow({ mode: 'open' });
			shadow.innerHTML = '<p>I am not focusable</p>';
			// re build tree after shadowDOM is constructed
			axe._tree = axe.utils.getFlattenedTree(fixture);
			axe._selectorData = axe.utils.getSelectorData(axe._tree);
			var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
			var actual = getFocusableElementsFn(virtualNode);
			assert.isFalse(actual);
		}
	);
});
