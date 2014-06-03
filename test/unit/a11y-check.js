/* global mergeResults, CheckResult, RuleResult, Rule, nodeSelectorArray, failureSummary, ruleHelp */
describe('dqre.a11yCheck', function () {
	'use strict';
	var orig,
		results = [{
			id: 'gimmeLabel',
			result: dqre.constants.result.PASS,
			details: [{
				checks: [{data: 'minkey'}],
				node: {
					source: '<minkey>chimp</minky>'
				}
			}]
		}, {
			id: 'idkStuff',
			result: dqre.constants.result.NA,
			details: [{
				checks: [{data: 'pillock'}],
				node: {
					source: '<pillock>george bush</pillock>'
				}
			}]
		}, {
			id: 'bypass',
			result: dqre.constants.result.WARN,
			details: [{
				checks: [{data: 'foon'}],
				node: {
					source: '<foon>telephone</foon>'
				}
			}]
		}, {
			id: 'blinky',
			result: dqre.constants.result.FAIL,
			details: [{
				checks: [{data: 'clueso'}],
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
	it('should merge the dqre.run results into violations, passes and warnings', function (done) {
		dqre.a11yCheck(document, {}, function (results) {
			assert.ok(results);
			assert.ok(results.violations);
			assert.equal(results.violations.length, 1);
			assert.ok(results.passes);
			assert.equal(results.passes.length, 2);
			assert.ok(results.warnings);
			assert.equal(results.warnings.length, 1);
			done();
		});
	});
	it('should add the rule id to the rule result', function (done) {
		dqre.a11yCheck(document, {}, function (results) {
			assert.equal(results.violations[0].id, 'blinky');
			assert.equal(results.passes[0].id, 'gimmeLabel');
			assert.equal(results.passes[1].id, 'idkStuff');
			assert.equal(results.warnings[0].id, 'bypass');
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
			assert.equal(results.passes[1].nodes[0].checks[0].data, 'pillock');
			assert.equal(results.warnings[0].nodes[0].checks[0].data, 'foon');
			done();
		});
	});
	it('should add the html to the node data', function (done) {
		dqre.a11yCheck(document, {}, function (results) {
			assert.ok(results.violations[0].nodes);
			assert.equal(results.violations[0].nodes.length, 1);
			assert.equal(results.violations[0].nodes[0].html, '<clueso>nincompoop</clueso>');
			assert.equal(results.passes[0].nodes[0].html, '<minkey>chimp</minky>');
			assert.equal(results.passes[1].nodes[0].html, '<pillock>george bush</pillock>');
			assert.equal(results.warnings[0].nodes[0].html, '<foon>telephone</foon>');
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
				value: false,
				result: dqre.constants.result.PASS,
			}, {
				id: '2',
				value: false,
				result: dqre.constants.result.PASS,
			}, {
				id: '3',
				value: false,
				result: dqre.constants.result.PASS,
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
		assert.equal(failureSummary(ruleResult, nodeData), '1, 2 & 3');
	});
	it('should only concatenate failed check messages, if its a FAIL (2 & 3)', function () {
		nodeData.checks[0].value = true;
		assert.equal(failureSummary(ruleResult, nodeData), '2 & 3');
	});
	it('should only concatenate failed check messages, if its a FAIL (1 & 2)', function () {
		nodeData.checks[2].value = true;
		assert.equal(failureSummary(ruleResult, nodeData), '1 & 2');
	});
	it('should only concatenate failed check messages, if its a FAIL (2)', function () {
		nodeData.checks[0].value = true;
		nodeData.checks[2].value = true;
		assert.equal(failureSummary(ruleResult, nodeData), '2');
	});
	it('should only concatenate failed check messages, if its a FAIL', function () {
		nodeData.checks[0].value = true;
		nodeData.checks[1].value = true;
		nodeData.checks[2].value = true;
		assert.equal(failureSummary(ruleResult, nodeData), '');
	});
	it('should only concatenate warn check messages, if its a WARN', function () {
		ruleResult.result = dqre.constants.result.WARN;
		nodeData.checks[0].value = true;
		nodeData.checks[1].result = dqre.constants.result.WARN;
		nodeData.checks[2].value = true;
		assert.equal(failureSummary(ruleResult, nodeData), '2');
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

		check = new CheckResult({id: 'check', result: oneResult});
		check.value = true;
		one.addResults(document.body, [check]);
		one.details[0].value = true;
		one.result = utils.bubbleResult(one.details) || dqre.constants.result.NA;
		check = new CheckResult({id: 'check', result: twoResult});
		check.value = true;
		two.addResults(document.body, [check]);
		two.details[0].value = true;
		two.result = utils.bubbleResult(two.details) || dqre.constants.result.NA;
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
		var merged;
		one.addResults(document.body, [new CheckResult({id: 'check', result: dqre.constants.result.PASS})]);
		two.addResults(document.body, [new CheckResult({id: 'check', result: dqre.constants.result.FAIL})]);
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
	describe('cascade FAIL over WARN', function () {
		it('two overrides one', function () {
			var merged;
			results = makeResults(dqre.constants.result.WARN, dqre.constants.result.FAIL);
			merged = mergeResults(results);
			assert.equal(merged[0].result, dqre.constants.result.FAIL);
		});
		it('one overrides two', function () {
			var merged;
			results = makeResults(dqre.constants.result.FAIL, dqre.constants.result.WARN);
			merged = mergeResults(results);
			assert.equal(merged[0].result, dqre.constants.result.FAIL);
		});
	});
	describe('cascade WARN over PASS', function () {
		it('two overrides one', function () {
			var merged;
			results = makeResults(dqre.constants.result.PASS, dqre.constants.result.WARN);
			merged = mergeResults(results);
			assert.equal(merged[0].result, dqre.constants.result.WARN);
		});
		it('one overrides two', function () {
			var merged;
			results = makeResults(dqre.constants.result.WARN, dqre.constants.result.PASS);
			merged = mergeResults(results);
			assert.equal(merged[0].result, dqre.constants.result.WARN);
		});
	});
	describe('cascade WARN over NA', function () {
		it('two overrides one', function () {
			var merged;
			results = makeResults(dqre.constants.result.NA, dqre.constants.result.WARN);
			merged = mergeResults(results);
			assert.equal(merged[0].result, dqre.constants.result.WARN);
		});
		it('one overrides two', function () {
			var merged;
			results = makeResults(dqre.constants.result.WARN, dqre.constants.result.NA);
			merged = mergeResults(results);
			assert.equal(merged[0].result, dqre.constants.result.WARN);
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

