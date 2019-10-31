describe('frame-tested-echoes-postmessage test', function() {
	'use strict';

	var results;
	before(function(done) {
		axe.testUtils.awaitNestedLoad(function() {
			axe.run(
				{
					runOnly: { type: 'rule', values: ['frame-tested'] },
					checks: {
						'frame-tested': { options: { isViolation: true } }
					}
				},
				function(err, r) {
					assert.isNull(err);
					results = r;
					done();
				}
			);
		});
	});

	describe('result', function() {
		it('should not error', function() {
			assert.lengthOf(results.violations, 0);
		});
	});
});
