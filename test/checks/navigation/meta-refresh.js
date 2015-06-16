describe('meta-refresh', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});
	describe('; separator', function () {

		it('should return false if content value is not 0', function () {
			fixture.innerHTML = '<meta name="refresh" content="300">';
			var node = fixture.querySelector('meta');

			assert.isFalse(checks['meta-refresh'].evaluate(node));

		});

		it('should return false if content value does not start with 0', function () {
			fixture.innerHTML = '<meta name="refresh" content="300;URL=something.html">';
			var node = fixture.querySelector('meta');

			assert.isFalse(checks['meta-refresh'].evaluate(node));

		});

		it('should return true if content value starts with 0', function () {
			fixture.innerHTML = '<meta name="refresh" content="0;URL=something.html">';
			var node = fixture.querySelector('meta');

			assert.isTrue(checks['meta-refresh'].evaluate(node));

		});

		it('should return true if content value is 0', function () {
			fixture.innerHTML = '<meta name="refresh" content="0">';
			var node = fixture.querySelector('meta');

			assert.isTrue(checks['meta-refresh'].evaluate(node));

		});

		it('should return true if there is no content value', function () {
			fixture.innerHTML = '<meta name="refresh">';
			var node = fixture.querySelector('meta');

			assert.isTrue(checks['meta-refresh'].evaluate(node));

		});

	});
});
