describe('focusable-no-name', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should pass if tabindex < 0', function () {
		fixture.innerHTML = '<a href="#" tabindex="-1"></a>';
		var node = fixture.querySelector('a');
		assert.isFalse(checks['focusable-no-name'].evaluate(node));
	});

	it('should pass element is not natively focusable', function () {
		fixture.innerHTML = '<span role="link" href="#"></span>';
		var node = fixture.querySelector('span');
		assert.isFalse(checks['focusable-no-name'].evaluate(node));
	});

	it('should fail if element is tabbable with no name - native', function () {
		fixture.innerHTML = '<a href="#"></a>';
		var node = fixture.querySelector('a');
		assert.isTrue(checks['focusable-no-name'].evaluate(node));
	});

	it('should fail if element is tabbable with no name - ARIA', function () {
		fixture.innerHTML = '<span tabindex="0" role="link" href="#"></spam>';
		var node = fixture.querySelector('span');
		assert.isTrue(checks['focusable-no-name'].evaluate(node));
	});

	it('should pass if the element is tabbable but has an accessible name', function () {
		fixture.innerHTML = '<a href="#" title="Hello"></a>';
		var node = fixture.querySelector('a');
		assert.isFalse(checks['focusable-no-name'].evaluate(node));
	});

});
