describe('aria-hidden-focus', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var check = undefined;
	var checkContext = axe.testUtils.MockCheckContext();

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
			'<div id="target" aria-hidden="true"><button tabindex="-1">Some button</button></div>';
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
			'<div id="target" aria-hidden="true"><input type="text"/></div>';
		var node = fixture.querySelector('#target');
		var actual = check.evaluate.call(checkContext, node);
		assert.isFalse(actual);
	});

	it('returns false when aria-hidden=false does not negate aria-hidden true', function() {
		fixture.innerHTML =
			'<div id="target" aria-hidden="true"><div aria-hidden="false"><button tabindex="-1">Some button</button></div></div>';
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

	it('returns false when Focusable summary element', function() {
		fixture.innerHTML =
			'<details id="target" aria-hidden="true"><summary>Some button</summary><p>Some details</p></details>';
		var node = fixture.querySelector('#target');
		var actual = check.evaluate.call(checkContext, node);
		assert.isFalse(actual);
	});
});
