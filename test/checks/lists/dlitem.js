describe('dlitem', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should pass if the dlitem has a parent <dl>', function () {
		fixture.innerHTML = '<dl><dt id="target">My list item</dl>';
		var node = fixture.querySelector('#target');

		assert.isTrue(checks.dlitem.evaluate(node));


	});

	it('should fail if the dlitem has an incorrect parent', function () {
		fixture.innerHTML = '<video><dt id="target">My list item</video>';
		var node = fixture.querySelector('#target');

		assert.isFalse(checks.dlitem.evaluate(node));


	});
});
