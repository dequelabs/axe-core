describe('dom.findUp', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should find parents based on selector', function () {
		fixture.innerHTML = '<div class="target"><div id="target" class="target"><span><span><span><div>' +
			'<div><div id="start"></div></div></div></span></span></span></div></div>';

		var start = document.getElementById('start'),
			target = document.getElementById('target');

		assert.equal(axe.commons.dom.findUp(start, '.target'), target, 'Should find it!');


	});

	it('should return null if it cant find a match anywhere in the document', function () {
		fixture.innerHTML = '<div id="start"></div>';
		var start = document.getElementById('start');

		assert.isNull(axe.commons.dom.findUp(start, '.nomatchyplzkthx'));

	});

	it('should return null if it cant find a match anywhere above the start', function () {
		fixture.innerHTML = '<div id="start"></div><div class="target"></div>';
		var start = document.getElementById('start');

		assert.isNull(axe.commons.dom.findUp(start, '.target'));

	});
});