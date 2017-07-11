describe('same-caption-summary', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var fixtureSetup = axe.testUtils.fixtureSetup;

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should return false there is no caption', function () {
		fixtureSetup('<table summary="hi"><tr><td></td></tr></table>');
		var node = fixture.querySelector('table');

		assert.isFalse(checks['same-caption-summary'].evaluate(node));

	});

	it('should return false there is no summary', function () {
		fixtureSetup('<table><caption>Hi</caption><tr><td></td></tr></table>');
		var node = fixture.querySelector('table');

		assert.isFalse(checks['same-caption-summary'].evaluate(node));

	});

	it('should return false if summary and caption are different', function () {
		fixtureSetup('<table summary="bye"><caption>Hi</caption><tr><td></td></tr></table>');
		var node = fixture.querySelector('table');

		assert.isFalse(checks['same-caption-summary'].evaluate(node));

	});

	it('should return true if summary and caption are the same', function () {
		fixtureSetup('<table summary="Hi"><caption>Hi</caption><tr><td></td></tr></table>');
		var node = fixture.querySelector('table');

		assert.isTrue(checks['same-caption-summary'].evaluate(node));

	});


});