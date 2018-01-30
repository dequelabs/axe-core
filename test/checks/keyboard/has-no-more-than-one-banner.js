describe('has-no-more-than-one-banner', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var checkContext = new axe.testUtils.MockCheckContext();
	var checkSetup = axe.testUtils.checkSetup;
	var shadowCheckSetup = axe.testUtils.shadowCheckSetup;
	var shadowSupported = axe.testUtils.shadowSupport.v1;

	afterEach(function () {
		fixture.innerHTML = '';
		checkContext.reset();
	});

	it('should return false if there is more than one element with role banner', function () {
		var params = checkSetup('<div id="target"><div role="banner"></div><div role="banner"></div></div>');
		assert.isFalse(checks['has-no-more-than-one-banner'].evaluate.apply(checkContext, params));

	});

	it('should return false if there is more than one header serving as a banner', function () {
		var params = checkSetup('<div id="target"><header></header><header></header></div>');
		assert.isFalse(checks['has-no-more-than-one-banner'].evaluate.apply(checkContext, params));
	});

	it('should return true if there are multiple headers contained in sectioning elements', function(){
		var params = checkSetup('<div role="main" id="target"><header></header><header></header></div>');
		assert.isTrue(checks['has-no-more-than-one-banner'].evaluate.apply(checkContext, params));
	});

	it('should return true if there is only one element with role banner', function(){
		var params = checkSetup('<div role="banner" id="target"></div>');
		assert.isTrue(checks['has-no-more-than-one-banner'].evaluate.apply(checkContext, params));
	});

	it('should return true if there is only one header serving as a banner', function(){
		var params = checkSetup('<header id="target"></header>');
		assert.isTrue(checks['has-no-more-than-one-banner'].evaluate.apply(checkContext, params));
	});

	(shadowSupported ? it : xit)
	('should return false if there is a second banner inside the shadow dom', function () {
		var params = shadowCheckSetup(
			'<div role="banner" id="target"></div>',
			'<div role="banner"></div>'
		);
		assert.isFalse(checks['has-no-more-than-one-banner'].evaluate.apply(checkContext, params));
	});

});
