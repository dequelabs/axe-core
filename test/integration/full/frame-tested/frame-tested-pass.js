describe('frame-tested-pass test', function() {
	'use strict';

	var results;
	before(function(done) {
		axe.testUtils.awaitNestedLoad(function() {
			axe.run({ runOnly: { type: 'rule', values: ['frame-tested'] } }, function(
				err,
				r
			) {
				assert.isNull(err);
				results = r;
				console.log(results);
				done();
			});
		});
	});

	describe('passes', function() {
		it('should find 1', function() {
			assert.lengthOf(results.passes[0].nodes, 1);
		});
		it('should find first iframe', function() {
			assert.deepEqual(results.passes[0].nodes[0].target, ['#pass']);
		});
	});

	describe('violations', function() {
		it('should find 0', function() {
			assert.lengthOf(results.violations, 0);
		});
	});

	describe('incomplete', function() {
		it('should find 0', function() {
			assert.lengthOf(results.incomplete, 0);
		});
	});
});
