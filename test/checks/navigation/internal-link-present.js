describe('internal-link-present', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var checkContext = axe.testUtils.MockCheckContext();
	var checkSetup = axe.testUtils.checkSetup;

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

});
