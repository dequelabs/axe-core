/*global tests */
(function () {
	'use strict';

	function flattenResult(results) {
		return {
			passes: results.passes[0],
			violations: results.violations[0],
			incomplete: results.incomplete[0]
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
				var testName = test.description || ruleId + ' test';
				describe(testName, function () {

					function runTest(test, collection) {
						if (!test[collection]) {
							return;
						}

						describe(collection, function () {
							var nodes;
							before(function () {
								if (typeof results[collection] === 'object') {
									nodes = results[collection].nodes;
								}
							});

							test[collection]
							.forEach(function (selector) {
								it('should find ' + JSON.stringify(selector), function () {
									if (!nodes) {
										assert(false, 'there are no ' + collection);
										return;
									}

									var matches = nodes.filter(function (node) {
										for (var i=0; i < selector.length; i++) {
											if (node.target[i] !== selector[i]) {
												return false;
											}
										}
										return node.target.length === selector.length;
									});
									matches.forEach(function (node) {
										// remove each node we find
										nodes.splice(nodes.indexOf(node), 1);
									});

									if (matches.length === 0) {
										assert(false, 'Element not found');

									} else if (matches.length === 1) {
										assert(true, 'Element found');

									} else {
										assert(false, 'Found ' + matches.length + ' elements which match the target');
									}
								});
							});

							it('should not return other results', function () {
								if (typeof nodes !== 'undefined') {
									var targets = nodes.map(function (node) {
										return node.target;
									});
									// check that all nodes are removed
									assert.equal(JSON.stringify(targets), '[]');
								} else {
									assert(false, 'there are no ' + collection);
								}
							});
						});
					}

					var results;
					before(function (done) {
						fixture.innerHTML = test.content;
						waitForFrames(fixture, function () {
							axe.run(fixture, { performanceTimer: false, runOnly: { type: 'rule', values: [ruleId]}}, function (err, r) {
								assert.isNull(err);
								results = flattenResult(r);
								done();
							});

						});
					});
					runTest(test, 'passes');
					runTest(test, 'violations');
					if (test.incomplete) {
						runTest(test, 'incomplete');
					}
				});
			});
		});
	});

}());
