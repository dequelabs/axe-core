/* global axe */
describe('preload integration test', function() {
	'use strict';

	var isPhantom = window.PHANTOMJS ? true : false;
	var isIE11 = axe.testUtils.isIE11;
	var styleSheets = [
		{
			href: 'https://unpkg.com/gutenberg-css@0.4'
		},
		{
			href:
				'https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.css',
			mediaPrint: true
		},
		{
			text: '.inline-css-test {	font-size: inherit; }'
		}
	];

	before(function(done) {
		// These tests currently break in IE11
		if (isPhantom || isIE11) {
			this.skip();
		} else {
			// load custom rule
			// load custom check
			// the evaluate in check sets the data object
			// -> which is used for assertion in tests below
			axe._load({
				rules: [
					{
						// this rule is not preload dependent
						// and can run immediately
						id: 'run-now-rule',
						selector: 'div#run-now-target',
						any: ['check-context-exists']
					},
					{
						// this rule requires preload
						// and will run after preload assets are ready
						id: 'run-later-rule',
						selector: 'div#run-later-target',
						any: ['check-context-has-assets'],
						preload: {
							assets: ['cssom']
						}
					}
				],
				checks: [
					{
						id: 'check-context-exists',
						evaluate: overridedCheckEvaluateFn
					},
					{
						id: 'check-context-has-assets',
						evaluate: overridedCheckEvaluateFn
					}
				]
			});
			// load stylesheets
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

	function overridedCheckEvaluateFn(node, options, virtualNode, context) {
		// populate the data here which is asserted in tests
		this.data(context);
		return true;
	}

	function attachStylesheets(options, callback) {
		axe.testUtils
			.addStyleSheets(options.styles, options.root)
			.then(function() {
				callback();
			})
			.catch(function(error) {
				callback(new Error('Could not load stylesheets for testing. ' + error));
			});
	}

	it("returns preloaded assets to the check's evaluate fn for the rule which has `preload:true`", function(done) {
		axe.run(
			{
				runOnly: {
					type: 'rule',
					values: ['run-later-rule']
				},
				preload: true
			},
			function(err, res) {
				assert.isNull(err);
				assert.isDefined(res);
				assert.property(res, 'passes');
				assert.lengthOf(res.passes, 1);

				var checkData = res.passes[0].nodes[0].any[0].data;
				assert.property(checkData, 'cssom');

				var cssom = checkData.cssom;

				// ignores all media='print' styleSheets
				assert.lengthOf(cssom, 3);

				// there should be no external sheet returned
				var crossOriginSheet = cssom.filter(function(s) {
					return s.isCrossOrigin;
				});
				assert.lengthOf(crossOriginSheet, 1);

				// verify content of stylesheet
				var inlineStylesheet = cssom.filter(function(s) {
					return s.sheet.cssRules.length === 1 && !s.isCrossOrigin;
				})[0].sheet;
				axe.testUtils.assertStylesheet(
					inlineStylesheet,
					'.inline-css-test',
					'.inline-css-test{font-size:inherit;}'
				);

				done();
			}
		);
	});

	it("returns NO preloaded assets to the check which does not require preload'", function(done) {
		axe.run(
			{
				runOnly: {
					type: 'rule',
					values: ['run-now-rule']
				},
				preload: true
			},
			function(err, res) {
				assert.isNull(err);
				assert.isDefined(res);
				assert.property(res, 'passes');
				assert.lengthOf(res.passes, 1);

				var checkData = res.passes[0].nodes[0].any[0];
				assert.notProperty(checkData, 'cssom');
				done();
			}
		);
	});

	it('returns results for rule (that requires preloaded assets) although preload timed out', function(done) {
		axe.run(
			{
				runOnly: {
					type: 'rule',
					values: ['run-later-rule']
				},
				preload: {
					assets: ['cssom'],
					timeout: 1
				}
			},
			function(err, res) {
				assert.isNull(err);
				assert.isDefined(res);
				assert.property(res, 'passes');
				assert.lengthOf(res.passes, 1);

				var checkData = res.passes[0].nodes[0].any[0].data;
				assert.notProperty(checkData, 'cssom');

				done();
			}
		);
	});

	it('returns no preloaded assets for rule when preload assets is rejected', function(done) {
		/**
		 * Note: Attempting to load a non-existing stylesheet will reject the preload function
		 */
		var stylesForPage = [
			{
				id: 'nonExistingStylesheet',
				text: '@import "import-non-existing-cross-origin.css";'
			}
		];
		attachStylesheets(
			{
				styles: stylesForPage
			},
			function(err) {
				if (err) {
					done(err);
				}
				axe.run(
					{
						runOnly: {
							type: 'rule',
							values: ['run-later-rule']
						},
						// run config asks to preload, and the rule requires a preload as well, context will be mutated with 'cssom' asset
						preload: {
							assets: ['cssom']
						}
					},
					function(err, res) {
						assert.isNull(err);
						assert.isDefined(res);
						assert.property(res, 'passes');
						assert.lengthOf(res.passes, 1);

						var checkData = res.passes[0].nodes[0].any[0].data;
						assert.notProperty(checkData, 'cssom');

						axe.testUtils
							.removeStyleSheets(stylesForPage)
							.then(function() {
								done();
							})
							.catch(function(err) {
								done(err);
							});
					}
				);
			}
		);
	});
});
