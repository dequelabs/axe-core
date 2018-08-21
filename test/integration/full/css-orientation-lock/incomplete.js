describe('css-orientation-lock incomplete test', function() {
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
					values: ['css-orientation-lock']
				},
				preload: false // same effect if preload was not defined
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

	it('returns INCOMPLETE as page has no styles (not even mocha styles)', function(done) {
		axe.run(
			{
				runOnly: {
					type: 'rule',
					values: ['css-orientation-lock']
				},
				preload: true
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
