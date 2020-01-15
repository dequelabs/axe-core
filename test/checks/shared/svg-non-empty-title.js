describe('svg-non-empty-title tests', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var checkSetup = axe.testUtils.checkSetup;
	var check = checks['svg-non-empty-title'];

	afterEach(function() {
		fixture.innerHTML = '';
	});

	it('returns true if the element has a `title` child', function() {
		var checkArgs = checkSetup(
			'<svg id="target"><title>Time II: Party</title></svg>'
		);
		assert.isTrue(check.evaluate.apply(null, checkArgs));
	});

	it('returns true if the `title` child has text nested in another element', function() {
		var checkArgs = checkSetup(
			'<svg id="target"><title><g>Time II: Party</g></title></svg>'
		);
		assert.isTrue(check.evaluate.apply(null, checkArgs));
	});

	it('returns false if the element has no `title` child', function() {
		var checkArgs = checkSetup('<svg id="target"></svg>');
		assert.isFalse(check.evaluate.apply(null, checkArgs));
	});

	it('returns false if the `title` child is empty', function() {
		var checkArgs = checkSetup('<svg id="target"><title></title></svg>');
		assert.isFalse(check.evaluate.apply(null, checkArgs));
	});

	it('returns false if the `title` is a grandchild', function() {
		var checkArgs = checkSetup(
			'<svg id="target"><circle><title>Time II: Party</title></circle></svg>'
		);
		assert.isFalse(check.evaluate.apply(null, checkArgs));
	});

	it('returns false if the `title` child has only whitespace', function() {
		var checkArgs = checkSetup(
			'<svg id="target"><title> \t\r\n </title></svg>'
		);
		assert.isFalse(check.evaluate.apply(null, checkArgs));
	});

	it('returns false if there are multiple titles, and the first is empty', function() {
		var checkArgs = checkSetup(
			'<svg id="target"><title></title><title>Time II: Party</title></svg>'
		);
		assert.isFalse(check.evaluate.apply(null, checkArgs));
	});
});
