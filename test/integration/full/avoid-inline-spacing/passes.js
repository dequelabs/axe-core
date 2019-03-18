describe('avoid-inline-spacing passes test', function() {
	'use strict';

	var shadowSupported = axe.testUtils.shadowSupport.v1;
	var isPhantom = window.PHANTOMJS ? true : false;

	var styleSheets = [
		{
			href:
				'https://stackpath.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.css'
		},
		{
			id: 'hasNoSpacingStyles',
			text: 'body { font-size: inherit; }'
		},
		{
			id: 'hasSpacingStyleThatDoNotOverride',
			text: '#content { word-spacing: 50px; }'
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

	it('returns PASSES when page has no overriding inline spacing styles', function(done) {
		// the sheets included in the html, have styles for transform and rotate, hence the violation
		axe.run(
			{
				debug: true,
				runOnly: {
					type: 'rule',
					values: ['avoid-inline-spacing']
				}
			},
			function(err, res) {
				assert.isNull(err);
				assert.isDefined(res);

				// check for violation
				assert.property(res, 'passes');
				assert.lengthOf(res.passes, 1);
				var checkedNode = res.passes[0].nodes[0];
				assert.isTrue(/html/i.test(checkedNode.html));

				done();
			}
		);
	});

	(shadowSupported ? it : xit)(
		'returns PASSES whilst also accommodating shadowDOM styles',
		function(done) {
			// here although media styles are pumped into shadow dom
			// they are not orientation locks, so returns as passes
			var fixture = document.getElementById('shadow-fixture');
			var shadow = fixture.attachShadow({ mode: 'open' });
			shadow.innerHTML =
				'<style> .shadowDiv { line-height: 2; } </style>' +
				'<div class="green">green</div>' +
				'<div class="shadowDiv">red</div>';
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
					assert.property(res, 'passes');
					assert.lengthOf(res.passes, 1);

					var checkedNode = res.passes[0].nodes[0];
					assert.isTrue(/html/i.test(checkedNode.html));
					// TODO: this node verification to be improved

					done();
				}
			);
		}
	);
});
