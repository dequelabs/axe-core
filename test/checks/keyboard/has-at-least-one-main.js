describe('has-at-least-one-main', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var checkContext = new axe.testUtils.MockCheckContext();
	var checkSetup = axe.testUtils.checkSetup;
	var shadowSupported = axe.testUtils.shadowSupport.v1;
	var shadowCheckSetup = axe.testUtils.shadowCheckSetup;

	afterEach(function () {
		fixture.innerHTML = '';
		checkContext.reset();
		axe._tree = undefined;
	});

	it('should return false if no div has role property', function() {
		var params = checkSetup('<div id="target">No role</div>');
		var mainIsFound = checks['has-at-least-one-main'].evaluate.apply(checkContext, params);
		assert.isFalse(mainIsFound);
		assert.deepEqual(checkContext._data, mainIsFound);
	});
	
	it('should return false if div has empty role', function() {
		var params = checkSetup('<div id="target" role="">Empty role</div>');
		var mainIsFound = checks['has-at-least-one-main'].evaluate.apply(checkContext, params);
		assert.isFalse(mainIsFound);
		assert.equal(checkContext._data, mainIsFound);
	});
	
	it('should return false if div has role not equal to main', function() {
		var params = checkSetup('<div id="target" role="bananas">Wrong role</div>');
		var mainIsFound = checks['has-at-least-one-main'].evaluate.apply(checkContext, params);
		assert.isFalse(mainIsFound);
		assert.equal(checkContext._data, mainIsFound);
	});
	
	it('should return true if main landmark exists', function(){
		var params = checkSetup('<main id="target">main landmark</main>');
		var mainIsFound = checks['has-at-least-one-main'].evaluate.apply(checkContext, params);
		assert.isTrue(mainIsFound);
		assert.equal(checkContext._data, mainIsFound);
	});
	
	it('should return true if one div has role equal to main', function() {
		var params = checkSetup('<div id="target" role="main">Div with role main</div>');
		var mainIsFound = checks['has-at-least-one-main'].evaluate.apply(checkContext, params);
		assert.isTrue(mainIsFound);
		assert.equal(checkContext._data, mainIsFound);
	});

	(shadowSupported ? it : xit)
	('should return true if main is inside of shadow dom', function() {
		var params = shadowCheckSetup('<div id="target"></div>', '<main>main landmark</main>');
		var mainIsFound = checks['has-at-least-one-main'].evaluate.apply(checkContext, params);
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