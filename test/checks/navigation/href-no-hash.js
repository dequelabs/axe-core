describe('href-no-hash', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should return false if the href points to only hash', function () {
		fixture.innerHTML = '<a href="#">Click Here</a>';
		var node = fixture.querySelector('a');
		assert.isFalse(checks['href-no-hash'].evaluate(node));
	});

	it('should return true if the href points to hash plus id', function () {
		fixture.innerHTML = '<a href="#test">Click Here</a>';
		var node = fixture.querySelector('a');
		assert.isTrue(checks['href-no-hash'].evaluate(node));
	});

	it('should return true if the href is empty', function () {
		fixture.innerHTML = '<a href="">Click Here</a>';
		var node = fixture.querySelector('a');
		assert.isTrue(checks['href-no-hash'].evaluate(node));
	});
});
