describe('frame-tested', function() {
	'use strict';

	var checkContext, __respondable, respondableCalls, iframe;
	var checkEvaluate = checks['frame-tested'].evaluate;

	before(function() {
		__respondable = axe.utils.respondable;
		axe.utils.respondable = function() {
			respondableCalls.push(Array.from(arguments));
		};
		iframe = document.createElement('iframe');
		document.querySelector('#fixture').appendChild(iframe);
	});

	beforeEach(function() {
		respondableCalls = [];
		checkContext = axe.testUtils.MockCheckContext();
		// Don't throw on async
		checkContext._onAsync = function() {};
	});

	after(function() {
		axe.utils.respondable = __respondable;
	});

	it('correctly calls axe.utils.respondable', function() {
		checkEvaluate.call(checkContext, iframe);

		assert.lengthOf(respondableCalls, 1);
		assert.deepEqual(respondableCalls[0].slice(0, 4), [
			iframe.contentWindow,
			'axe.ping',
			null,
			undefined
		]);
		assert.isFunction(respondableCalls[0][4]);
	});

	it('passes if the iframe contains axe-core', function(done) {
		checkContext._onAsync = function(result) {
			assert.isTrue(result);
			done();
		};
		checkEvaluate.call(checkContext, iframe, { timeout: 20 });
		// Respond to the ping
		respondableCalls[0][4]();
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
