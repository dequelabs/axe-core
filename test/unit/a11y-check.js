/* global mergeResults, CheckResult, RuleResult, Rule, nodeSelectorArray, failureSummary, failureLevel, ruleHelp */

describe('failureLevel', function () {
	'use strict';
	it('should return definite if one of the failed checks is definite', function () {
		var checks = [
			{type: 'FAIL', result: 'FAIL', certainty: 'DEFINITE', impact: 'CRITICAL', interpretation: 'VIOLATION'}
		],
		level;
		level = failureLevel({result: 'FAIL'}, {checks: checks});
		assert.equal(level.certainty, 'DEFINITE');
	});
	it('should return potential if none of the failed checks is definite', function () {
		var checks = [
			{type: 'FAIL', result: 'FAIL', certainty: 'POTENTIAL', impact: 'CRITICAL', interpretation: 'VIOLATION'}
		],
		level;
		level = failureLevel({result: 'FAIL'}, {checks: checks});
		assert.equal(level.certainty, 'POTENTIAL');
	});
	it('should return violation if one of the failed checks is a violation', function () {
		var checks = [
			{type: 'FAIL', result: 'FAIL', certainty: 'POTENTIAL', impact: 'CRITICAL', interpretation: 'BESTPRACTICE'},
			{type: 'FAIL', result: 'FAIL', certainty: 'POTENTIAL', impact: 'CRITICAL', interpretation: 'VIOLATION'}
		],
		level;
		level = failureLevel({result: 'FAIL'}, {checks: checks});
		assert.equal(level.interpretation, 'VIOLATION');
	});
	it('should return best practice if none of the failed checks is a violation', function () {
		var checks = [
			{type: 'FAIL', result: 'FAIL', certainty: 'POTENTIAL', impact: 'CRITICAL', interpretation: 'BESTPRACTICE'},
			{type: 'FAIL', result: 'FAIL', certainty: 'POTENTIAL', impact: 'CRITICAL', interpretation: 'BESTPRACTICE'}
		],
		level;
		level = failureLevel({result: 'FAIL'}, {checks: checks});
		assert.equal(level.interpretation, 'BESTPRACTICE');
	});
	it('should return critical if one of the failed checks is critical', function () {
		var checks = [
			{type: 'FAIL', result: 'FAIL', certainty: 'POTENTIAL', impact: 'TRIVIAL', interpretation: 'BESTPRACTICE'},
			{type: 'FAIL', result: 'FAIL', certainty: 'POTENTIAL', impact: 'MINOR', interpretation: 'BESTPRACTICE'},
			{type: 'FAIL', result: 'FAIL', certainty: 'POTENTIAL', impact: 'MAJOR', interpretation: 'BESTPRACTICE'},
			{type: 'FAIL', result: 'FAIL', certainty: 'POTENTIAL', impact: 'CRITICAL', interpretation: 'BESTPRACTICE'}
		],
		level;
		level = failureLevel({result: 'FAIL'}, {checks: checks});
		assert.equal(level.impact, 'CRITICAL');
	});
	it('should return major if one of the failed checks is major and none critical', function () {
		var checks = [
			{type: 'FAIL', result: 'FAIL', certainty: 'POTENTIAL', impact: 'TRIVIAL', interpretation: 'BESTPRACTICE'},
			{type: 'FAIL', result: 'FAIL', certainty: 'POTENTIAL', impact: 'MINOR', interpretation: 'BESTPRACTICE'},
			{type: 'FAIL', result: 'FAIL', certainty: 'POTENTIAL', impact: 'MAJOR', interpretation: 'BESTPRACTICE'},
			{type: 'FAIL', result: 'FAIL', certainty: 'POTENTIAL', impact: 'MINOR', interpretation: 'BESTPRACTICE'}
		],
		level;
		level = failureLevel({result: 'FAIL'}, {checks: checks});
		assert.equal(level.impact, 'MAJOR');
	});
	it('should return minor if one of the failed checks is minor and none major and none critical', function () {
		var checks = [
			{type: 'FAIL', result: 'FAIL', certainty: 'POTENTIAL', impact: 'TRIVIAL', interpretation: 'BESTPRACTICE'},
			{type: 'FAIL', result: 'FAIL', certainty: 'POTENTIAL', impact: 'MINOR', interpretation: 'BESTPRACTICE'},
			{type: 'FAIL', result: 'FAIL', certainty: 'POTENTIAL', impact: 'TRIVIAL', interpretation: 'BESTPRACTICE'},
			{type: 'FAIL', result: 'FAIL', certainty: 'POTENTIAL', impact: 'MINOR', interpretation: 'BESTPRACTICE'}
		],
		level;
		level = failureLevel({result: 'FAIL'}, {checks: checks});
		assert.equal(level.impact, 'MINOR');
	});
	it('should return trivial if the failed checks are all trivial', function () {
		var checks = [
			{type: 'FAIL', result: 'FAIL', certainty: 'POTENTIAL', impact: 'TRIVIAL', interpretation: 'BESTPRACTICE'},
			{type: 'FAIL', result: 'FAIL', certainty: 'POTENTIAL', impact: 'TRIVIAL', interpretation: 'BESTPRACTICE'},
			{type: 'FAIL', result: 'FAIL', certainty: 'POTENTIAL', impact: 'TRIVIAL', interpretation: 'BESTPRACTICE'},
			{type: 'FAIL', result: 'FAIL', certainty: 'POTENTIAL', impact: 'TRIVIAL', interpretation: 'BESTPRACTICE'}
		],
		level;
		level = failureLevel({result: 'FAIL'}, {checks: checks});
		assert.equal(level.impact, 'TRIVIAL');
	});
	it('should return undefineds if the result is not a fail', function () {
		var checks = [
			{type: 'FAIL', result: 'PASS', certainty: 'POTENTIAL', impact: 'TRIVIAL', interpretation: 'BESTPRACTICE'},
			{type: 'FAIL', result: 'PASS', certainty: 'POTENTIAL', impact: 'TRIVIAL', interpretation: 'BESTPRACTICE'},
			{type: 'FAIL', result: 'PASS', certainty: 'POTENTIAL', impact: 'TRIVIAL', interpretation: 'BESTPRACTICE'},
			{type: 'FAIL', result: 'PASS', certainty: 'POTENTIAL', impact: 'TRIVIAL', interpretation: 'BESTPRACTICE'}
		],
		level;
		level = failureLevel({result: 'PASS'}, {checks: checks});
		assert.equal(level.impact, undefined);
		assert.equal(level.certainty, undefined);
		assert.equal(level.interpretation, undefined);
	});
	it('should return potential, bestpractices, trivial if there are no failed checks despite a failed result', function () {
		var checks = [
			{type: 'FAIL', result: 'PASS', certainty: 'POTENTIAL', impact: 'TRIVIAL', interpretation: 'BESTPRACTICE'},
			{type: 'FAIL', result: 'PASS', certainty: 'POTENTIAL', impact: 'TRIVIAL', interpretation: 'BESTPRACTICE'},
			{type: 'FAIL', result: 'PASS', certainty: 'POTENTIAL', impact: 'TRIVIAL', interpretation: 'BESTPRACTICE'},
			{type: 'FAIL', result: 'PASS', certainty: 'POTENTIAL', impact: 'TRIVIAL', interpretation: 'BESTPRACTICE'}
		],
		level;
		level = failureLevel({result: 'FAIL'}, {checks: checks});
		assert.equal(level.impact, 'TRIVIAL');
		assert.equal(level.certainty, 'POTENTIAL');
		assert.equal(level.interpretation, 'BESTPRACTICE');
	});
});
describe('dqre.a11yCheck file', function () {
	'use strict';
	var orig,
		results = [{
			id: 'gimmeLabel',
			result: dqre.constants.result.PASS,
			details: [{
				checks: [{
					data: 'minkey',
					type: 'PASS',
					result: 'PASS',
					interpretation: 'VIOLATION',
					certainty: 'POTENTIAL',
					impact: 'CRITICAL'
				}],
				node: {
					source: '<minkey>chimp</minky>'
				}
			}]
		}, {
			id: 'idkStuff',
			result: dqre.constants.result.FAIL,
			details: [{
				checks: [{
					data: 'pillock',
					type: 'PASS',
					result: 'FAIL',
					interpretation: 'VIOLATION',
					certainty: 'POTENTIAL',
					impact: 'CRITICAL'
				}],
				node: {
					source: '<pillock>george bush</pillock>'
				}
			}, {
				checks: [{
					data: 'pillock',
					type: 'PASS',
					result: 'FAIL',
					interpretation: 'BESTPRACTICE',
					certainty: 'DEFINITE',
					impact: 'CRITICAL'
				}],
				node: {
					source: '<pillock>george bush</pillock>'
				}
			}]
		}, {
			id: 'blinky',
			result: dqre.constants.result.FAIL,
			details: [{
				checks: [{
					data: 'clueso',
					type: 'FAIL',
					result: 'FAIL',
					interpretation: 'VIOLATION',
					certainty: 'DEFINITE',
					impact: 'CRITICAL'
				}],
				node: {
					source: '<clueso>nincompoop</clueso>'
				}
			}]
		}];
	beforeEach(function () {
		dqre.configure({ messages: {}, rules: [] });
		orig = dqre.run;
		dqre.run = function (ctxt, options, cb) {
			cb(results);
		};
	});
	afterEach(function () {
		dqre.audit = null;
		dqre.run = orig;
	});
	it('should merge the dqre.run results into violations, passes, bestpractices and potentials', function (done) {
		dqre.a11yCheck(document, {}, function (results) {
			assert.ok(results);
			assert.ok(results.violations);
			assert.equal(results.violations.length, 1);
			assert.ok(results.passes);
			assert.equal(results.passes.length, 1);
			assert.ok(results.potentials);
			assert.equal(results.potentials.length, 1);
			assert.ok(results.bestpractices);
			assert.equal(results.bestpractices.length, 1);
			done();
		});
	});
	it('should add the rule id to the rule result', function (done) {
		dqre.a11yCheck(document, {}, function (results) {
			assert.equal(results.violations[0].id, 'blinky');
			assert.equal(results.passes[0].id, 'gimmeLabel');
			assert.equal(results.potentials[0].id, 'idkStuff');
			assert.equal(results.bestpractices[0].id, 'idkStuff');
			done();
		});
	});
	it('should add the rule help to the rule result', function (done) {
		var origFn = window.ruleHelp;
		window.ruleHelp = function () { return 'your foon is ringing'; };
		dqre.a11yCheck(document, {}, function (results) {
			assert.equal(results.violations[0].help, 'your foon is ringing');
			window.ruleHelp = origFn;
			done();
		});
	});
	it('should add the checks to the node data', function (done) {
		dqre.a11yCheck(document, {}, function (results) {
			assert.ok(results.violations[0].nodes);
			assert.equal(results.violations[0].nodes.length, 1);
			assert.ok(results.violations[0].nodes[0].checks);
			assert.equal(results.violations[0].nodes[0].checks[0].data, 'clueso');
			assert.equal(results.passes[0].nodes[0].checks[0].data, 'minkey');
			assert.equal(results.potentials[0].nodes[0].checks[0].data, 'pillock');
			done();
		});
	});
	it('should add the html to the node data', function (done) {
		dqre.a11yCheck(document, {}, function (results) {
			assert.ok(results.violations[0].nodes);
			assert.equal(results.violations[0].nodes.length, 1);
			assert.equal(results.violations[0].nodes[0].html, '<clueso>nincompoop</clueso>');
			assert.equal(results.passes[0].nodes[0].html, '<minkey>chimp</minky>');
			assert.equal(results.potentials[0].nodes[0].html, '<pillock>george bush</pillock>');
			done();
		});
	});
	it('should add the failure summary to the node data', function (done) {
		var origFn = window.failureSummary;
		window.failureSummary = function () { return 'your foon is ringing'; };
		dqre.a11yCheck(document, {}, function (results) {
			assert.ok(results.violations[0].nodes);
			assert.equal(results.violations[0].nodes.length, 1);
			assert.equal(results.violations[0].nodes[0].failureSummary, 'your foon is ringing');
			window.failureSummary = origFn;
			done();
		});
	});
	it('should add the target selector array to the node data', function (done) {
		var origFn = window.nodeSelectorArray;
		window.nodeSelectorArray = function () { return ['your foon is ringing']; };
		dqre.a11yCheck(document, {}, function (results) {
			assert.ok(results.violations[0].nodes);
			assert.equal(results.violations[0].nodes.length, 1);
			assert.deepEqual(results.violations[0].nodes[0].target, ['your foon is ringing']);
			window.nodeSelectorArray = origFn;
			done();
		});
	});
});

