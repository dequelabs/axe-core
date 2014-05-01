
describe('utils.matchesSelector', function () {
	'use strict';

	it('should actually work', function () {
		var target,
			fixture = document.getElementById('fixture');

		fixture.innerHTML = '<div id="test">Hi</div>';
		target = document.getElementById('test');
		assert.ok(utils.matchesSelector(target, '#test'));

		fixture.innerHTML = '';
	});


});