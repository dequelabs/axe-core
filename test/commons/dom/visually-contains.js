describe('dom.visuallyContains', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

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
		fixture.innerHTML = '<div style="height: 40px; width: 30px; background-color: red; overflow: hidden;">' +
			'<div id="target" style="height: 20px; width: 45px; background-color: green;">' +
			'</div></div>';
		var target = fixture.querySelector('#target');
		assert.isTrue(axe.commons.dom.visuallyContains(target, target.parentNode));
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

});
