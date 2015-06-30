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
		context.querySelectorAll('iframe')
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
									it('should find ' + selector, function () {
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


/*
function filterRule(r) {
	return r.id === conf.rule;
}

function checkIdenticality(conf, actual, type) {
	'use strict';

	if (conf[type]) {
		assert.ok(actual.length === 1, 'No ' + type + ' results found for rule "' + conf.rule + '"');
	}

	var v = ((actual[0] || {}).nodes || []).map(function(t) {
		return t.target;
	});
	assert.deepEqual(v, conf[type] || [], type);
}
var violations = result.violations.filter(filterRule),
	passes = result.passes.filter(filterRule);

checkIdenticality(conf, violations, 'violations');
checkIdenticality(conf, passes, 'passes');

assert.ok(violations.length + passes.length > 0, 'No result found for rule "' + conf.rule + '"');

*/
