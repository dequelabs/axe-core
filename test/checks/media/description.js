describe('description', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should return undefined if there is no track element', function () {
		fixture.innerHTML = '<video></video>';
		var node = fixture.querySelector('video');

		assert.isUndefined(checks.description.evaluate(node));
	});

	it('should fail if there is no kind=descriptions attribute', function () {
		fixture.innerHTML = '<video><track kind=captions></video>';
		var node = fixture.querySelector('video');

		assert.isTrue(checks.description.evaluate(node));
	});

	it('should pass if there is a kind=descriptions attribute', function () {
		fixture.innerHTML = '<video><track kind=descriptions></video>';
		var node = fixture.querySelector('video');

		assert.isFalse(checks.description.evaluate(node));
	});
});
