
describe('landmark-no-more-than-one-main test fail', function () {
	'use strict';
	var results;
	before(function (done) {
		window.addEventListener('load', function () {
			axe.run({ runOnly: { type: 'rule', values: ['landmark-no-more-than-one-main'] } }, function (err, r) {
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
		
		it('should find #violation1', function () {
			assert.deepEqual(results.violations[0].nodes[0].target, ['#violation1']);
		});
	});

	describe('passes', function () {
		it('should find 2', function () {
			assert.lengthOf(results.passes[0].nodes, 2);
		});
		
		it('should find #frame1, #pass1', function () {
			assert.deepEqual(results.passes[0].nodes[0].target, ['#frame1', '#pass1']);
		});
		
		it('should find #frame1, #pass2, #pass4', function () {
			assert.deepEqual(results.passes[0].nodes[1].target, ['#frame1', '#frame2', '#pass4']);
		});
	});
		

	it('should find 0 inapplicable', function () {
		assert.lengthOf(results.inapplicable, 0);
	});

	it('should find 0 incomplete', function () {
		assert.lengthOf(results.incomplete, 0);
	});
	
});

