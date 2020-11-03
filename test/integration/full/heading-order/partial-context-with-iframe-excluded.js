describe('heading-order-partial-context-with-iframe test', function() {
	'use strict';

	var results;
	before(function(done) {
		axe.testUtils.awaitNestedLoad(function() {
			axe.run(
				{ include: [['header'], ['footer']] },
				{ runOnly: ['heading-order'] },
				function(err, r) {
					assert.isNull(err);
					results = r;
					done();
				}
			);
		});
	});

	describe('violations', function() {
		it('should find one', function() {
			assert.lengthOf(results.violations, 1);
		});
	});

	describe('passes', function() {
		it('should find 1', function() {
			assert.lengthOf(results.passes[0].nodes, 1);
		});
	});
});
