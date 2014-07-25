describe('dom.getBackgroundColor', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		document.getElementById('fixture').innerHTML = '';
	});

	it('should return the blended color if it has alpha set', function () {
		fixture.innerHTML = '<div style="height: 40px; width: 30px; background-color: #800000;">' +
			'<div id="target" style="height: 20px; width: 15px; background-color: rgba(0, 128, 0, 0.5);">' +
			'</div></div>';
		var target = fixture.querySelector('#target');
		var actual = kslib.dom.getBackgroundColor(target);
		var expected = new kslib.color.Color(64, 64, 0, 1);
		assert.closeTo(actual.red, expected.red, 0.5);
		assert.closeTo(actual.green, expected.green, 0.5);
		assert.closeTo(actual.blue, expected.blue, 0.5);
		assert.closeTo(actual.alpha, expected.alpha, 0.1);
	});

	it('should return the blended color if it has opacity set', function () {
		fixture.innerHTML = '<div style="height: 40px; width: 30px; background-color: #800000;">' +
			'<div id="target" style="height: 20px; width: 15px; opacity: 0.5; background-color: green;">' +
			'</div></div>';
		var target = fixture.querySelector('#target');
		var actual = kslib.dom.getBackgroundColor(target);
		var expected = new kslib.color.Color(64, 64, 0, 1);
		assert.equal(actual.red, expected.red);
		assert.equal(actual.green, expected.green);
		assert.equal(actual.blue, expected.blue);
		assert.equal(actual.alpha, expected.alpha);
	});

	it('should return null if containing parent has a background image and is non-opaque', function () {
		fixture.innerHTML = '<div style="height: 40px; width: 30px;' +
			'background-color: #800000; background-image: url(image.png);">' +
			'<div id="target" style="height: 20px; width: 15px; background-color: green; opacity: 0.5;">' +
			'</div></div>';
		var target = fixture.querySelector('#target');
		var actual = kslib.dom.getBackgroundColor(target);
		assert.isNull(actual);
	});

	it('should return null if parent does not fully contain element', function () {
		fixture.innerHTML = '<div style="background-color: white;">' +
			'<div style="height: 10px; width: 30px; background-color: #800000;">' +
			'<div id="target" style="height: 20px; width: 15px; background-color: green; opacity: 0.5;">' +
			'</div></div></div>';
		var target = fixture.querySelector('#target');
		var actual = kslib.dom.getBackgroundColor(target);
		assert.isNull(actual);
	});


	it('should return null if there is a background image', function () {
		fixture.innerHTML = '<div style="height: 40px; width: 30px; background-color: #800000;">' +
			'<div id="target" style="height: 20px; width: 15px; background-color: green; background-image: url(image.png);">' +
			'</div></div>';
		var target = fixture.querySelector('#target');
		var actual = kslib.dom.getBackgroundColor(target);
		assert.isNull(actual);
	});

	it('should return the bgcolor if it is solid', function () {
		fixture.innerHTML = '<div style="height: 40px; width: 30px; background-color: red;">' +
			'<div id="target" style="height: 20px; width: 15px; background-color: green;">' +
			'</div></div>';
		var target = fixture.querySelector('#target');
		var actual = kslib.dom.getBackgroundColor(target);
		var expected = new kslib.color.Color(0, 128, 0, 1);
		assert.equal(actual.red, expected.red);
		assert.equal(actual.green, expected.green);
		assert.equal(actual.blue, expected.blue);
		assert.equal(actual.alpha, expected.alpha);
	});

});
