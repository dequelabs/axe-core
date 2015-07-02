describe('skip link pass test', function () {
	'use strict';
	var results;
	before(function (done) {
		axe.a11yCheck(document, { runOnly: { type: 'rule', values: ['skip-link'] } }, function (r) {
			results = r;
			done();
		});
	});

	describe('passes', function () {
		it('should find one', function () {
			assert.lengthOf(results.passes[0].nodes, 1);
		});

		it('should find html', function () {
			assert.deepEqual(results.passes[0].nodes[0].target, ['#firstlink']);
		});
	});

	describe('violations', function () {
		it('should find none', function () {
			assert.lengthOf(results.violations, 0);
		});
	});
});
