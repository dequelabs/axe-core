describe('has-no-more-than-one-main', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var checkSetup = axe.testUtils.checkSetup;
	var shadowCheckSetup = axe.testUtils.shadowCheckSetup;
	var shadowSupported = axe.testUtils.shadowSupport.v1;

	var checkContext = new axe.testUtils.MockCheckContext();

	afterEach(function () {
		fixture.innerHTML = '';
		checkContext._data = null;
	});

	it('should return false if there is more than one element with role main', function () {
		var params = checkSetup('<div id="target"><div role="main"></div><div role="main"></div></div>');
		assert.isFalse(checks['has-no-more-than-one-main'].evaluate.apply(checkContext, params));
	});
	
	it('should return false if there is more than one main element', function () {
		var params = checkSetup('<div id="target"><main></main><main></main></div>');
		assert.isFalse(checks['has-no-more-than-one-main'].evaluate.apply(checkContext, params));
	});

	it('should return true if there is only one element with role main', function() {
		var params = checkSetup('<div id="target"><div role="main"></div></div>');
		assert.isTrue(checks['has-no-more-than-one-main'].evaluate.apply(checkSetup, params));
	});
	
	it('should return true if there is only one main element', function() {
		var params = checkSetup('<div id="target"><main></main></div>');
		assert.isTrue(checks['has-no-more-than-one-main'].evaluate.apply(checkSetup, params));
	});

	(shadowSupported ? it : xit)
	('should return false if there is a second main element inside the shadow dom', function () {
		var params = shadowCheckSetup(
			'<div role="main" id="target"></div>',
			'<div role="main"></div>'
		);
		assert.isFalse(checks['has-no-more-than-one-main'].evaluate.apply(checkContext, params));
	});

});