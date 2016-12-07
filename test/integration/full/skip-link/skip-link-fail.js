describe('skip link fail test', function () {
	'use strict';
	var results;
	before(function (done) {
		axe.run({ runOnly: { type: 'rule', values: ['skip-link'] } }, function (err, r) {
			assert.isNull(err);
			results = r;
			done();
		});
	});

	describe('violations', function () {
		it('should find one', function () {
			assert.lengthOf(results.violations[0].nodes, 1);
		});

		it('should find html', function () {
			assert.deepEqual(results.violations[0].nodes[0].target, ['#firstlink']);
		});
	});

	describe('passes', function () {
		it('should find none', function () {
			assert.lengthOf(results.passes, 0);
		});
	});
});
