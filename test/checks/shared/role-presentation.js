describe('role-presentation', function() {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function() {
		fixture.innerHTML = '';
	});

	it('should detect role="presentation" on the element', function() {
		fixture.innerHTML = '<div role="presentation"></div>';
		var node = fixture.querySelector('div');

		assert.isTrue(axe.testUtils.getCheckEvaluate('role-presentation')(node));
	});

	it('should return false when role !== presentation', function() {
		fixture.innerHTML = '<div role="cats"></div>';
		var node = fixture.querySelector('div');

		assert.isFalse(axe.testUtils.getCheckEvaluate('role-presentation')(node));
	});

	it('should return false when there is no role attribute', function() {
		fixture.innerHTML = '<div></div>';
		var node = fixture.querySelector('div');

		assert.isFalse(axe.testUtils.getCheckEvaluate('role-presentation')(node));
	});
});
