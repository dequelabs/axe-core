describe('is-on-screen', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	it('should return true for visible elements', function () {
		fixture.innerHTML = '<div id="target">elm</div>';
		var node = fixture.querySelector('#target');

		assert.isTrue(checks['is-on-screen'].evaluate(node));
	});

	it('should return true for aria-hidden=true elements', function () {
		fixture.innerHTML = '<div id="target" aria-hidden="true">elm</div>';
		var node = fixture.querySelector('#target');

		assert.isTrue(checks['is-on-screen'].evaluate(node));
	});

	it('should return false for display:none elements', function () {
		fixture.innerHTML = '<div id="target" style="display:none">elm</div>';
		var node = fixture.querySelector('#target');

		assert.isFalse(checks['is-on-screen'].evaluate(node));
	});

	it('should return false for off screen elements', function () {
		fixture.innerHTML = '<div id="target" style="position:absolute; top:-10000px">elm</div>';
		var node = fixture.querySelector('#target');

		assert.isFalse(checks['is-on-screen'].evaluate(node));
	});


});