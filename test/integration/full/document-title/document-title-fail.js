
describe('document-title test failure', function () {
	'use strict';
	var results;

	before(function (done) {
		axe.run({ runOnly: { type: 'rule', values: ['document-title'] } }, function (err, r) {
			assert.isNull(err);
			results = r;
			done();
		});
	});

	describe('violations', function () {
		it('should find 1', function () {
			assert.lengthOf(results.violations[0].nodes, 1);
		});
		it('should find first level iframe', function () {
			assert.deepEqual(results.violations[0].nodes[0].target, ['#fail1']);
		});
	});

	describe('passes', function () {
		it('should find 0', function () {
			assert.lengthOf(results.passes, 0);
		});
	});
});
