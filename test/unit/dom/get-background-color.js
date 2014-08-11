describe('dom.getBackgroundColor', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		document.getElementById('fixture').innerHTML = '';
	});

	it('should return the blended color if it has no background set', function () {
		fixture.innerHTML = '<div style="height: 40px; width: 30px; background-color: #800000;">' +
			'<div id="target" style="height: 20px; width: 15px;">' +
			'</div></div>';
		var target = fixture.querySelector('#target');
		var actual = kslib.dom.getBackgroundColor(target);
		var expected = new kslib.color.Color(128, 0, 0, 1);
		assert.closeTo(actual.red, expected.red, 0.5);
		assert.closeTo(actual.green, expected.green, 0.5);
		assert.closeTo(actual.blue, expected.blue, 0.5);
		assert.closeTo(actual.alpha, expected.alpha, 0.1);
	});

	it('should return the blended color if it is transparent and positioned', function () {
		fixture.innerHTML = '<div style="position: absolute; top: 0px; left: 0px; height: 100px; ' +
			'width: 90px; background-color: #000080;">' +
			'<div id="pos" style="position: absolute; top: 50px; left: 40px; height: 40px; ' +
			'width: 30px; background-color: #800000;"></div>' +
			'<div id="parent" style="position: absolute; top: 0px; left: 0px; height: 40px; ' +
			'width: 30px; background-color: #ffffff">' +
			'<div id="target" style="position: absolute; top: 60px; left: 45px; height: 20px; ' +
			'width: 15px; background-color: rgba(0, 128, 0, 0.5);">' +
			'</div></div></div>';
		var target = fixture.querySelector('#target');
		var actual = kslib.dom.getBackgroundColor(target);
		var expected = new kslib.color.Color(64, 64, 0, 1);
		if (kslib.dom.supportsElementsFromPoint(target.ownerDocument)) {
			assert.closeTo(actual.red, expected.red, 0.5);
			assert.closeTo(actual.green, expected.green, 0.5);
			assert.closeTo(actual.blue, expected.blue, 0.5);
			assert.closeTo(actual.alpha, expected.alpha, 0.1);
		} else {
			assert.isNull(actual);
		}
	});

	it('should return the proper blended color if it has alpha set', function () {
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


	it('should return white if transparency goes all the way up to document', function () {
		var actual = kslib.dom.getBackgroundColor(fixture);
		var expected = new kslib.color.Color(255, 255, 255, 1);
		assert.equal(actual.red, expected.red);
		assert.equal(actual.green, expected.green);
		assert.equal(actual.blue, expected.blue);
		assert.equal(actual.alpha, expected.alpha);
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
