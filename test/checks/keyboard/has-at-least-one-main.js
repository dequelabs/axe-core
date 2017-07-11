describe('has-at-least-one-main', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var checkContext = {
		_data: null,
		data: function (d) {
			this._data = d;
		},
	};

	afterEach(function () {
		fixture.innerHTML = '';
		checkContext._data = null;
	});

	
	it('should return false if main does not exist', function () {
		var node = fixture.querySelector('main,div[role="main"]');
		assert.isFalse(checks['has-at-least-one-main'].evaluate.call(checkContext, node));
	});

	it('should return false if no div has role property', function() {
		var div = document.createElement('div');
		fixture.appendChild(div);
		var node = fixture.querySelector('div[role="main"]');
		assert.isFalse(checks['has-at-least-one-main'].evaluate.call(checkContext, node));
		assert.equal(checkContext._data, !!node);
		fixture.removeChild(div);
	});
	
	it('should return false if div has empty role', function() {
		var div = document.createElement('div');
		div.setAttribute('role','');
		fixture.appendChild(div);
		var node = fixture.querySelector('div[role="main"]');
		assert.isFalse(checks['has-at-least-one-main'].evaluate.call(checkContext, node));
		assert.equal(checkContext._data, !!node);
		fixture.removeChild(div);
	});
	
	it('should return false if div has role not equal to main', function() {
		var div = document.createElement('div');
		div.setAttribute('role','not-main');
		fixture.appendChild(div);
		var node = fixture.querySelector('div[role="main"]');
		assert.isFalse(checks['has-at-least-one-main'].evaluate.call(checkContext, node));
		assert.equal(checkContext._data, !!node);
		fixture.removeChild(div);
	});
	
	it('should return true if main landmark exists', function(){
		var mainElem = document.createElement('main');
		fixture.appendChild(mainElem);
		var node = fixture.querySelector('main');
		assert.isTrue(checks['has-at-least-one-main'].evaluate.call(checkContext, node));
		assert.equal(checkContext._data, !!node);
		fixture.removeChild(mainElem);
	});
	
	it('should return true if one div has role equal to main', function() {
		var mainDiv = document.createElement('div');
		mainDiv.setAttribute('role','main');
		var anotherDiv = document.createElement('div');
		fixture.appendChild(mainDiv);
		fixture.appendChild(anotherDiv);
		var node = fixture.querySelector('div[role="main"]');
		assert.isTrue(checks['has-at-least-one-main'].evaluate.call(checkContext, node));
		assert.equal(checkContext._data, !!node);
		fixture.removeChild(mainDiv);
		fixture.removeChild(anotherDiv);
	});


});

 