/*global tests */
(function () {
	'use strict';

	function flattenResult(results) {
		return {
			passes: results.passes[0],
			violations: results.violations[0]
		};
	}

	function waitForFrames(context, cb) {
		function loadListener() {
			loaded++;
			if (loaded === length) {
				cb();
			}
		}
		var loaded = 0;
		var frames = context.querySelectorAll('iframe');
		if (!frames.length) {
			return cb();
		}
		for (var index = 0, length = frames.length; index < length; index++) {
			frames[index].addEventListener('load', loadListener);
		}
	}

	var fixture = document.getElementById('fixture');
	Object.keys(tests).forEach(function (ruleId) {
		describe(ruleId, function () {
			tests[ruleId].forEach(function (test) {
				describe(test.description, function () {

					function runTest(test, collection) {
						if (test[collection]) {
							describe(collection, function () {
								test[collection].forEach(function (selector, index) {
									it('should find ' + JSON.stringify(selector), function () {
										assert.deepEqual(results[collection].nodes[index].target, selector);
									});
								});
							});
						}
					}

					var results;
					before(function (done) {
						fixture.innerHTML = test.content;
						waitForFrames(fixture, function () {
							axe.a11yCheck(fixture, { runOnly: { type: 'rule', values: [ruleId]}}, function (r) {
								results = flattenResult(r);
								done();
							});

						});
					});
					runTest(test, 'passes');
					runTest(test, 'violations');
				});
			});
		});
	});

}());
