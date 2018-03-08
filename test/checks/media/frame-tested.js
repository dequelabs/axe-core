describe('frame-tested', function () {
	'use strict';

	var checkContext = axe.testUtils.MockCheckContext();
	var __respondable;
	var respondableCalls = [];
	var checkEvaluate = checks['frame-tested'].evaluate.bind(checkContext);
	var iframe;

	before(function () {
		__respondable = axe.utils.respondable;
		axe.utils.respondable = function () {
			respondableCalls.push(Array.from(arguments));
		}
		iframe = document.createElement('iframe');
		document.querySelector('#fixture').appendChild(iframe);
	});

	afterEach(function () {
		respondableCalls = [];
		checkContext.reset();
	})

	after(function () {
		axe.utils.respondable = __respondable;
	});

	it('correctly calls axe.utils.respondable', function () {
		checkEvaluate(iframe);

		assert.lengthOf(respondableCalls, 1);
		assert.deepEqual(respondableCalls[0].slice(0,4), 
			[iframe.contentWindow, 'axe.ping', null, undefined]);
		assert.isFunction(respondableCalls[0][4]);
	});

	it('passes if the iframe contains axe-core', function (done) {
		checkEvaluate(iframe, { timeout: 20 });
		checkContext._onAsync = function (result) {
			assert.isTrue(result);
			done();
		}
		// Respond to the ping
		respondableCalls[0][4]();
	});

	it('fails if the iframe does not contain axe-core, and isViolation is true', function (done) {
		checkEvaluate(iframe, { timeout: 10, isViolation: true });
		// Timeout after 10ms
		checkContext._onAsync = function (result) {
			assert.isFalse(result);
			done();
		}
	});

	it('is incomplete if the iframe does not contain axe-core', function (done) {
		checkEvaluate(iframe, { timeout: 10 });
		// Timeout after 10ms
		checkContext._onAsync = function (result) {
			assert.isUndefined(result);
			done();
		}
	});
});
