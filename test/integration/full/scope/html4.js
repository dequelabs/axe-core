describe('scope html4 test', function () {
	'use strict';
	var results;
	before(function (done) {
		axe.a11yCheck('#fixture', { runOnly: { type: 'rule', values: ['scope'] } }, function (r) {
			results = r;
			done();
		});
	});

	describe('violations', function () {
		it('should find 1', function () {
			assert.lengthOf(results.violations[0].nodes, 1);
		});
		it('should find incorrect value', function () {
			assert.deepEqual(results.violations[0].nodes[0].target, ['#badvalue']);
		});
	});

	describe('passes', function () {
		it('should find 4', function () {
			assert.lengthOf(results.passes[0].nodes, 4);
		});

		it('should find #tdrow', function () {
			assert.deepEqual(results.passes[0].nodes[0].target, ['#tdrow']);
		});

		it('should find #throw', function () {
			assert.deepEqual(results.passes[0].nodes[1].target, ['#throw']);
		});

		it('should find #throw', function () {
			assert.deepEqual(results.passes[0].nodes[2].target, ['#tdcol']);
		});

		it('should find #throw', function () {
			assert.deepEqual(results.passes[0].nodes[3].target, ['#thcol']);
		});
	});
});
