describe('dom.visuallyContains', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	var shadowSupported = axe.testUtils.shadowSupport.v1;

	afterEach(function () {
		document.getElementById('fixture').innerHTML = '';
	});

	it('should return true when element is trivially contained', function () {
		fixture.innerHTML = '<div style="height: 40px; width: 30px; background-color: red;">' +
			'<div id="target" style="height: 20px; width: 15px; background-color: green;">' +
			'</div></div>';
		var target = fixture.querySelector('#target');
		assert.isTrue(axe.commons.dom.visuallyContains(target, target.parentNode));
	});

	it('should return false when overflow is hidden', function () {
		fixture.innerHTML = '<div style="height: 20px; width: 30px; background-color: red; overflow: hidden;">' +
			'<div id="target" style="height:20px; top: 25px; width: 45px; background-color: green; position:absolute;">' +
			'</div></div>';
		var target = fixture.querySelector('#target');
		var result = axe.commons.dom.visuallyContains(target, target.parentNode);
		assert.isFalse(result);
	});

	it('should return false when absolutely positioned content does not overlap', function () {
		fixture.innerHTML = '<div style="height:20px; width:30px; background-color:red;">' +
			'<div id="target" style="height:20px; top:25px; width:45px; background-color:green; position:absolute;">Text' +
			'</div></div>';
		var target = fixture.querySelector('#target');
		var result = axe.commons.dom.visuallyContains(target, target.parentNode);
		assert.isFalse(result);
	});

	it('should return false when element is outside of margin', function () {
		fixture.innerHTML = '<div style="height: 40px; width: 30px; margin-left: 30px; background-color: red;">' +
			'<div id="target" style="height: 20px; width: 45px; margin-left: -20px; background-color: green;">' +
			'</div></div>';
		var target = fixture.querySelector('#target');
		assert.isFalse(axe.commons.dom.visuallyContains(target, target.parentNode));
	});

	it('should return false when overflow is visible', function () {
		fixture.innerHTML = '<div style="height: 40px; width: 30px; background-color: red; overflow: visible;">' +
			'<div id="target" style="height: 20px; width: 45px; background-color: green;">' +
			'</div></div>';
		var target = fixture.querySelector('#target');
		assert.isFalse(axe.commons.dom.visuallyContains(target, target.parentNode));
	});

	it('should return true when element is scrollable', function () {
		fixture.innerHTML = '<div style="height: 40px; width: 30px; background-color: red; overflow: scroll;">' +
			'<div id="target" style="height: 20px; width: 45px; background-color: green;">' +
			'</div></div>';
		var target = fixture.querySelector('#target');
		assert.isTrue(axe.commons.dom.visuallyContains(target, target.parentNode));
	});

	it('should return true when element is inline', function () {
		// result depends on the display property of the element
		fixture.innerHTML = '<label>' +
			'My label <input type="text" id="target">' +
			'</label>';
		var target = fixture.querySelector('#target');
		assert.isTrue(axe.commons.dom.visuallyContains(target, target.parentNode));
	});

	it('should return false when element is partially contained', function () {
		fixture.innerHTML = '<div style="background-color:red; height:20px;">' +
			'<p id="target" style="margin:0; position:absolute;">Text<br>more text</p></div>';
		var target = fixture.querySelector('#target');
		var result = axe.commons.dom.visuallyContains(target, target.parentNode);
		assert.isFalse(result);
	});

	(shadowSupported ? it : xit)
	('should return true when element is visually contained across shadow boundary', function () {
		fixture.innerHTML = '<div style="height:40px; background-color:red;" id="container"></div>';
		var container = fixture.querySelector('#container');
		var shadow = container.attachShadow({ mode: 'open' });
		shadow.innerHTML ='<div id="target" style="height: 20px; width: 45px; background-color: green;"></div>';
		var target = shadow.querySelector('#target');
		var result = axe.commons.dom.visuallyContains(target, container);
		assert.isTrue(result);
	});

	(shadowSupported ? it : xit)
	('should return false when element is not visually contained across shadow boundary', function () {
		fixture.innerHTML = '<div id="container" style="height:20px;background-color:red;overflow:hidden;"></div>';
		var container = fixture.querySelector('#container');
		var shadow = container.attachShadow({ mode: 'open' });
		shadow.innerHTML = '<div id="target" style="top:20px;height:20px;background-color:green;position:absolute;"><div>';
		var target = shadow.querySelector('#target');
		var result = axe.commons.dom.visuallyContains(target, container);
		assert.isFalse(result);
	});

	(shadowSupported ? it : xit)
	('should return false when element is absolutely positioned off of background across shadow boundary', function () {
		fixture.innerHTML = '<div id="container" style="background-color:black; height:20px;"></div>';
		var container = fixture.querySelector('#container');
		var shadow = container.attachShadow({ mode: 'open' });
		shadow.innerHTML = '<div id="shadowTarget" style="color:#333; height:20px; position:absolute; top:20px;">Text</div>';

		var target = shadow.querySelector('#shadowTarget');
		var result = axe.commons.dom.visuallyContains(target, container);
		assert.isFalse(result);
	});

	(shadowSupported ? it : xit)
	('should return false when element is partially positioned off of background across shadow boundary', function () {
		fixture.innerHTML = '<div id="container" style="background-color:black; height:20px; position:relative;"></div>';
		var container = fixture.querySelector('#container');
		var shadow = container.attachShadow({ mode: 'open' });
		shadow.innerHTML = '<div id="shadowTarget" style="color:#333; height:20px; position:absolute; top:10px;">Text</div>';

		var target = shadow.querySelector('#shadowTarget');
		var result = axe.commons.dom.visuallyContains(target, container);
		assert.isFalse(result);
	});
});
