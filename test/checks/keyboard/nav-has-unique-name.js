describe('nav-has-unique-name', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var checkContext = new axe.testUtils.MockCheckContext();
	var checkSetup = axe.testUtils.checkSetup;

	afterEach(function () {
		fixture.innerHTML = '';
		checkContext.reset();
	});

	it('should return true if no aria-label attribute is provided', function () {
			var params = checkSetup('<div id="target" role="navigation"></div>');
			assert.isTrue(checks['nav-has-unique-name'].evaluate.apply(checkContext, params));
			assert.equal(checkContext._data, null);
	});

	it('should return true if aria-label attribute is empty', function () {
		var params = checkSetup('<nav id="target" aria-label=""></nav>');
		assert.isTrue(checks['nav-has-unique-name'].evaluate.apply(checkContext, params));
		assert.equal(checkContext._data, null);
	});

	it('should return true if aria-label attribute is non-empty', function () {
		var params = checkSetup('<div id="target" role="navigation" aria-label="test"></div>');
		assert.isTrue(checks['nav-has-unique-name'].evaluate.apply(checkContext, params));
		assert.equal(checkContext._data, 'test');
	});
});
