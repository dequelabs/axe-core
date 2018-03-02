describe('page-has-*', function () {
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

	describe('evaluate', function () {
		var evaluate = checks['page-has-main'].evaluate;

		it('throws if there is no selector', function () {
			assert.throws(function () {
				var params = checkSetup('<div id="target">No role</div>', undefined);
				evaluate.apply(checkContext, params);
			});

			assert.throws(function () {
				var params = checkSetup('<div id="target">No role</div>', {});
				evaluate.apply(checkContext, params);
			});

			assert.throws(function () {
				var badOptions = { selector: [] };
				var params = checkSetup('<div id="target">No role</div>', badOptions);
				evaluate.apply(checkContext, params);
			});
		});

		it('returns true if there are any matching elements', function () {
			var options = { selector: 'b' };
			var params = checkSetup('<div id="target"><b>No role</b></div>', options);
			assert.isTrue(evaluate.apply(checkContext, params));
		});

		it('returns false if there are no matching elements', function () {
			var options = { selector: 'i' };
			var params = checkSetup('<div id="target"><b>No role</b></div>', options);
			assert.isFalse(evaluate.apply(checkContext, params));
		});
	});

	describe('after', function () {
		var after = checks['page-has-main'].after;

		it('sets all results to true if any are true', function () {
			var results = [{ result: true }, { result: false }, { result: undefined }];
			assert.deepEqual(after(results), [{ result: true },
					{ result: true }, { result: true }]);
		});

		it('Leave the results as is if none of them were true', function () {
			var results = [{ result: false }, { result: false }, { result: undefined }];
			assert.equal(after(results), results);
		});
	});

	describe('page-has-main', function () {
		var check = checks['page-has-main'];

		it('should return false if no div has role property', function() {
			var params = checkSetup('<div id="target">No role</div>', check.options);
			var mainIsFound = check.evaluate.apply(checkContext, params);
			assert.isFalse(mainIsFound);
		});
		
		it('should return false if div has role not equal to main', function() {
			var params = checkSetup('<div id="target" role="bananas">Wrong role</div>', check.options);
			var mainIsFound = check.evaluate.apply(checkContext, params);
			assert.isFalse(mainIsFound);
		});
		
		it('should return true if main landmark exists', function(){
			var params = checkSetup('<main id="target">main landmark</main>', check.options);
			var mainIsFound = check.evaluate.apply(checkContext, params);
			assert.isTrue(mainIsFound);
		});
		
		it('should return true if one div has role equal to main', function() {
			var params = checkSetup('<div id="target" role="main">Div with role main</div>', check.options);
			var mainIsFound = check.evaluate.apply(checkContext, params);
			assert.isTrue(mainIsFound);
		});

		(shadowSupported ? it : xit)
		('should return true if main is inside of shadow dom', function() {
			var params = shadowCheckSetup('<div id="target"></div>', '<main>main landmark</main>', check.options);
			var mainIsFound = check.evaluate.apply(checkContext, params);
			assert.isTrue(mainIsFound);
		});
	});
});
