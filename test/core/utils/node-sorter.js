describe('axe.utils.nodeSorter', function () {
	'use strict';

	function $id(id) {
		return document.getElementById(id);
	}


	var fixture = document.getElementById('fixture');

	it('should exist', function () {
		assert.isFunction(axe.utils.nodeSorter);
	});

	it('should return -1 if a comes before b', function () {
		fixture.innerHTML = '<div id="a"></div><div id="b"></div>';

		assert.equal(axe.utils.nodeSorter($id('a'), $id('b')), -1);
	});

	it('should return -1 if a comes before b - nested', function () {
		fixture.innerHTML = '<div id="a"><div id="b"></div></div>';

		assert.equal(axe.utils.nodeSorter($id('a'), $id('b')), -1);
	});

	it('should return 1 if b comes before a', function () {
		fixture.innerHTML = '<div id="b"></div><div id="a"></div>';

		assert.equal(axe.utils.nodeSorter($id('a'), $id('b')), 1);
	});

	it('should return 1 if b comes before a - nested', function () {
		fixture.innerHTML = '<div id="b"><div id="a"></div></div>';

		assert.equal(axe.utils.nodeSorter($id('a'), $id('b')), 1);
	});

	it('should return 0 if a === b', function () {
		fixture.innerHTML = '<div id="a"></div>';

		assert.equal(axe.utils.nodeSorter($id('a'), $id('a')), 0);
	});
});