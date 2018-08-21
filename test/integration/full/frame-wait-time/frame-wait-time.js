describe('frame-wait-time option', function() {
	'use strict';

	before(function(done) {
		axe.testUtils.awaitNestedLoad(function() {
			done();
		});
	});

	describe('when set', function() {
		var opts = {
			frameWaitTime: 1
		};
		it.skip('should modify the default frame timeout', function(done) {
			var start = new Date();
			// Run axe with an unreasonably short wait time,
			// expecting the frame to time out
			axe.run('#frame', opts, function(err, res) {
				assert.isNotNull(err);
				assert.isUndefined(res);
				assert.equal(err.message, 'Axe in frame timed out: #frame');
				// Ensure that axe waited less than the default wait time
				assert.isBelow(new Date() - start, 60000);
				done();
			});
		});
	});

	describe('when not set', function() {
		it('should use the default frame timeout', function(done) {
			axe.run('main', function(err, res) {
				assert.isNull(err);
				assert.isAbove(res.violations.length, 0);
				done();
			});
		});
	});
});
