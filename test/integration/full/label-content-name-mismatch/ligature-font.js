describe('label-content-name-mismatch test', function() {
	'use strict';

	var results;

	before(function(done) {
		// give enough time for fonts to load
		setTimeout(function() {
			axe.testUtils.awaitNestedLoad(function() {
				axe.run(
					{
						runOnly: { type: 'rule', values: ['label-content-name-mismatch'] }
					},
					function(err, r) {
						assert.isNull(err);
						results = r;
						done();
					}
				);
			});
		}, 2000);
	});

	it('should not find any violations', function() {
		assert.lengthOf(results.violations, 0);
	});
});
