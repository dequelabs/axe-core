describe('skip-link', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should return false if the href points to another document', function () {
		fixture.innerHTML = '<a href="something.html#mainheader">Click Here</a><h1 id="mainheader">Introduction</h1>';
		var node = fixture.querySelector('a');
		assert.isFalse(checks['skip-link'].evaluate(node));
	});

	it('should return false if the href points to a non-existent element', function () {
		fixture.innerHTML = '<a href="#spacecamp">Click Here</a><h1 id="mainheader">Introduction</h1>';
		var node = fixture.querySelector('a');
		assert.isFalse(checks['skip-link'].evaluate(node));
	});

	it('should return false if the href points to a non-focusable element', function () {
		fixture.innerHTML = '<a href="#mainheader">Click Here</a><h1 id="mainheader">Introduction</h1>';
		var node = fixture.querySelector('a');
		assert.isFalse(checks['skip-link'].evaluate(node));
	});

	it('should return first result of an array', function () {
		var results = [1, 2, 3];
		assert.equal(checks['skip-link'].after(results), 1);
	});

	it('should return true if the href points to a focusable element', function () {
		fixture.innerHTML = '<a href="#mainheader">Click Here</a><h1 id="mainheader" tabindex="0">Introduction</h1>';
		var node = fixture.querySelector('a');
		assert.isTrue(checks['skip-link'].evaluate(node));
	});
});
