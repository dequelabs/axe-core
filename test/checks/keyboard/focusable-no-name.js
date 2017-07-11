describe('focusable-no-name', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var fixtureSetup = axe.testUtils.fixtureSetup;

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should pass if tabindex < 0', function () {
		fixtureSetup('<a href="#" tabindex="-1"></a>');
		var node = fixture.querySelector('a');
		assert.isFalse(checks['focusable-no-name'].evaluate(node));
	});

	it('should pass element is not natively focusable', function () {
		fixtureSetup('<span role="link" href="#"></span>');
		var node = fixture.querySelector('span');
		assert.isFalse(checks['focusable-no-name'].evaluate(node));
	});

	it('should fail if element is tabbable with no name - native', function () {
		fixtureSetup('<a href="#"></a>');
		var node = fixture.querySelector('a');
		assert.isTrue(checks['focusable-no-name'].evaluate(node));
	});

	it('should fail if element is tabbable with no name - ARIA', function () {
		fixtureSetup('<span tabindex="0" role="link" href="#"></spam>');
		var node = fixture.querySelector('span');
		assert.isTrue(checks['focusable-no-name'].evaluate(node));
	});

	it('should pass if the element is tabbable but has an accessible name', function () {
		fixtureSetup('<a href="#" title="Hello"></a>');
		var node = fixture.querySelector('a');
		assert.isFalse(checks['focusable-no-name'].evaluate(node));
	});

});
