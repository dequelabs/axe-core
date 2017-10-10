describe('has-no-more-than-one-main', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var checkContext = new axe.testUtils.MockCheckContext();
	var checkSetup = axe.testUtils.checkSetup;

	afterEach(function () {
		fixture.innerHTML = '';
		checkContext.reset();
	});

	it('should return false if there is more than one element with role main', function () {
		var params = checkSetup('<div id = "target"><div role = "main">one</div><div role = "main">two</div></div>');
		assert.isFalse(checks['has-no-more-than-one-main'].evaluate.apply(checkContext, params));

	});
	
	it('should return false if there is more than one main element', function () {
		var params = checkSetup('<div id = "target"><main>one</main><main>two</main></div>');
		assert.isFalse(checks['has-no-more-than-one-main'].evaluate.apply(checkContext, params));
	});

	it('should return true if there is only one element with role main', function(){
		var params = checkSetup('<div role = "main" id = "target">just one</div>');
		assert.isTrue(checks['has-no-more-than-one-main'].evaluate.apply(checkContext, params));
	});
	
	it('should return true if there is only one main element', function(){
		var params = checkSetup('<main id = "target">just one</main>');
		assert.isTrue(checks['has-no-more-than-one-main'].evaluate.apply(checkContext, params));
	});

});