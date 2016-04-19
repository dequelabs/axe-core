
describe('color-contrast sticky header test', function () {
	'use strict';
	var results;
	before(function (done) {
		axe.run({ runOnly: { type: 'rule', values: ['color-contrast'] } }, function (err, r) {
			assert.isNull(err);
			results = r;
			done();
		});
	});

	describe('violations', function () {
		it('should find none', function () {
			assert.lengthOf(results.violations, 0);
		});
	});

});
