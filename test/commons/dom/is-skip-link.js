describe('dom.isSkipLink', function() {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function() {
		fixture.innerHTML = '';
	});

	it('should return true if the href points to an ID', function() {
		fixture.innerHTML = '<a href="#target">Click Here</a>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var node = fixture.querySelector('a');
		assert.isTrue(axe.commons.dom.isSkipLink(node));
	});

	it('should return false if the href points to another document', function() {
		fixture.innerHTML = '<a href="something.html#target">Click Here</a>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var node = fixture.querySelector('a');
		assert.isFalse(axe.commons.dom.isSkipLink(node));
	});

	it('should return true if the URI encoded href points to an element with an ID', function() {
		fixture.innerHTML = '<a href="#%3Ctarget%3E">Click Here</a>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var node = fixture.querySelector('a');
		assert.isTrue(axe.commons.dom.isSkipLink(node));
	});

	it('should return true if the URI is an Angular skiplink', function() {
		fixture.innerHTML = '<a href="/#target">Click Here</a>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var node = fixture.querySelector('a');
		assert.isTrue(axe.commons.dom.isSkipLink(node));
	});

	it('should return true for multiple skip-links', function() {
		fixture.innerHTML =
			'<a id="skip-link1" href="#target1">Click Here></a><a id="skip-link2" href="/#target2">Click Here></a><a id="skip-link3" href="#target3">Click Here></a>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var nodes = fixture.querySelectorAll('a');
		for (var i = 0; i < nodes.length; i++) {
			assert.isTrue(axe.commons.dom.isSkipLink(nodes[i]));
		}
	});

	it('should return true if the element is before a page link', function() {
		fixture.innerHTML =
			'<a id="skip-link" href="#target">Click Here></a><a href="/page">New Page</a>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var node = fixture.querySelector('#skip-link');
		assert.isTrue(axe.commons.dom.isSkipLink(node));
	});

	it('should return false if the element is after a page link', function() {
		fixture.innerHTML =
			'<a href="/page">New Page</a><a id="skip-link" href="#target">Click Here></a>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var node = fixture.querySelector('#skip-link');
		assert.isFalse(axe.commons.dom.isSkipLink(node));
	});

	it('should ignore links that start with `href=javascript`', function() {
		fixture.innerHTML =
			'<a href="javascript:void">New Page</a><a id="skip-link" href="#target">Click Here></a>';
		axe._tree = axe.utils.getFlattenedTree(fixture);
		var node = fixture.querySelector('#skip-link');
		assert.isTrue(axe.commons.dom.isSkipLink(node));
	});
});
