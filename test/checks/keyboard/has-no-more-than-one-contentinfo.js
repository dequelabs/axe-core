describe('has-no-more-than-one-contentinfo', function () {
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

	it('should return false if there is more than one element with role contentinfo', function () {
		var params = checkSetup('<div id="target"><div role="contentinfo"></div><div role="contentinfo"></div></div>');
		assert.isFalse(checks['has-no-more-than-one-contentinfo'].evaluate.apply(checkContext, params));

	});

	it('should return false if there is more than one footer serving as a contentinfo', function () {
		var params = checkSetup('<div id="target"><footer></footer><footer></footer></div>');
		assert.isFalse(checks['has-no-more-than-one-contentinfo'].evaluate.apply(checkContext, params));
	});

	it('should return true if there are multiple footers contained in sectioning elements', function(){
		var params = checkSetup('<div role="main" id="target"><footers></footers><footers></footers></div>');
		assert.isTrue(checks['has-no-more-than-one-contentinfo'].evaluate.apply(checkContext, params));
	});

	it('should return true if there is only one element with role contentinfo', function(){
		var params = checkSetup('<div role="contentinfo" id="target"></div>');
		assert.isTrue(checks['has-no-more-than-one-contentinfo'].evaluate.apply(checkContext, params));
	});

	it('should return true if there is only one footer serving as a contentinfo', function(){
		var params = checkSetup('<footer id="target"></footer>');
		assert.isTrue(checks['has-no-more-than-one-contentinfo'].evaluate.apply(checkContext, params));
	});

	(shadowSupported ? it : xit)
	('should return false if there is a second contentinfo inside the shadow dom', function () {
		var params = shadowCheckSetup(
			'<div role="contentinfo" id="target"></div>',
			'<div role="contentinfo"></div>'
		);
		assert.isFalse(checks['has-no-more-than-one-contentinfo'].evaluate.apply(checkContext, params));
	});

});
