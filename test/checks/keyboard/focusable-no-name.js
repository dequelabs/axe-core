describe('focusable-no-name', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var checkSetup = axe.testUtils.checkSetup;
	var shadowCheckSetup = axe.testUtils.shadowCheckSetup;
	var shadowSupport = axe.testUtils.shadowSupport;
	
	var checkContext = axe.testUtils.MockCheckContext();

	afterEach(function () {
		fixture.innerHTML = '';
		axe._tree = undefined;
		checkContext.reset();
	});

	it('should pass if tabindex < 0', function () {
		var params = checkSetup('<a href="#" tabindex="-1" id="target"></a>');
		assert.isFalse(checks['focusable-no-name'].evaluate.apply(checkContext, params));
	});

	it('should pass element is not natively focusable', function () {
		var params = checkSetup('<span role="link" href="#" id="target"></span>');
		assert.isFalse(checks['focusable-no-name'].evaluate.apply(checkContext, params));
	});

	it('should fail if element is tabbable with no name - native', function () {
		var params = checkSetup('<a href="#" id="target"></a>');
		assert.isTrue(checks['focusable-no-name'].evaluate.apply(checkContext, params));
	});

	it('should fail if element is tabbable with no name - ARIA', function () {
		var params = checkSetup('<span tabindex="0" role="link" id="target" href="#"></spam>');
		assert.isTrue(checks['focusable-no-name'].evaluate.apply(checkContext, params));
	});

	it('should pass if the element is tabbable but has an accessible name', function () {
		var params = checkSetup('<a href="#" title="Hello" id="target"></a>');
		assert.isFalse(checks['focusable-no-name'].evaluate.apply(checkContext, params));
	});

	(shadowSupport.v1 ? it : xit)('should pass if the content is passed in with shadow DOM', function () {
		var params = shadowCheckSetup('<div>Content!</div>', '<a href="#" id="target"><slot></slot></a>');

		assert.isFalse(checks['focusable-no-name'].evaluate.apply(checkContext, params));
	});

});
