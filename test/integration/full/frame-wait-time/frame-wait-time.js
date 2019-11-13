/* global sinon */

describe('frame-wait-time option', function() {
	'use strict';
	var spy;
	var respondable = axe.utils.respondable;

	before(function(done) {
		axe.testUtils.awaitNestedLoad(function() {
			done();
		});
	});

	beforeEach(function() {
		// prevent test from running axe inside the iframe multiple times
		axe.utils.respondable = function(a, b, c, d, callback) {
			setTimeout(function() {
				callback();
			}, 50);
		};
		spy = sinon.spy(window, 'setTimeout');
	});

	afterEach(function() {
		axe.utils.respondable = respondable;
		spy.restore();
	});

	describe('when set', function() {
		var opts = {
			frameWaitTime: 1,
			runOnly: {
				type: 'rule',
				values: 'html-has-lang'
			}
		};
		it('should modify the default frame timeout', function(done) {
			axe.run('#frame', opts, function() {
				// with a low timeout, the last call will be the frameWait call
				assert.isTrue(spy.lastCall.calledWith(sinon.match.any, 1));
				done();
			});
		});
	});

	describe('when not set', function() {
		it('should use the default frame timeout', function(done) {
			axe.run('#frame', function() {
				// the 2nd to last call should be the frameWait call
				var call = spy.getCalls()[spy.getCalls().length - 2];
				assert.isTrue(call.calledWith(sinon.match.any, 60000));
				done();
			});
		});
	});
});
