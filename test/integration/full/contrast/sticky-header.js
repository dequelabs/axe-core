
describe('color-contrast sticky header test', function () {
	'use strict';
	var results;
	before(function (done) {
		axe.a11yCheck(document, { runOnly: { type: 'rule', values: ['color-contrast'] } }, function (r) {
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
