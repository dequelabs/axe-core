describe('same-caption-summary', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should return false there is no caption', function () {
		fixture.innerHTML = '<table summary="hi"><tr><td></td></tr></table>';
		var node = fixture.querySelector('table');

		assert.isFalse(checks['same-caption-summary'].evaluate(node));

	});

	it('should return false there is no summary', function () {
		fixture.innerHTML = '<table><caption>Hi</caption><tr><td></td></tr></table>';
		var node = fixture.querySelector('table');

		assert.isFalse(checks['same-caption-summary'].evaluate(node));

	});

	it('should return false if summary and caption are different', function () {
		fixture.innerHTML = '<table summary="bye"><caption>Hi</caption><tr><td></td></tr></table>';
		var node = fixture.querySelector('table');

		assert.isFalse(checks['same-caption-summary'].evaluate(node));

	});

	it('should return true if summary and caption are the same', function () {
		fixture.innerHTML = '<table summary="Hi"><caption>Hi</caption><tr><td></td></tr></table>';
		var node = fixture.querySelector('table');

		assert.isTrue(checks['same-caption-summary'].evaluate(node));

	});


});