describe('label-content-name-mismatch tests', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var fixtureSetup = axe.testUtils.fixtureSetup;
	var check = checks['label-content-name-mismatch'];
	var options = undefined;

	afterEach(function() {
		fixture.innerHTML = '';
	});

	it('returns true when visible text and accessible name (`aria-label`) matches (text sanitized)', function() {
		var target = fixtureSetup(
			'<div id="target" role="link" aria-label="next page %20 ">next page</div>',
			'div#target'
		);
		var actual = check.evaluate(
			target,
			options,
			axe.utils.getNodeFromTree(axe._tree[0], target)
		);
		assert.isTrue(actual);
	});

	it('returns true when visible text and accessible name (`aria-label`) matches (character insensitive)', function() {
		var target = fixtureSetup(
			'<div id="target" role="link" aria-label="Next Page">next pAge</div>',
			'div#target'
		);
		var actual = check.evaluate(
			target,
			options,
			axe.utils.getNodeFromTree(axe._tree[0], target)
		);
		assert.isTrue(actual);
	});

	it('returns true when visible text and accessible name (`aria-labelledby`) matches (character insensitive & text sanitized)', function() {
		var target = fixtureSetup(
			'<div id="target" aria-labelledby="yourLabel">UNTIL THE VeRy EnD</div>' +
				'<div id="yourLabel">uNtIl the very end %20</div>',
			'div#target'
		);
		var actual = check.evaluate(
			target,
			options,
			axe.utils.getNodeFromTree(axe._tree[0], target)
		);
		assert.isTrue(actual);
	});

	it('returns true when visible text is contained in the accessible name', function() {
		var target = fixtureSetup(
			'<button id="target" name="link" aria-label="Next Page in the list">Next Page</button>',
			'#target'
		);
		var actual = check.evaluate(
			target,
			options,
			axe.utils.getNodeFromTree(axe._tree[0], target)
		);
		assert.isTrue(actual);
	});

	it('returns false when visible text doesn’t match accessible name', function() {
		var target = fixtureSetup(
			'<div id="target" role="link" aria-label="OK">Next</div>',
			'#target'
		);
		var actual = check.evaluate(
			target,
			options,
			axe.utils.getNodeFromTree(axe._tree[0], target)
		);
		assert.isFalse(actual);
	});

	it('returns false when not all of visible text is included in accessible name', function() {
		var target = fixtureSetup(
			'<button id="target" name="link" aria-label="the full">The full label</button>',
			'#target'
		);
		var actual = check.evaluate(
			target,
			options,
			axe.utils.getNodeFromTree(axe._tree[0], target)
		);
		assert.isFalse(actual);
	});

	it('returns false when element has non-matching accessible name (`aria-labelledby`) and text content', function() {
		var target = fixtureSetup(
			'<div role="button" id="target" aria-labelledby="foo">some content</div>' +
				'<div id="foo">123</div>',
			'div#target'
		);
		var actual = check.evaluate(
			target,
			options,
			axe.utils.getNodeFromTree(axe._tree[0], target)
		);
		assert.isFalse(actual);
	});
});
