describe('frame-tested', function() {
	'use strict';

	var checkContext, iframe;
	var checkEvaluate = checks['frame-tested'].evaluate;
	var fixture = document.querySelector('#fixture');

	beforeEach(function() {
		iframe = document.createElement('iframe');
		fixture.appendChild(iframe);
		checkContext = axe.testUtils.MockCheckContext();
		// Don't throw on async
		checkContext._onAsync = function() {};
	});

	after(function() {
		fixture = '';
	});

	it('passes if the iframe contains axe-core', function(done) {
		iframe.src = '/test/mock/frames/responder.html';
		iframe.addEventListener('load', function() {
			checkContext._onAsync = function(result) {
				assert.isTrue(result);
				done();
			};

			checkEvaluate.call(checkContext, iframe);
		});
	});

	it('fails if the iframe does not contain axe-core, and isViolation is true', function(done) {
		checkContext._onAsync = function(result) {
			assert.isFalse(result);
			done();
		};
		// Timeout after 10ms
		checkEvaluate.call(checkContext, iframe, {
			timeout: 10,
			isViolation: true
		});
	});

	it('is incomplete if the iframe does not contain axe-core', function(done) {
		checkContext._onAsync = function(result) {
			assert.isUndefined(result);
			done();
		};
		// Timeout after 10ms
		checkEvaluate.call(checkContext, iframe, { timeout: 10 });
	});
});
