describe('hidden', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should fail if there is no track element', function () {
		fixture.innerHTML = '<audio></audio>';
		var node = fixture.querySelector('audio');

		assert.isFalse(checks['caption'].evaluate(node));
	});

	it('should fail if there is no kind=caption attribute', function () {
		fixture.innerHTML = '<audio><track kind=descriptions></track></audio>';
		var node = fixture.querySelector('audio');

		assert.isFalse(checks['caption'].evaluate(node));
	});

	it('should pass if there is a kind=caption attribute', function () {
		fixture.innerHTML = '<audio><track kind=captions></track></audio>';
		var node = fixture.querySelector('audio');

		assert.isTrue(checks['caption'].evaluate(node));
	});
});
