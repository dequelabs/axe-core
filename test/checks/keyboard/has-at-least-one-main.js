describe('has-at-least-one-main', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	var checkContext = {
		_data: null,
		data: function (d) {
			this._data = d;
		}
	};

	afterEach(function () {
		fixture.innerHTML = '';
		checkContext._data = null;
	});

	it('should return false if no div has role property', function() {
		fixture.innerHTML = '<div id = "target">No role</div>';
		var node = fixture.querySelector('#target');
		var mainIsFound = checks['has-at-least-one-main'].evaluate.call(checkContext, node);
		assert.isFalse(mainIsFound);
		assert.deepEqual(checkContext._data, mainIsFound);
	});
	
	it('should return false if div has empty role', function() {
		fixture.innerHTML = '<div id = "target" role = "">Empty role</div>';
		var node = fixture.querySelector('#target');
		var mainIsFound = checks['has-at-least-one-main'].evaluate.call(checkContext, node);
		assert.isFalse(mainIsFound);
		assert.equal(checkContext._data, mainIsFound);
	});
	
	it('should return false if div has role not equal to main', function() {
		fixture.innerHTML = '<div id = "target" role = "bananas">Wrong role</div>';
		var node = fixture.querySelector('#target');
		var mainIsFound = checks['has-at-least-one-main'].evaluate.call(checkContext, node);
		assert.isFalse(mainIsFound);
		assert.equal(checkContext._data, mainIsFound);
	});
	
	it('should return true if main landmark exists', function(){
		fixture.innerHTML = '<main id = "target">main landmark</main>';
		var node = fixture.querySelector('#target');
		var mainIsFound = checks['has-at-least-one-main'].evaluate.call(checkContext, node);
		assert.isTrue(mainIsFound);
		assert.equal(checkContext._data, mainIsFound);
	});
	
	it('should return true if one div has role equal to main', function() {
		fixture.innerHTML = '<div id = "target" role = "main">Div with role main</div>';
		var node = fixture.querySelector('#target');
		var mainIsFound = checks['has-at-least-one-main'].evaluate.call(checkContext, node);
		assert.isTrue(mainIsFound);
		assert.equal(checkContext._data, mainIsFound);
	});
	
	it('should return true if any document has a main landmark', function() {
		var results = [{data: false, result: false}, {data: true, result: true}];
		assert.isTrue(checks['has-at-least-one-main'].after(results)[0].result && checks['has-at-least-one-main'].after(results)[1].result);
	});
	
	it('should return false if no document has a main landmark', function() {
		var results = [{data: false, result: false}, {data: false, result: false}];
		assert.isFalse(checks['has-at-least-one-main'].after(results)[0].result && checks['has-at-least-one-main'].after(results)[1].result);
	});

});