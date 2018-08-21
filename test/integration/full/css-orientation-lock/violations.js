describe('css-orientation-lock violations test', function() {
	'use strict';

	var shadowSupported = axe.testUtils.shadowSupport.v1;
	var isPhantom = window.PHANTOMJS ? true : false;

	function addSheet(data) {
		if (data.href) {
			var link = document.createElement('link');
			link.rel = 'stylesheet';
			link.href = data.href;
			document.head.appendChild(link);
		} else {
			const style = document.createElement('style');
			style.type = 'text/css';
			style.appendChild(document.createTextNode(data.text));
			document.head.appendChild(style);
		}
	}

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
			done();
		} else {
			styleSheets.forEach(addSheet);
			// wait for network request to complete for added sheets
			setTimeout(done, 5000);
		}
	});

	it('returns VIOLATIONS if preload is set to TRUE', function(done) {
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
				assert.isTrue(/html/i.test(checkedNode.html));

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

					// Issue - https://github.com/dequelabs/axe-core/issues/1082
					assert.isAtLeast(checkResult.relatedNodes.length, 2);
					done();
				}
			);
		}
	);
});
