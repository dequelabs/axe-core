describe('listitem', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should pass if the listitem has a parent <ol>', function () {
		fixture.innerHTML = '<ol><li id="target">My list item</li></ol>';
		var node = fixture.querySelector('#target');

		assert.isTrue(checks.listitem.evaluate(node));

	});

	it('should pass if the listitem has a parent <ul>', function () {
		fixture.innerHTML = '<ul><li id="target">My list item</li></ul>';
		var node = fixture.querySelector('#target');

		assert.isTrue(checks.listitem.evaluate(node));

	});

	it('should pass if the listitem has a parent role=list', function () {
		fixture.innerHTML = '<div role="list"><li id="target">My list item</li></div>';
		var node = fixture.querySelector('#target');

		assert.isTrue(checks.listitem.evaluate(node));

	});

	it('should fail if the listitem has an incorrect parent', function () {
		fixture.innerHTML = '<div><li id="target">My list item</li></div>';
		var node = fixture.querySelector('#target');

		assert.isFalse(checks.listitem.evaluate(node));

	});
});
