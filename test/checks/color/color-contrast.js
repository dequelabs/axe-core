describe('color-contrast', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		document.getElementById('fixture').innerHTML = '';
	});

	it('should return true when there is sufficient contrast because of bold tag', function () {
		fixture.innerHTML = '<div style="color: gray; background-color: white; font-size: 20px"><b id="target">' +
			'My text</b></div>';
		var target = fixture.querySelector('#target');
		assert.isTrue(checks['color-contrast'].evaluate(target));
	});

	it('should return true when there is sufficient contrast because of font weight', function () {
		fixture.innerHTML = '<div style="color: gray; background-color: white; font-size: 20px; font-weight: bold" id="target">' +
			'My text</div>';
		var target = fixture.querySelector('#target');
		assert.isTrue(checks['color-contrast'].evaluate(target));
	});

	it('should return true when there is sufficient contrast because of font size', function () {
		fixture.innerHTML = '<div style="color: gray; background-color: white; font-size: 40px;" id="target">' +
			'My text</div>';
		var target = fixture.querySelector('#target');
		assert.isTrue(checks['color-contrast'].evaluate(target));
	});

	it('should return false when there is not sufficient contrast because of font size', function () {
		fixture.innerHTML = '<div style="color: gray; background-color: white; font-size: 8px;" id="target">' +
			'My text</div>';
		var target = fixture.querySelector('#target');
		assert.isFalse(checks['color-contrast'].evaluate(target));
	});

	it('should return true when there is sufficient contrast with transparency', function () {
		fixture.innerHTML = '<div style="color: white; background-color: white;">' +
			'<span style="color: black;" id="target">My text</span></div>';
		var target = fixture.querySelector('#target');
		assert.isTrue(checks['color-contrast'].evaluate(target));
	});

	it('should return true when there is sufficient contrast', function () {
		fixture.innerHTML = '<div style="color: black; background-color: white;" id="target">' +
			'My text</div>';
		var target = fixture.querySelector('#target');
		assert.isTrue(checks['color-contrast'].evaluate(target));
	});

	it('should return false when there is not sufficient contrast', function () {
		fixture.innerHTML = '<div style="color: yellow; background-color: white;" id="target">' +
			'My text</div>';
		var target = fixture.querySelector('#target');
		assert.isFalse(checks['color-contrast'].evaluate(target));
	});

	it('should not match when there is no text', function () {
		fixture.innerHTML = '<div style="color: yellow; background-color: white;" id="target">' +
			' </div>';
		var target = fixture.querySelector('#target');
		assert.isFalse(checks['color-contrast'].matches(target));
	});

	it('should match when there is text', function () {
		fixture.innerHTML = '<div style="color: yellow; background-color: white;" id="target">' +
			'My text</div>';
		var target = fixture.querySelector('#target');
		assert.isTrue(checks['color-contrast'].matches(target));
	});
});
