describe('html-xml-lang-mismatch test', function() {
	'use strict';

	var results;
	before(function(done) {
		axe.run(
			{
				runOnly: {
					type: 'rule',
					values: ['html-xml-lang-mismatch']
				}
			},
			function(err, r) {
				assert.isNull(err);
				results = r;
				done();
			}
		);
	});

	describe('inapplicable', function() {
		it('should find one', function() {
			assert.lengthOf(results.inapplicable, 1);
		});
	});
});
