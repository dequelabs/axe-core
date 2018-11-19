describe('aria-hidden-focus', function() {
	'use strict';

	var check;
	var fixture = document.getElementById('fixture');
	var fixtureSetup = axe.testUtils.fixtureSetup;
	var shadowSupported = axe.testUtils.shadowSupport.v1;
	var checkContext = axe.testUtils.MockCheckContext();
	var checkSetup = axe.testUtils.checkSetup;

	before(function() {
		check = checks['aria-hidden-focus'];
	});

	afterEach(function() {
		fixture.innerHTML = '';
		axe._tree = undefined;
		axe._selectorData = undefined;
		checkContext.reset();
	});

	// pass
	it('returns true when content not focusable by default', function() {
		var params = checkSetup('<p id="target" aria-hidden="true">Some text</p>');
		var actual = check.evaluate.apply(checkContext, params);
		assert.isTrue(actual);
	});

	it('returns true when content hidden through CSS', function() {
		var params = checkSetup(
			'<div id="target" aria-hidden="true"><a href="/" style="display:none">Link</a></div>'
		);
		var actual = check.evaluate.apply(checkContext, params);
		assert.isTrue(actual);
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

	it('returns true when content made unfocusable through disabled', function() {
		var params = checkSetup(
			'<input id="target" disabled aria-hidden="true" />'
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
		'returns true when BUTTON is removed from tab order through tabindex which coexists with plain text in shadowDOM',
		function() {
			// Note:
			// `testUtils.checkSetup` does not work for shadowDOM
			// as `axe._tree` and `axe._selectorData` needs to be updated after shadowDOM construction
			fixtureSetup(
				'<div aria-hidden="true" id="target"><button tabindex="-1">btn</button></div>`'
			);
			var node = fixture.querySelector('#target');
			var shadow = node.attachShadow({ mode: 'open' });
			shadow.innerHTML = 'plain text';
			axe._tree = axe.utils.getFlattenedTree(fixture);
			axe._selectorData = axe.utils.getSelectorData(axe._tree);
			var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
			var actual = check.evaluate.call(checkContext, node, {}, virtualNode);
			assert.isTrue(actual);
		}
	);

	// fail
	it('returns false when focusable off screen link', function() {
		var params = checkSetup(
			'<div id="target" aria-hidden="true"><a href="/" style="position:absolute; top:-999em">Link</a></div>'
		);
		var actual = check.evaluate.apply(checkContext, params);
		assert.isFalse(actual);
		assert.deepEqual(
			checkContext._relatedNodes,
			Array.from(fixture.querySelectorAll('a'))
		);
	});

	it('returns false when focusable form field only disabled through ARIA', function() {
		var params = checkSetup(
			'<div id="target" aria-hidden="true"><input type="text" aria-disabled="true"/></div>'
		);
		var actual = check.evaluate.apply(checkContext, params);
		assert.isFalse(actual);
		assert.deepEqual(
			checkContext._relatedNodes,
			Array.from(fixture.querySelectorAll('input'))
		);
	});

	it('returns false when focusable content through tabindex', function() {
		var params = checkSetup(
			'<p id="target" tabindex="0" aria-hidden="true">Some text</p>'
		);
		var actual = check.evaluate.apply(checkContext, params);
		assert.isFalse(actual);
	});

	it('returns false when focusable SUMMARY element', function() {
		var params = checkSetup(
			'<details id="target" aria-hidden="true"><summary>Some button</summary><p>Some details</p></details>'
		);
		var actual = check.evaluate.apply(checkContext, params);
		assert.isFalse(actual);
		assert.deepEqual(
			checkContext._relatedNodes,
			Array.from(fixture.querySelectorAll('details'))
		);
	});

	it('returns false when focusable SELECT element', function() {
		var params = checkSetup(
			'<div id="target" aria-hidden="true">' +
				'<label>Choose:' +
				'<select>' +
				'<option selected="selected">Chosen</option>' +
				'<option>Not Selected</option>' +
				'</select>' +
				'</label>' +
				'</div>'
		);
		var actual = check.evaluate.apply(checkContext, params);
		assert.isFalse(actual);
		assert.deepEqual(
			checkContext._relatedNodes,
			Array.from(fixture.querySelectorAll('select'))
		);
	});

	it('returns false when focusable AREA element', function() {
		var params = checkSetup(
			'<main id="target" aria-hidden="true">' +
				'<map name="infographic">' +
				'<area shape="rect" coords="184,6,253,27" href="https://mozilla.org"' +
				'target="_blank" alt="Mozilla" />' +
				'</map>' +
				'</main>'
		);

		var actual = check.evaluate.apply(checkContext, params);
		assert.isFalse(actual);
		assert.deepEqual(
			checkContext._relatedNodes,
			Array.from(fixture.querySelectorAll('area'))
		);
	});

	(shadowSupported ? it : xit)(
		'returns false when focusable content through tabindex inside shadowDOM',
		function() {
			// Note:
			// `testUtils.checkSetup` does not work for shadowDOM
			// as `axe._tree` and `axe._selectorData` needs to be updated after shadowDOM construction
			fixtureSetup('<div id="target"></div>');
			var node = fixture.querySelector('#target');
			var shadow = node.attachShadow({ mode: 'open' });
			shadow.innerHTML = '<button>Some text</button>';
			axe._tree = axe.utils.getFlattenedTree(fixture);
			axe._selectorData = axe.utils.getSelectorData(axe._tree);
			var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
			var actual = check.evaluate.call(checkContext, node, {}, virtualNode);
			assert.isFalse(actual);
		}
	);
});
