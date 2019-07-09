describe('dom.getTabbableElements', function() {
	'use strict';

	var fixtureSetup = axe.testUtils.fixtureSetup;
	var shadowSupported = axe.testUtils.shadowSupport.v1;
	var getTabbableElementsFn = axe.commons.dom.getTabbableElements;

	afterEach(function() {
		document.getElementById('fixture').innerHTML = '';
	});

	it('returns tabbable elms when node contains tabbable element', function() {
		var fixture = fixtureSetup(
			'<div id="target">' +
				'<label>Enter description:' +
				'<textarea></textarea>' +
				'</label>' +
				'</div>'
		);
		var node = fixture.querySelector('#target');
		var virtualNode = axe.utils.getNodeFromTree(node);
		var actual = getTabbableElementsFn(virtualNode);
		assert.lengthOf(actual, 1);
		assert.equal(actual[0].actualNode.nodeName.toUpperCase(), 'TEXTAREA');
	});

	it('returns empty [] when element does not contains tabbable element (using tabindex to take element out of tab-order)', function() {
		var fixture = fixtureSetup(
			'<div id="target">' + '<input tabindex="-1">' + '</div>'
		);
		var node = fixture.querySelector('#target');
		var virtualNode = axe.utils.getNodeFromTree(node);
		var actual = getTabbableElementsFn(virtualNode);
		assert.lengthOf(actual, 0);
	});

	it('returns empty [] when element contains disabled (tabbable) element', function() {
		var fixture = fixtureSetup(
			'<div id="target">' + '<button disabled>Submit Me</button>' + '</div>'
		);
		var node = fixture.querySelector('#target');
		var virtualNode = axe.utils.getNodeFromTree(node);
		var actual = getTabbableElementsFn(virtualNode);
		assert.lengthOf(actual, 0);
	});

	it('returns empty [] when element does not contain tabbable element', function() {
		var fixture = fixtureSetup(
			'<div id="target">' + '<p>Some text</p>' + '</div>'
		);
		var node = fixture.querySelector('#target');
		var virtualNode = axe.utils.getNodeFromTree(node);
		var actual = getTabbableElementsFn(virtualNode);
		assert.lengthOf(actual, 0);
	});

	(shadowSupported ? it : xit)(
		'returns tabbable elms when element contains tabbable element inside shadowDOM',
		function() {
			var fixture = fixtureSetup('<div id="target"></div>`');
			var node = fixture.querySelector('#target');
			var shadow = node.attachShadow({ mode: 'open' });
			shadow.innerHTML = '<button>btn</button>';
			// re build tree after shadowDOM is constructed
			axe.testUtils.flatTreeSetup(fixture);
			axe._selectorData = axe.utils.getSelectorData(axe._tree);
			var virtualNode = axe.utils.getNodeFromTree(node);
			var actual = getTabbableElementsFn(virtualNode);
			assert.lengthOf(actual, 1);
			assert.equal(actual[0].actualNode.nodeName.toUpperCase(), 'BUTTON');
		}
	);

	(shadowSupported ? it : xit)(
		'returns empty [] when element contains disabled (tabbable) element inside shadowDOM',
		function() {
			var fixture = fixtureSetup('<div id="target"></div>`');
			var node = fixture.querySelector('#target');
			var shadow = node.attachShadow({ mode: 'open' });
			shadow.innerHTML = '<button disabled>btn</button>';
			// re build tree after shadowDOM is constructed
			axe.testUtils.flatTreeSetup(fixture);
			axe._selectorData = axe.utils.getSelectorData(axe._tree);
			var virtualNode = axe.utils.getNodeFromTree(node);
			var actual = getTabbableElementsFn(virtualNode);
			assert.lengthOf(actual, 0);
		}
	);

	(shadowSupported ? it : xit)(
		'returns empty [] when element does not contain tabbable element inside shadowDOM',
		function() {
			var fixture = fixtureSetup('<div id="target"></div>`');
			var node = fixture.querySelector('#target');
			var shadow = node.attachShadow({ mode: 'open' });
			shadow.innerHTML = '<p>I am not tabbable</p>';
			// re build tree after shadowDOM is constructed
			axe.testUtils.flatTreeSetup(fixture);
			axe._selectorData = axe.utils.getSelectorData(axe._tree);
			var virtualNode = axe.utils.getNodeFromTree(node);
			var actual = getTabbableElementsFn(virtualNode);
			assert.lengthOf(actual, 0);
		}
	);
});
