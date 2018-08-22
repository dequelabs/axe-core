describe('css-orientation-lock passes test', function() {
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
			text:
				'@media screen and (min-width: 10px) and (max-width: 3000px) {	html { width: 100vh; } }'
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

	it('returns PASSES when page has STYLE with MEDIA rules (not orientation)', function(done) {
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
				assert.property(res, 'passes');
				assert.lengthOf(res.passes, 1);
				var checkedNode = res.passes[0].nodes[0];
				assert.isTrue(/html/i.test(checkedNode.html));

				done();
			}
		);
	});

	(shadowSupported ? it : xit)(
		'returns PASSES whilst also accommodating shadowDOM styles with MEDIA rules (not orientation)',
		function(done) {
			// here although media styles are pumped into shadow dom
			// they are not orientation locks, so returns as passes
			var fixture = document.getElementById('shadow-fixture');
			var shadow = fixture.attachShadow({ mode: 'open' });
			shadow.innerHTML =
				'<style> @media screen and (min-width: 10px) and (max-width: 2000px) { .shadowDiv { transform: rotate(90deg); } } </style>' +
				'<div class="green">green</div>' +
				'<div class="shadowDiv">red</div>';

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

					// check for violation
					assert.property(res, 'passes');
					assert.lengthOf(res.passes, 1);

					var checkedNode = res.passes[0].nodes[0];
					assert.isTrue(/html/i.test(checkedNode.html));

					var checkResult = checkedNode.all[0];
					assert.lengthOf(checkResult.relatedNodes, 0);

					done();
				}
			);
		}
	);
});