describe('nodeSelectorArray', function () {
	'use strict';
	it('should return an array with only the selector in it if the element is in the top window', function () {
		assert.deepEqual(nodeSelectorArray({node: {
			frames: [],
			selector: 'hehe'
		}}), ['hehe']);
	});
	it('should return an array of strings with the iframe selectors first and the selector last', function () {
		assert.deepEqual(nodeSelectorArray({node: {
			frames: ['first', 'second'],
			selector: 'hehe'
		}}), ['first', 'second', 'hehe']);
	});
	it('should return an empty array if passed undefined', function () {
		assert.deepEqual(nodeSelectorArray(), []);
	});
	it('should return an empty array if passed no node', function () {
		assert.deepEqual(nodeSelectorArray({}), []);
	});
	it('should return an empty array if passed no frames array', function () {
		assert.deepEqual(nodeSelectorArray({node: {}}), []);
	});
	it('should return an empty array if passed no selector', function () {
		assert.deepEqual(nodeSelectorArray({node: {frames: []}}), []);
	});
	it('should return an empty array if passed an empty selector', function () {
		assert.deepEqual(nodeSelectorArray({node: {frames: [], selector: ''}}), []);
	});
});

describe('failureSummary', function () {
	'use strict';
	var ruleResult, nodeData,
		orig = window.dqreConfiguration;
	beforeEach(function () {

		window.dqreConfiguration = {
			messages: {
				checkHelp: {
					'1': '1',
					'2': '2',
					'3': '3'
				}
			}
		};
		ruleResult = {
			result: dqre.constants.result.FAIL
		};
		nodeData = {
			checks: [{
				id: '1',
				result: dqre.constants.result.FAIL,
				type: dqre.constants.result.FAIL,
			}, {
				id: '2',
				result: dqre.constants.result.FAIL,
				type: dqre.constants.result.FAIL,
			}, {
				id: '3',
				result: dqre.constants.result.FAIL,
				type: dqre.constants.result.FAIL,
			}]
		};
	});

	after(function () {
		window.dqreConfiguration = orig;
	});
	it('should return undefined if the rule passed', function () {
		assert.isUndefined(failureSummary({
			result: dqre.constants.result.PASS
		}, {}));
	});
	it('should return a concatenation of the failed/warning check messages if the rule failed or warned', function () {
		var res = failureSummary(ruleResult, nodeData);
		assert.deepEqual(res, ['1', '2', '3']);
	});
	it('should only return failed check messages, if its a FAIL (2 & 3)', function () {
		nodeData.checks[0].result = dqre.constants.result.PASS;
		assert.deepEqual(failureSummary(ruleResult, nodeData), ['2', '3']);
	});
	it('should only return failed check messages, if its a FAIL (1 & 2)', function () {
		nodeData.checks[2].result = dqre.constants.result.PASS;
		assert.deepEqual(failureSummary(ruleResult, nodeData), ['1', '2']);
	});
	it('should only return failed check messages, if its a FAIL (2)', function () {
		nodeData.checks[0].result = dqre.constants.result.PASS;
		nodeData.checks[2].result = dqre.constants.result.PASS;
		assert.deepEqual(failureSummary(ruleResult, nodeData), ['2']);
	});
	it('should only return failed check messages, if its a FAIL', function () {
		nodeData.checks[0].result = dqre.constants.result.PASS;
		nodeData.checks[1].result = dqre.constants.result.PASS;
		nodeData.checks[2].result = dqre.constants.result.PASS;
		assert.deepEqual(failureSummary(ruleResult, nodeData), []);
	});
});

