describe('header-present', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var checkSetup = axe.testUtils.checkSetup;
	var shadowSupported = axe.testUtils.shadowSupport.v1;
	var checkContext = axe.testUtils.MockCheckContext();
	var shadowCheckSetup = axe.testUtils.shadowCheckSetup;

	afterEach(function () {
		fixture.innerHTML = '';
		axe._tree = undefined;
		checkContext.reset();
	});

	it('should return true if h1-h6 is found', function () {
		var params = checkSetup('<h1 id="target">Hi</h1>');
		assert.isTrue(checks['header-present'].evaluate.apply(checkContext, params));

		params = checkSetup('<h2 id="target">Hi</h2>');
		assert.isTrue(checks['header-present'].evaluate.apply(checkContext, params));

		params = checkSetup('<h3 id="target">Hi</h3>');
		assert.isTrue(checks['header-present'].evaluate.apply(checkContext, params));

		params = checkSetup('<h4 id="target">Hi</h4>');
		assert.isTrue(checks['header-present'].evaluate.apply(checkContext, params));

		params = checkSetup('<h5 id="target">Hi</h5>');
		assert.isTrue(checks['header-present'].evaluate.apply(checkContext, params));

		params = checkSetup('<h6 id="target">Hi</h6>');
		assert.isTrue(checks['header-present'].evaluate.apply(checkContext, params));
	});

	it('should return true if role=heading is found', function () {
		var params = checkSetup('<div role="heading" id="target">Hi</div>');
		assert.isTrue(checks['header-present'].evaluate.apply(checkContext, params));
	});

	it('should otherwise return false', function () {
		var params = checkSetup('<p id="target">Some stuff and stuff</p>');
		assert.isFalse(checks['header-present'].evaluate.apply(checkContext, params));
	});

	(shadowSupported ? it : xit)
	('should return true if heading is in shadow dom', function () {
		var params = shadowCheckSetup(
			'<div id="target"><div>',
			'<h1></h1>'
		);
		assert.isTrue(checks['header-present'].evaluate.apply(checkContext, params));
	});
});
