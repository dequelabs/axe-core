describe('color-contrast sticky header test', function () {
	'use strict';

	describe('violations', function () {
		it('should find none', function (done) {
			axe.run('#fixture', { runOnly: { type: 'rule', values: ['color-contrast'] } }, function (err, results) {
				assert.isNull(err);
				assert.lengthOf(results.violations, 0);
				done();
			});
		});
	});

});
