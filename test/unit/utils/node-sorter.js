describe('utils.nodeSorter', function () {
	'use strict';

	function $id(id) {
		return document.getElementById(id);
	}


	var fixture = document.getElementById('fixture');

	it('should exist', function () {
		assert.isFunction(utils.nodeSorter);
	});

	it('should return -1 if a comes before b', function () {
		fixture.innerHTML = '<div id="a"></div><div id="b"></div>';

		assert.equal(utils.nodeSorter($id('a'), $id('b')), -1);
	});

	it('should return -1 if a comes before b - nested', function () {
		fixture.innerHTML = '<div id="a"><div id="b"></div></div>';

		assert.equal(utils.nodeSorter($id('a'), $id('b')), -1);
	});

	it('should return 1 if b comes before a', function () {
		fixture.innerHTML = '<div id="b"></div><div id="a"></div>';

		assert.equal(utils.nodeSorter($id('a'), $id('b')), 1);
	});

	it('should return 1 if b comes before a - nested', function () {
		fixture.innerHTML = '<div id="b"><div id="a"></div></div>';

		assert.equal(utils.nodeSorter($id('a'), $id('b')), 1);
	});
});