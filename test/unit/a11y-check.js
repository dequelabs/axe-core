/* global failureSummary, findHelp */
describe('dqre.a11yCheck', function () {
	'use strict';
	var orig,
		results = [{
			id: 'gimmeLabel',
			result: dqre.constants.result.PASS,
			details: [{
				checks: [{data: 'minkey'}],
				node: {
					selector: 'minkey',
					frames: [],
					source: '<minkey>chimp</minky>'
				}
			}]
		}, {
			id: 'idkStuff',
			result: dqre.constants.result.NA,
			details: [{
				checks: [{data: 'pillock'}],
				node: {
					selector: 'pillock',
					frames: [],
					source: '<pillock>george bush</pillock>'
				}
			}]
		}, {
			id: 'bypass',
			result: dqre.constants.result.WARN,
			details: [{
				checks: [{data: 'foon'}],
				node: {
					selector: 'foon',
					frames: [],
					source: '<foon>telephone</foon>'
				}
			}]
		}, {
			id: 'blinky',
			result: dqre.constants.result.FAIL,
			details: [{
				checks: [{data: 'clueso'}],
				node: {
					selector: 'clueso',
					frames: ['a', 'b'],
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
	it('should merge the dqre.run results into violations and passes', function (done) {
		dqre.a11yCheck(document, {}, function (results) {
			assert.isObject(results);
			assert.isArray(results.violations);
			assert.lengthOf(results.violations, 1);
			assert.isArray(results.passes);
			assert.lengthOf(results.passes, 2);
			done();
		});
	});
	it('should add the rule id to the rule result', function (done) {
		dqre.a11yCheck(document, {}, function (results) {
			assert.equal(results.violations[0].id, 'blinky');
			assert.equal(results.passes[0].id, 'gimmeLabel');
			assert.equal(results.passes[1].id, 'idkStuff');
			done();
		});
	});
	it('should add the rule help to the rule result', function (done) {
		var origFn = window.findHelp;
		window.findHelp = function () { return 'your foon is ringing'; };
		dqre.a11yCheck(document, {}, function (results) {
			assert.equal(results.violations[0].help, 'your foon is ringing');
			window.findHelp = origFn;
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
		dqre.a11yCheck(document, {}, function (results) {
			assert.ok(results.violations[0].nodes);
			assert.equal(results.violations[0].nodes.length, 1);
			assert.deepEqual(results.violations[0].nodes[0].target, ['a', 'b', 'clueso']);
			done();
		});
	});
});

describe('failureSummary', function () {
	'use strict';
	var orig = window.dqreConfiguration;
	beforeEach(function () {

		window.dqreConfiguration = {
			messages: {
				checkHelp: {
					'1': '1',
					'2': '2',
					'3': '3',
					'4': '4',
					'5': '5',
					'6': '6',
					'7': '7',
					'8': '8'
				}
			}
		};
	});

	/*
		nodeData = {
			result: 'FAIL',
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
		}; */

	after(function () {
		window.dqreConfiguration = orig;
	});
	it('should return an empty array if result: PASS', function () {
		var summary = failureSummary({
			result: 'PASS'
		});
		assert.deepEqual(summary, []);
	});

	it('should return a list of all FAILs which return true', function () {
		var summary = failureSummary({
			result: 'FAIL',
			checks: [{
				id: '1',
				result: true,
				type: 'FAIL'
			}, {
				id: '2',
				result: false,
				type: 'FAIL'
			}, {
				id: '3',
				result: true,
				type: 'FAIL'
			}]
		});

		assert.deepEqual(summary, ['1', '3']);
	});

	it('should return a list of PASSes if none return true', function () {
		var summary = failureSummary({
			result: 'FAIL',
			checks: [{
				id: '1',
				result: false,
				type: 'PASS'
			}, {
				id: '2',
				result: false,
				type: 'PASS'
			}, {
				id: '3',
				result: false,
				type: 'PASS'
			}, {
				id: '4',
				result: false,
				type: 'FAIL'
			}]
		});

		assert.deepEqual(summary, ['1', '2', '3']);
	});

	it('should not return any PASSes if any of them return true', function () {
		var summary = failureSummary({
			result: 'FAIL',
			checks: [{
				id: '1',
				result: false,
				type: 'PASS'
			}, {
				id: '2',
				result: true,
				type: 'PASS'
			}, {
				id: '3',
				result: false,
				type: 'PASS'
			}, {
				id: '4',
				result: false,
				type: 'FAIL'
			}]
		});

		assert.deepEqual(summary, []);

	});

	it('should concatenate failing passes', function () {
		var summary = failureSummary({
			result: 'FAIL',
			checks: [{
				id: '1',
				result: false,
				type: 'PASS'
			}, {
				id: '2',
				result: false,
				type: 'PASS'
			}, {
				id: '3',
				result: false,
				type: 'PASS'
			}, {
				id: '4',
				result: true,
				type: 'FAIL'
			}]
		});

		assert.deepEqual(summary, ['4', '1', '2', '3']);

	});

	it('should skip checks that have no help', function () {
		var summary = failureSummary({
			result: 'FAIL',
			checks: [{
				id: 'NOMATCHY',
				result: true,
				type: 'FAIL'
			}]
		});

		assert.deepEqual(summary, []);

	});
});

describe('findHelp', function () {
	'use strict';
	var orig = window.dqreConfiguration;
	beforeEach(function () {
		window.dqreConfiguration = {
			messages: {
				fooHelp: {
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
		assert.equal(findHelp('blah', '4'), '');
	});
	it('should return the rule help string', function () {
		assert.equal(findHelp('foo', '3'), '3');
	});
});

