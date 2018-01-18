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

	it('should return true if the href points to an element with an ID', function () {
		fixture.innerHTML = '<a href="#target">Click Here</a><h1 id="target">Introduction</h1>';
		var node = fixture.querySelector('a');
		assert.isTrue(checks['skip-link'].evaluate(node));
	});

	it('should return true if the href points to an element with an name', function () {
		fixture.innerHTML = '<a href="#target">Click Here</a><a name="target"></a>';
		var node = fixture.querySelector('a');
		assert.isTrue(checks['skip-link'].evaluate(node));
	});

	it('should return undefined if the target has display:none', function () {
		fixture.innerHTML = '<a href="#target">Click Here</a>' +
			'<h1 id="target" style="display:none">Introduction</h1>';
		var node = fixture.querySelector('a');
		assert.isUndefined(checks['skip-link'].evaluate(node));
	});

	it('should return undefined if the target has aria-hidden=true', function () {
		fixture.innerHTML = '<a href="#target">Click Here</a>' +
			'<h1 id="target" aria-hidden="true">Introduction</h1>';
		var node = fixture.querySelector('a');
		assert.isUndefined(checks['skip-link'].evaluate(node));
	});
});
