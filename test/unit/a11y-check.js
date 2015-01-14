/* global failureSummary */
describe('dqre.a11yCheck', function () {
	'use strict';
	var orig,
		results = [{
			id: 'gimmeLabel',
			helpUrl: 'things',
			description: 'something nifty',
			tags: ['tag1'],
			details: [{
				result: 'PASS',
				checks: [{
					type: 'PASS',
					result: true,
					data: 'minkey'
				}],
				node: {
					selector: ['minkey'],
					frames: [],
					source: '<minkey>chimp</minky>'
				}
			}]
		}, {
			id: 'idkStuff',
			description: 'something more nifty',
			pageLevel: true,
			result: 'FAIL',
			tags: ['tag2'],
			details: [{
				checks: [{
					type: 'PASS',
					result: false,
					data: 'pillock'
				}],
				node: {
					selector: ['q', 'r', 'pillock'],
					source: '<pillock>george bush</pillock>'
				}
			}]
		}, {
			id: 'bypass',
			description: 'something even more nifty',
			tags: ['tag3'],
			details: [{
				result: 'FAIL',
				checks: [{
					data: 'foon',
					type: 'FAIL',
					result: true
				}],
				node: {
					selector: ['foon'],
					source: '<foon>telephone</foon>'
				}
			}]
		}, {
			id: 'blinky',
			description: 'something awesome',
			tags: ['tag4'],
			details: [{
				result: 'FAO:',
				checks: [{
					data: 'clueso',
					type: 'FAIL',
					result: true
				}],
				node: {
					selector: ['a', 'b', 'clueso'],
					source: '<clueso>nincompoop</clueso>'
				}
			}]
		}];
	beforeEach(function () {
		dqre.configure({ messages: {}, rules: [], data: {failureSummaries: {
			FAIL: {
				failureMessage: function anonymous(it) {
					var out = 'Fix any of the following: \n';
					var arr1 = it;
					if (arr1) {
						var value, i1 = -1, l1 = arr1.length - 1;
						while (i1 < l1) {
							value = arr1[i1 += 1];
							out += ' ' + value + '\n';
						}
					}
					return out;
				}
			},
			PASS: {
				failureMessage: function anonymous(it) {
					var out = 'Fix all of the following: \n';
					var arr1 = it;
					if (arr1) {
						var value, i1 = -1, l1 = arr1.length - 1;
						while (i1 < l1) {
							value = arr1[i1 += 1];
							out += ' ' + value + '\n';
						}
					}
					return out;
				}
			}
		}}});
		orig = window.runRules;
		window.runRules = function (ctxt, options, cb) {
			cb(results);
		};
	});

	afterEach(function () {
		dqre.audit = null;
		window.runRules = orig;
	});

	it('should merge the runRules results into violations and passes', function (done) {
		dqre.a11yCheck(document, {}, function (results) {
			assert.isObject(results);
			assert.isArray(results.violations);
			assert.lengthOf(results.violations, 2);
			assert.isArray(results.passes);
			assert.lengthOf(results.passes, 2);

			done();
		});
	});
	it('should add the rule id to the rule result', function (done) {
		dqre.a11yCheck(document, {}, function (results) {
			assert.equal(results.violations[0].id, 'idkStuff');
			assert.equal(results.violations[1].id, 'bypass');
			assert.equal(results.passes[0].id, 'gimmeLabel');
			assert.equal(results.passes[1].id, 'blinky');
			done();
		});
	});
	it('should add tags to the rule result', function (done) {
		dqre.a11yCheck(document, {}, function (results) {
			assert.deepEqual(results.violations[0].tags, ['tag2']);
			assert.deepEqual(results.violations[1].tags, ['tag3']);
			assert.deepEqual(results.passes[0].tags, ['tag1']);
			assert.deepEqual(results.passes[1].tags, ['tag4']);
			done();
		});
	});
	it('should add the rule help to the rule result', function (done) {
		dqre.a11yCheck(document, {}, function (results) {
			assert.isUndefined(results.violations[0].helpUrl);
			assert.isUndefined(results.violations[1].helpUrl);
			assert.equal(results.passes[0].helpUrl, 'things');
			assert.isUndefined(results.passes[1].helpUrl);
			done();
		});
	});
	it('should add the html to the node data', function (done) {
		dqre.a11yCheck(document, {}, function (results) {
			assert.ok(results.violations[0].nodes);
			assert.equal(results.violations[0].nodes.length, 1);
			assert.equal(results.violations[0].nodes[0].html, '<pillock>george bush</pillock>');
			assert.equal(results.violations[1].nodes[0].html, '<foon>telephone</foon>');
			assert.equal(results.passes[0].nodes[0].html, '<minkey>chimp</minky>');
			assert.equal(results.passes[1].nodes[0].html, '<clueso>nincompoop</clueso>');
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
			assert.deepEqual(results.violations[0].nodes[0].target, ['q', 'r', 'pillock']);
			done();
		});
	});
	it('should add the description to the rule result', function (done) {
		dqre.a11yCheck(document, {}, function (results) {
			assert.equal(results.violations[0].description, 'something more nifty');
			assert.equal(results.violations[1].description, 'something even more nifty');
			assert.equal(results.passes[0].description, 'something nifty');
			assert.equal(results.passes[1].description, 'something awesome');
			done();
		});
	});
});

describe('failureSummary', function () {
	'use strict';
	it('should return an empty array if result: PASS', function () {
		var summary = failureSummary('PASS', {
			result: 'PASS'
		});
		assert.equal(summary, '');
	});

	it('should return a list of all FAILs which return true', function () {
		var summary = failureSummary('FAIL', {
			result: 'FAIL',
			checks: [{
				id: '1',
				result: true,
				failureMessage: '1',
				type: 'FAIL'
			}, {
				id: '2',
				result: false,
				type: 'FAIL'
			}, {
				id: '3',
				result: true,
				failureMessage: '3',
				type: 'FAIL'
			}]
		});

		assert.equal(summary, 'Fix any of the following: \n 1\n 3\n');
	});

	it('should return a list of PASSes if none return true', function () {
		var summary = failureSummary('FAIL', {
			result: 'FAIL',
			checks: [{
				id: '1',
				result: false,
				failureMessage: '1',
				type: 'PASS'
			}, {
				id: '2',
				result: false,
				failureMessage: '2',
				type: 'PASS'
			}, {
				id: '3',
				result: false,
				failureMessage: '3',
				type: 'PASS'
			}, {
				id: '4',
				result: false,
				type: 'FAIL'
			}]
		});

		assert.equal(summary, 'Fix all of the following: \n 1\n 2\n 3\n');
	});

	it('should not return any PASSes if any of them return true', function () {
		var summary = failureSummary('FAIL', {
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

		assert.equal(summary, '');

	});

	it('should concatenate failing passes', function () {
		var summary = failureSummary('FAIL', {
			result: 'FAIL',
			checks: [{
				id: '1',
				result: false,
				failureMessage: '1',
				type: 'PASS'
			}, {
				id: '2',
				result: false,
				failureMessage: '2',
				type: 'PASS'
			}, {
				id: '3',
				result: false,
				failureMessage: '3',
				type: 'PASS'
			}, {
				id: '4',
				result: true,
				failureMessage: '4',
				type: 'FAIL'
			}]
		});

		assert.equal(summary, 'Fix any of the following: \n 4\n\nFix all of the following: \n 1\n 2\n 3\n');

	});

	it('should alias to dqre.run', function () {
		assert.equal(dqre.run, dqre.a11yCheck);
	});


});
