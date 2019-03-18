describe('avoid-inline-spacing incomplete test', function() {
	'use strict';

	var isPhantom = window.PHANTOMJS ? true : false;

	before(function() {
		if (isPhantom) {
			this.skip();
		}
	});

	it('returns INCOMPLETE if preload is set to FALSE', function(done) {
		axe.run(
			{
				runOnly: {
					type: 'rule',
					values: ['avoid-inline-spacing']
				},
				preload: false
			},
			function(err, res) {
				assert.isNull(err);
				assert.isDefined(res);

				assert.hasAnyKeys(res, ['incomplete', 'passes']);
				assert.lengthOf(res.incomplete, 1);
				done();
			}
		);
	});

	it('returns INCOMPLETE as page has no styles', function(done) {
		axe.run(
			{
				runOnly: {
					type: 'rule',
					values: ['avoid-inline-spacing']
				}
			},
			function(err, res) {
				assert.isNull(err);
				assert.isDefined(res);
				assert.property(res, 'incomplete');
				assert.lengthOf(res.incomplete, 1);
				done();
			}
		);
	});
});
