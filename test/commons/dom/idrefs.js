describe('dom.idrefs', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should find referenced nodes by ID', function () {
		fixture.innerHTML = '<div aria-cats="target1 target2" id="start"></div>' +
			'<div id="target1"></div><div id="target2"></div>';

		var start = document.getElementById('start'),
			expected = [document.getElementById('target1'), document.getElementById('target2')];

		assert.deepEqual(axe.commons.dom.idrefs(start, 'aria-cats'), expected, 'Should find it!');


	});

	it('should insert null if a reference is not found', function () {
		fixture.innerHTML = '<div aria-cats="target1 target2 target3" id="start"></div>' +
			'<div id="target1"></div><div id="target2"></div>';

		var start = document.getElementById('start'),
			expected = [document.getElementById('target1'), document.getElementById('target2'), null];

		assert.deepEqual(axe.commons.dom.idrefs(start, 'aria-cats'), expected, 'Should find it!');


	});

	it('should not fail when extra whitespace is used', function () {
		fixture.innerHTML = '<div aria-cats="    \ttarget1 \n  target2  target3 \n\t" id="start"></div>' +
			'<div id="target1"></div><div id="target2"></div>';

		var start = document.getElementById('start'),
			expected = [document.getElementById('target1'), document.getElementById('target2'), null];

		assert.deepEqual(axe.commons.dom.idrefs(start, 'aria-cats'), expected, 'Should find it!');


	});
});