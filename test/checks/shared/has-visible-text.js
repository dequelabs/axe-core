describe('has-visible-text', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var fixtureSetup = axe.testUtils.fixtureSetup;

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should return false if there is no visible text', function () {
		fixtureSetup('<object></object>');
		var node = document.querySelector('object');
		assert.isFalse(checks['has-visible-text'].evaluate(node));
	});

	it('should return false if there is text, but its hidden', function () {
		fixtureSetup('<object><span style="display:none">hello!</span></object>');
		var node = document.querySelector('object');
		assert.isFalse(checks['has-visible-text'].evaluate(node));
	});

	it('should return true if there is visible text', function () {
		fixtureSetup('<object>hello!</object>');
		var node = document.querySelector('object');
		assert.isTrue(checks['has-visible-text'].evaluate(node));
	});

});
