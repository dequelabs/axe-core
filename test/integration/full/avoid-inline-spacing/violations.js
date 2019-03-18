describe('avoid-inline-spacing violations test', function() {
	'use strict';

	// var shadowSupported = axe.testUtils.shadowSupport.v1;
	var isPhantom = window.PHANTOMJS ? true : false;

	var styleSheets = [
		{
			href:
				'https://stackpath.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css'
		},
		{
			href: 'violations.css'
		}
	];

	before(function(done) {
		if (isPhantom) {
			this.skip();
		} else {
			axe.testUtils
				.addStyleSheets(styleSheets)
				.then(function() {
					done();
				})
				.catch(function(error) {
					done(new Error('Could not load stylesheets for testing. ' + error));
				});
		}
	});

	it('returns violations if preload is set to true', function(done) {
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

				// check for violation
				assert.property(res, 'violations');
				assert.lengthOf(res.violations, 1);

				// assert the node
				var checkedNode = res.violations[0].nodes[0];
				assert.isTrue(/html/i.test(checkedNode.html));

				done();
			}
		);
	});

	// TODO: shadowDOM
});
