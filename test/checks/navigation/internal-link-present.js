describe('internal-link-present', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var shadowSupported = axe.testUtils.shadowSupport.v1;
	var checkContext = axe.testUtils.MockCheckContext();
	var checkSetup = axe.testUtils.checkSetup;
	var shadowCheckSetup = axe.testUtils.shadowCheckSetup;

	afterEach(function () {
		fixture.innerHTML = '';
		axe._tree = undefined;
		checkContext.reset();
	});

	it('should return true when an internal link is found', function () {
		var params = checkSetup('<div id="target"><a href="#haha">hi</a></div>');
		assert.isTrue(checks['internal-link-present'].evaluate.apply(checkContext, params));
	});

	it('should otherwise return false', function () {
		var params = checkSetup('<div id="target"><a href="http://www.deque.com/#haha">hi</a></div>');
		assert.isFalse(checks['internal-link-present'].evaluate.apply(checkContext, params));
	});

	(shadowSupported ? it : xit)
	('should return true when internal link is found in shadow dom', function () {
		var params = shadowCheckSetup(
			'<div id="target"></div>',
			'<a href="#haha">hi</a>'
		);
		assert.isTrue(checks['internal-link-present'].evaluate.apply(checkContext, params));
	});
});