describe('ruleHelp', function () {
	'use strict';
	var orig = window.dqreConfiguration;
	beforeEach(function () {
		window.dqreConfiguration = {
			messages: {
				ruleHelp: {
					'1': '1',
					'2': '2',
					'3': '3'
				}
			}
		};
	});
	after(function () {
		window.dqreConfiguration = orig;
	});
	it('should return an empty string if the rule id does not match a help', function () {
		assert.equal(ruleHelp('4'), '');
	});
	it('should return the rule help string', function () {
		assert.equal(ruleHelp('3'), '3');
	});
});

describe('mergeResults', function () {
	'use strict';

	var results, one, two;
	function makeResults(oneResult, twoResult) {
		var check, results = [];

		if (oneResult === 'NA') {
			one.addResults(document.body, []);
		} else {
			check = new CheckResult({id: 'check', type: oneResult});
			check.setResult(true);
			one.addResults(document.body, [check]);
		}
		one.result = utils.bubbleRuleResult(one.details);
		if (twoResult === 'NA') {
			two.addResults(document.body, []);
		} else {
			check = new CheckResult({id: 'check', type: twoResult});
			check.setResult(true);
			two.addResults(document.body, [check]);
		}
		two.result = utils.bubbleRuleResult(two.details);
		results.push([one]);
		results.push([two]);
		return results;
	}
	beforeEach(function () {
		results = [];
		one = new RuleResult(new Rule({id: 'this'}));
		two = new RuleResult(new Rule({id: 'this'}));
	});
	it('Should merge two results into a single object', function () {
		var merged,
			check1 = new CheckResult({id: 'check', type: dqre.constants.type.PASS}),
			check2 = new CheckResult({id: 'check', type: dqre.constants.type.FAIL});
		check1.setResult(true);
		check2.setResult(true);
		one.addResults(document.body, [check1]);
		two.addResults(document.body, [check2]);
		one.result = utils.bubbleRuleResult(one.details) || one.result;
		two.result = utils.bubbleRuleResult(two.details) || two.result;
		results.push([one]);
		results.push([two]);
		merged = mergeResults(results);
		assert.equal(merged.length, 1);
	});
	describe('cascade FAIL over PASS', function () {
		it('two overrides one', function () {
			var merged;
			results = makeResults(dqre.constants.result.PASS, dqre.constants.result.FAIL);
			merged = mergeResults(results);
			assert.equal(merged[0].result, dqre.constants.result.FAIL);
		});
		it('one overrides two', function () {
			var merged;
			results = makeResults(dqre.constants.result.FAIL, dqre.constants.result.PASS);
			merged = mergeResults(results);
			assert.equal(merged[0].result, dqre.constants.result.FAIL);
		});
	});
	describe('cascade FAIL over NA', function () {
		it('two overrides one', function () {
			var merged;
			results = makeResults(dqre.constants.result.NA, dqre.constants.result.FAIL);
			merged = mergeResults(results);
			assert.equal(merged[0].result, dqre.constants.result.FAIL);
		});
		it('one overrides two', function () {
			var merged;
			results = makeResults(dqre.constants.result.FAIL, dqre.constants.result.NA);
			merged = mergeResults(results);
			assert.equal(merged[0].result, dqre.constants.result.FAIL);
		});
	});
	describe('cascade PASS over NA', function () {
		it('two overrides one', function () {
			var merged;
			results = makeResults(dqre.constants.result.NA, dqre.constants.result.PASS);
			merged = mergeResults(results);
			assert.equal(merged[0].result, dqre.constants.result.PASS);
		});
		it('one overrides two', function () {
			var merged;
			results = makeResults(dqre.constants.result.PASS, dqre.constants.result.NA);
			merged = mergeResults(results);
			assert.equal(merged[0].result, dqre.constants.result.PASS);
		});
	});
});

