describe('reporters - no-passes', function() {
	'use strict';
	var orig, results,
		_results = [{
			id: 'gimmeLabel',
			helpUrl: 'things',
			description: 'something nifty',
			tags: ['tag1'],
			result: 'passed',
			impact: null,
			violations: [],
			passes: [{
				result: 'passed',
				any: [{
					result: true,
					impact: null,
					relatedNodes: [{
						selector: 'bob',
						source: 'fred'
					}],
					data: 'minkey'
				}],
				all: [],
				none: [],
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
			result: 'failed',
			impact: 'cats',
			tags: ['tag2'],
			passes: [],
			violations: [{
				result: 'failed',
				all: [{
					relatedNodes: [{
						selector: 'joe',
						source: 'bob'
					}],
					result: false,
					data: 'pillock',
					impact: 'cats'
				}, {
					relatedNodes: [],
					result: true
				}],
				any: [{
					relatedNodes: [],
					result: true
				}],
				none: [{
					relatedNodes: [],
					result: false
				}],
				node: {
					selector: ['q', 'r', 'pillock'],
					source: '<pillock>george bush</pillock>'
				},
				impact: 'cats'
			}]
		}];
	beforeEach(function() {
		results = JSON.parse(JSON.stringify(_results));
		axe._load({
			messages: {},
			rules: [],
			data: {}
		});
		orig = axe._runRules;
		axe._runRules = function(ctxt, options, cb) {
			cb(results);
		};
	});

	var noPassOpt = { reporter: 'no-passes' };

	afterEach(function() {
		axe._audit = null;
		axe._runRules = orig;
	});

	it('should merge the runRules results into violations and  exclude passes', function(done) {
		axe.run(noPassOpt, function (err, results) {
			assert.isNull(err);
			assert.isObject(results);
			assert.isArray(results.violations);
			assert.lengthOf(results.violations, 1);
			assert.isUndefined(results.passes);

			done();
		});
	});
	it('should add the rule id to the rule result', function(done) {
		axe.run(noPassOpt, function (err, results) {
			assert.isNull(err);
			assert.equal(results.violations[0].id, 'idkStuff');
			done();
		});
	});
	it('should add tags to the rule result', function(done) {
		axe.run(noPassOpt, function (err, results) {
			assert.isNull(err);
			assert.deepEqual(results.violations[0].tags, ['tag2']);
			done();
		});
	});
	it('should add the rule help to the rule result', function(done) {
		axe.run(noPassOpt, function (err, results) {
			assert.isNull(err);
			assert.isNotOk(results.violations[0].helpUrl);
			done();
		});
	});
	it('should add the html to the node data', function(done) {
		axe.run(noPassOpt, function (err, results) {
			assert.isNull(err);
			assert.ok(results.violations[0].nodes);
			assert.equal(results.violations[0].nodes.length, 1);
			assert.equal(results.violations[0].nodes[0].html, '<pillock>george bush</pillock>');
			done();
		});
	});
	it('should add the target selector array to the node data', function(done) {
		axe.run(noPassOpt, function (err, results) {
			assert.isNull(err);
			assert.ok(results.violations[0].nodes);
			assert.equal(results.violations[0].nodes.length, 1);
			assert.deepEqual(results.violations[0].nodes[0].target, ['q', 'r', 'pillock']);
			done();
		});
	});
	it('should add the description to the rule result', function(done) {
		axe.run(noPassOpt, function (err, results) {
			assert.isNull(err);
			assert.equal(results.violations[0].description, 'something more nifty');
			done();
		});
	});
	it('should add the impact to the rule result', function(done) {
		axe.run(noPassOpt, function (err, results) {
			assert.isNull(err);
			assert.equal(results.violations[0].impact, 'cats');
			assert.equal(results.violations[0].nodes[0].impact, 'cats');
			done();
		});
	});
	it('should map relatedNodes', function(done) {
		axe.run(noPassOpt, function (err, results) {
			assert.isNull(err);
			assert.lengthOf(results.violations[0].nodes[0].all[0].relatedNodes, 1);
			assert.equal(results.violations[0].nodes[0].all[0].relatedNodes[0].target, 'joe');
			assert.equal(results.violations[0].nodes[0].all[0].relatedNodes[0].html, 'bob');
			done();
		});
	});
	it('should include URL', function(done) {
		axe.run(noPassOpt, function (err, results) {
			assert.isNull(err);
			assert.equal(results.url, window.location.href);
			done();
		});
	});
	it('should include timestamp', function(done) {
		axe.run(noPassOpt, function (err, results) {
			assert.isNull(err);
			var timestamp = new Date(results.timestamp);
			assert.instanceOf(timestamp, Date);
			assert.closeTo(timestamp.getTime(), Date.now(), 50);
			done();
		});
	});
});
