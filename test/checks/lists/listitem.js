describe('listitem', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should pass if the listitem has a parent <ol>', function () {
		fixture.innerHTML = '<ol><li id="target">My list item</ol>';
		var node = fixture.querySelector('#target');

		assert.isTrue(checks.listitem.evaluate(node));


	});

	it('should pass if the listitem has a parent <ul>', function () {
		fixture.innerHTML = '<ul><li id="target">My list item</ul>';
		var node = fixture.querySelector('#target');

		assert.isTrue(checks.listitem.evaluate(node));


	});

	it('should fail if the listitem has an incorrect parent', function () {
		fixture.innerHTML = '<video><li id="target">My list item</video>';
		var node = fixture.querySelector('#target');

		assert.isFalse(checks.listitem.evaluate(node));


	});
});
