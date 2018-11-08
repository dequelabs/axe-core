describe('aria-hidden-focus', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var check = undefined;
	var checkContext = axe.testUtils.MockCheckContext();
	var shadowSupported = axe.testUtils.shadowSupport.v1;

	before(function() {
		check = checks['aria-hidden-focus'];
		checkContext._data = null;
	});

	afterEach(function() {
		fixture.innerHTML = '';
	});

	// pass
	it('returns true when content not focusable by default', function() {
		fixture.innerHTML = '<p id="target" aria-hidden="true">Some text</p>';
		var node = fixture.querySelector('#target');
		var actual = check.evaluate.call(checkContext, node);
		assert.isTrue(actual);
	});

	it('returns true when content hidden through CSS', function() {
		fixture.innerHTML =
			'<div id="target" aria-hidden="true"><a href="/" style="display:none">Link</a></div>';
		var node = fixture.querySelector('#target');
		var actual = check.evaluate.call(checkContext, node);
		assert.isTrue(actual);
	});

	it('returns true when content made unfocusable through tabindex', function() {
		fixture.innerHTML =
			'<div id="target" aria-hidden="true">' +
			'<button tabindex="-1">Some button</button>' +
			'</div>';
		var node = fixture.querySelector('#target');
		var actual = check.evaluate.call(checkContext, node);
		assert.isTrue(actual);
	});

	it('returns true when content made unfocusable through disabled', function() {
		fixture.innerHTML = '<input id="target" disabled aria-hidden="true" />';
		var node = fixture.querySelector('#target');
		var actual = check.evaluate.call(checkContext, node);
		assert.isTrue(actual);
	});

	it('returns true when aria-hidden=false does not negate aria-hidden true', function() {
		// Note: aria-hidden can't be reset once you've set it to true on an ancestor
		fixture.innerHTML =
			'<div id="target" aria-hidden="true"><div aria-hidden="false"><button tabindex="-1">Some button</button></div></div>';
		var node = fixture.querySelector('#target');
		var actual = check.evaluate.call(checkContext, node);
		assert.isTrue(actual);
	});

	(shadowSupported ? it : xit)(
		'returns true when content hidden through CSS inside shadowDOM',
		function() {
			fixture.innerHTML = '<div id="target"></div>';
			var node = fixture.querySelector('#target');
			var shadow = node.attachShadow({ mode: 'open' });
			shadow.innerHTML =
				'<div aria-hidden="true"><a href="/" style="display:none">Link</a></div>';
			var actual = check.evaluate.call(checkContext, node);
			assert.isTrue(actual);
		}
	);

	// fail
	it('returns false when focusable off screen link', function() {
		fixture.innerHTML =
			'<div id="target" aria-hidden="true"><a href="/" style="position:absolute; top:-999em">Link</a></div>';
		var node = fixture.querySelector('#target');
		var actual = check.evaluate.call(checkContext, node);
		assert.isFalse(actual);
	});

	it('returns false when focusable form field, incorrectly disabled', function() {
		fixture.innerHTML =
			'<div id="target" aria-hidden="true"><input type="text" aria-disabled="true"/></div>';
		var node = fixture.querySelector('#target');
		var actual = check.evaluate.call(checkContext, node);
		assert.isFalse(actual);
	});

	it('returns false when focusable content through tabindex', function() {
		fixture.innerHTML =
			'<p id="target" tabindex="0" aria-hidden="true">Some text</p>';
		var node = fixture.querySelector('#target');
		var actual = check.evaluate.call(checkContext, node);
		assert.isFalse(actual);
	});

	it('returns false when focusable summary element', function() {
		fixture.innerHTML =
			'<details id="target" aria-hidden="true"><summary>Some button</summary><p>Some details</p></details>';
		var node = fixture.querySelector('#target');
		var actual = check.evaluate.call(checkContext, node);
		assert.isFalse(actual);
	});

	(shadowSupported ? it : xit)(
		'returns false when focusable content through tabindex inside shadowDOM',
		function() {
			fixture.innerHTML = '<div id="target"></div>';
			var node = fixture.querySelector('#target');
			var shadow = node.attachShadow({ mode: 'open' });
			shadow.innerHTML = '<p tabindex="0" aria-hidden="true">Some text</p>';
			var actual = check.evaluate.call(checkContext, node);
			assert.isFalse(actual);
		}
	);
});
