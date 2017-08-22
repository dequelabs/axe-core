describe('has-no-more-than-one-main', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should return false if there is more than one element with role main', function () {
		var mainDiv = document.createElement('div');
		mainDiv.setAttribute('role','main');
		var anotherMain = document.createElement('div');
		anotherMain.setAttribute('role','main');
		var node = document.querySelector('html');
		node.appendChild(mainDiv);
		node.appendChild(anotherMain);
		assert.isFalse(checks['has-no-more-than-one-main'].evaluate(node));
		node.removeChild(mainDiv);
		node.removeChild(anotherMain);
	});
	
	it('should return false if there is more than one main element', function () {
		var mainLandmark = document.createElement('main');
		var anotherMain = document.createElement('main');
		var node = document.querySelector('html');
		node.appendChild(mainLandmark);
		node.appendChild(anotherMain);
		assert.isFalse(checks['has-no-more-than-one-main'].evaluate(node));
		node.removeChild(mainLandmark);
		node.removeChild(anotherMain);
	});

	it('should return true if there is only one element with role main', function(){
		var mainDiv = document.createElement('div');
		mainDiv.setAttribute('role','main');
		var node = document.querySelector('html');
		node.appendChild(mainDiv);
		assert.isTrue(checks['has-no-more-than-one-main'].evaluate(node));
		node.removeChild(mainDiv);
	});
	
	it('should return true if there is only one main element', function(){
		var mainLandmark = document.createElement('main');
		var node = document.querySelector('html');
		node.appendChild(mainLandmark);
		assert.isTrue(checks['has-no-more-than-one-main'].evaluate(node));
		node.removeChild(mainLandmark);
	});

});