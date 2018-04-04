
describe('landmark-main-is-top-level test fail', function () {
	'use strict';
	var results;
	before(function (done) {
		axe.testUtils.awaitNestedLoad(function () {
			axe.run({ runOnly: { type: 'rule', values: ['landmark-main-is-top-level'] } }, function (err, r) {
				assert.isNull(err);
				results = r;
				done();
			});
		});
	});

	describe('violations', function () {
		it('should find 1', function () {
			assert.lengthOf(results.violations, 1);
		});
		
		it('should find 4 nodes', function () {
			assert.lengthOf(results.violations[0].nodes, 4);
		});
	});

	describe('passes', function () {
		it('should find none', function () {
			assert.lengthOf(results.passes, 0);
		});

	});
		

	it('should find 0 inapplicable', function () {
		assert.lengthOf(results.inapplicable, 0);
	});

	it('should find 0 incomplete', function () {
		assert.lengthOf(results.incomplete, 0);
	});
	
});

