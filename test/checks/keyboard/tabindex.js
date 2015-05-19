describe('tabindex', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should fail if the tabindex is >= 0', function () {
		var node = document.createElement('div');
		node.setAttribute('tabindex', '1');
		fixture.appendChild(node);

		assert.isFalse(checks.tabindex.evaluate(node));


	});
	it('should pass if the tabindex is <= 0', function () {
		var node = document.createElement('div');
		node.setAttribute('tabindex', '0');
		fixture.appendChild(node);

		assert.isTrue(checks.tabindex.evaluate(node));


	});

});
