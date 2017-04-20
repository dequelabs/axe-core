describe('caption', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should return undefined if there is no track element', function () {
		fixture.innerHTML = '<audio></audio>';
		var node = fixture.querySelector('audio');

		assert.isUndefined(checks.caption.evaluate(node));
	});

	it('should fail if there is no kind=captions attribute', function () {
		fixture.innerHTML = '<audio><track kind=descriptions></audio>';
		var node = fixture.querySelector('audio');

		assert.isTrue(checks.caption.evaluate(node));
	});

	it('should pass if there is a kind=captions attribute', function () {
		fixture.innerHTML = '<audio><track kind=captions></audio>';
		var node = fixture.querySelector('audio');

		assert.isFalse(checks.caption.evaluate(node));
	});
});
