describe('frame-wait-time option', function() {
	'use strict';
	var respondable = axe.utils.respondable;
	var org = window.setTimeout;

	before(function(done) {
		axe.testUtils.awaitNestedLoad(function() {
			done();
		});
	});

	beforeEach(function() {
		axe.utils.respondable = function(a, b, c, d, callback) {
			setTimeout(function() {
				callback();
			}, 1000);
		};
	});

	afterEach(function() {
		axe.utils.respondable = respondable;
		window.setTimeout = org;
	});

	describe('when set', function() {
		var opts = {
			frameWaitTime: 1
		};
		it('should modify the default frame timeout', function(done) {
			window.setTimeout = function(fn, timeout) {
				if (timeout === 1) {
					return done();
				}
				done('Default timeout not modified');
			};
			axe.run('#frame', opts);
		});
	});

	describe('when not set', function() {
		it('should use the default frame timeout', function(done) {
			window.setTimeout = function(fn, timeout) {
				if (timeout === 60000) {
					return done();
				}
				done('Default timeout not used');
			};
			axe.run('#frame');
		});
	});
});
