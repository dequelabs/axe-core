describe('aria-hidden on body test ' + window.location.pathname, function () {
	'use strict';
	var results;
	before(function (done) {
		axe.run({ runOnly: { type: 'rule', values: ['aria-hidden-body'] } }, function (err, r) {
			assert.isNull(err);
			results = r;
			done();
		});
	});

	describe('violations', function () {
		it('should find some', function () {
			assert.lengthOf(results.violations, 1);
		});
	});
});
