describe('focusable-not-tabbable', function() {
	'use strict';

	var check;
	var fixture = document.getElementById('fixture');
	var fixtureSetup = axe.testUtils.fixtureSetup;
	var shadowSupported = axe.testUtils.shadowSupport.v1;
	var checkContext = axe.testUtils.MockCheckContext();
	var checkSetup = axe.testUtils.checkSetup;

	before(function() {
		check = checks['focusable-not-tabbable'];
	});

	afterEach(function() {
		fixture.innerHTML = '';
		axe._tree = undefined;
		axe._selectorData = undefined;
		checkContext.reset();
	});

	it('returns true when BUTTON removed from tab order through tabindex', function() {
		var params = checkSetup(
			'<div id="target" aria-hidden="true">' +
				'<button tabindex="-1">Some button</button>' +
				'</div>'
		);
		var actual = check.evaluate.apply(checkContext, params);
		assert.isTrue(actual);
	});

	it('returns true when LINK removed from tab order through tabindex', function() {
		var params = checkSetup(
			'<div id="target" aria-hidden="true">' +
				'<a tabindex="-1" href="abc.html">ABC Site</a>' +
				'</div>'
		);
		var actual = check.evaluate.apply(checkContext, params);
		assert.isTrue(actual);
		assert.deepEqual(
			checkContext._relatedNodes,
			Array.from(fixture.querySelectorAll('a'))
		);
	});

	it('returns true when TEXTAREA removed from tab order through tabindex', function() {
		var params = checkSetup(
			'<div id="target" aria-hidden="true">' +
				'<label>Enter your comments:' +
				'<textarea tabindex="-1"></textarea>' +
				'</label>' +
				'</div>'
		);
		var actual = check.evaluate.apply(checkContext, params);
		assert.isTrue(actual);
	});

	it('returns true when aria-hidden=false does not negate aria-hidden true', function() {
		// Note: aria-hidden can't be reset once you've set it to true on an ancestor
		var params = checkSetup(
			'<div id="target" aria-hidden="true"><div aria-hidden="false"><button tabindex="-1">Some button</button></div></div>'
		);
		var actual = check.evaluate.apply(checkContext, params);
		assert.isTrue(actual);
	});

	(shadowSupported ? it : xit)(
		'returns true when BUTTON is removed from tab order in shadowDOM',
		function() {
			// Note:
			// `testUtils.checkSetup` does not work for shadowDOM
			// as `axe._tree` and `axe._selectorData` needs to be updated after shadowDOM construction
			fixtureSetup('<div aria-hidden="true" id="target"></div>`');
			var node = fixture.querySelector('#target');
			var shadow = node.attachShadow({ mode: 'open' });
			shadow.innerHTML = '<button tabindex="-1">btn</button>';
			axe._tree = axe.utils.getFlattenedTree(fixture);
			axe._selectorData = axe.utils.getSelectorData(axe._tree);
			var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
			var actual = check.evaluate.call(checkContext, node, {}, virtualNode);
			assert.isTrue(actual);
		}
	);

	it('returns false when focusable content through tabindex', function() {
		var params = checkSetup(
			'<p id="target" tabindex="0" aria-hidden="true">Some text</p>'
		);
		var actual = check.evaluate.apply(checkContext, params);
		assert.isFalse(actual);
	});
});
