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
		fixture.appendChild(mainDiv);
		fixture.appendChild(anotherMain);
	});
	
	it('should return false if there is more than one main element', function () {
		var mainLandmark = document.createElement('main');
		var anotherMain = document.createElement('main');
		fixture.appendChild(mainLandmark);
		fixture.appendChild(anotherMain);
	});

	it('should return true if there is only one element with role main', function(){
		var mainDiv = document.createElement('div');
		mainDiv.setAttribute('role','main');
		fixture.appendChild(mainDiv);
	});
	
	it('should return true if there is only one main element', function(){
		var mainLandmark = document.createElement('main');
		fixture.appendChild(mainLandmark);
	});

});