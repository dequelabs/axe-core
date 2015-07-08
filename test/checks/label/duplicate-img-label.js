describe('duplicate-img-label', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should return false if no img is present', function () {
		fixture.innerHTML = '<button id="target">Plain text</button>';
		var node = fixture.querySelector('#target');
		assert.isFalse(checks['duplicate-img-label'].evaluate(node));
	});

	it('should return false if no text is present', function () {
		fixture.innerHTML = '<button id="target"><img alt="Plain text"></button>';
		var node = fixture.querySelector('#target');
		assert.isFalse(checks['duplicate-img-label'].evaluate(node));
	});

	it('should return false if aria-label duplicates img alt', function () {
		fixture.innerHTML = '<button id="target" aria-label="Plain text"><img alt="Plain text"></button>';
		var node = fixture.querySelector('#target');
		assert.isFalse(checks['duplicate-img-label'].evaluate(node));
	});

	it('should return false if img and text have different text', function () {
		fixture.innerHTML = '<button id="target"><img alt="Alt text">Plain text</button>';
		var node = fixture.querySelector('#target');
		assert.isFalse(checks['duplicate-img-label'].evaluate(node));
	});

	it('should return true if img and text have the same text', function () {
		fixture.innerHTML = '<button id="target"><img alt="Plain text">Plain text</button>';
		var node = fixture.querySelector('#target');
		assert.isTrue(checks['duplicate-img-label'].evaluate(node));
	});

	it('should return true if img has ARIA label with the same text', function () {
		fixture.innerHTML = '<button id="target"><img aria-label="Plain text">Plain text</button>';
		var node = fixture.querySelector('#target');
		assert.isTrue(checks['duplicate-img-label'].evaluate(node));
	});

	it('should return false if img and text are both blank', function () {
		fixture.innerHTML = '<button id="target"><img alt=""></button>';
		var node = fixture.querySelector('#target');
		assert.isFalse(checks['duplicate-img-label'].evaluate(node));
	});

	it('should return false if img and text have superset/subset text', function () {
		fixture.innerHTML = '<button id="target"><img alt="Plain text and more">Plain text</button>';
		var node = fixture.querySelector('#target');
		assert.isFalse(checks['duplicate-img-label'].evaluate(node));
	});
});
