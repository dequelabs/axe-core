describe('css-orientation-lock violations test', function() {
	'use strict';

	var shadowSupported = axe.testUtils.shadowSupport.v1;
	var shouldIt = window.PHANTOMJS ? it.skip : it;

	before(function(done) {
		function start() {
			// wait for document load
			// this ensures css and scripts are loaded for assertion
			done();
		}

		if (window.PHANTOMJS) {
			start();
		} else {
			if (document.readyState !== 'complete') {
				window.addEventListener('load', start);
			} else {
				start();
			}
		}
	});

	shouldIt('returns VIOLATIONS if preload is set to TRUE', function(done) {
		// the sheets included in the html, have styles for transform and rotate, hence the violation
		axe.run(
			{
				runOnly: {
					type: 'rule',
					values: ['css-orientation-lock']
				},
				preload: true // same effect if preload was not defined
			},
			function(err, res) {
				assert.isNull(err);
				assert.isDefined(res);

				// check for violation
				assert.property(res, 'violations');
				assert.lengthOf(res.violations, 1);

				// assert the node and related nodes
				var checkedNode = res.violations[0].nodes[0];
				assert.equal(checkedNode.html, '<html lang="en" id="main">');

				var checkResult = checkedNode.all[0];
				assert.lengthOf(checkResult.relatedNodes, 2);
				var violatedSelectors = ['.someDiv', '.thatDiv'];
				checkResult.relatedNodes.forEach(function(node) {
					var target = node.target[0];
					var className = Array.isArray(target) ? target.reverse()[0] : target;
					assert.isTrue(violatedSelectors.indexOf(className) !== -1);
				});

				done();
			}
		);
	});

	if (!window.PHANTOMJS) {
		(shadowSupported ? it : xit)(
			'returns VIOLATIONS whilst also accommodating shadowDOM styles',
			function(done) {
				var fixture = document.getElementById('shadow-fixture');
				var shadow = fixture.attachShadow({ mode: 'open' });
				shadow.innerHTML =
					'<style> @media screen and (min-width: 10px) and (max-width: 2000px) and (orientation: portrait) { .shadowDiv { transform: rotate(90deg); } } .green { background-color: green; } </style>' +
					'<div class="green">green</div>' +
					'<div class="shadowDiv">red</div>';

				axe.run(
					{
						runOnly: {
							type: 'rule',
							values: ['css-orientation-lock']
						},
						preload: true // same effect if preload was not defined
					},
					function(err, res) {
						assert.isNull(err);
						assert.isDefined(res);

						// check for violation
						assert.property(res, 'violations');
						assert.lengthOf(res.violations, 1);

						// assert the node and related nodes
						var checkedNode = res.violations[0].nodes[0];
						var checkResult = checkedNode.all[0];
						assert.lengthOf(checkResult.relatedNodes, 3);

						var violatedSelectors = ['.someDiv', '.thatDiv', '.shadowDiv'];
						checkResult.relatedNodes.forEach(function(node) {
							var target = node.target[0];
							var className = Array.isArray(target)
								? target.reverse()[0]
								: target;
							assert.isTrue(violatedSelectors.indexOf(className) !== -1);
						});
						done();
					}
				);
			}
		);
	}
});
