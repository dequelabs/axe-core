describe('css-orientation-lock incomplete test', function() {
	'use strict';

	var shouldIt = window.PHANTOMJS ? it.skip : it;

	before(function(done) {
		function start() {
			done();
		}
		if (document.readyState !== 'complete') {
			window.addEventListener('load', start);
		} else {
			start();
		}
	});

	shouldIt('returns INCOMPLETE if preload is set to FALSE', function(done) {
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

	shouldIt(
		'returns INCOMPLETE as page has no styles (not even mocha styles)',
		function(done) {
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
		}
	);
});
