describe('reporters - na', function() {
	'use strict';
	var orig, results,
		_results = [{
			id: 'noMatch',
			helpUrl: 'somewhere',
			description: 'stuff',
			result: 'inapplicable',
			impact: null,
			tags: ['tag3'],
			violations: [],
			passes: []
		}, {
			id: 'gimmeLabel',
			helpUrl: 'things',
			description: 'something nifty',
			result: 'passed',
			impact: null,
			tags: ['tag1'],
			violations: [],
			passes: [{
				result: 'passed',
				impact:null,
				any: [{
					result: true,
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

	afterEach(function() {
		axe._audit = null;
		axe._runRules = orig;
	});

	var naOption = { reporter: 'na' };

	it('should merge the runRules results into violations, passes and inapplicable', function(done) {
		axe.run(naOption, function (err, results) {
			assert.isNull(err);
			assert.isObject(results);
			assert.isArray(results.violations);
			assert.lengthOf(results.violations, 1);
			assert.isArray(results.passes);
			assert.lengthOf(results.passes, 1);
			assert.isArray(results.inapplicable);
			assert.lengthOf(results.inapplicable, 1);

			done();
		});
	});
	it('should add the rule id to the rule result', function(done) {
		axe.run(naOption, function (err, results) {
			assert.isNull(err);
			assert.equal(results.violations[0].id, 'idkStuff');
			assert.equal(results.passes[0].id, 'gimmeLabel');
			assert.equal(results.inapplicable[0].id, 'noMatch');
			done();
		});
	});
	it('should add tags to the rule result', function(done) {
		axe.run(naOption, function (err, results) {
			assert.isNull(err);
			assert.deepEqual(results.violations[0].tags, ['tag2']);
			assert.deepEqual(results.passes[0].tags, ['tag1']);
			assert.deepEqual(results.inapplicable[0].tags, ['tag3']);
			done();
		});
	});
	it('should add the rule help to the rule result', function(done) {
		axe.run(naOption, function (err, results) {
			assert.isNull(err);
			assert.ok(!results.violations[0].helpUrl);
			assert.equal(results.passes[0].helpUrl, 'things');
			assert.equal(results.inapplicable[0].helpUrl, 'somewhere');
			done();
		});
	});
	it('should add the html to the node data', function(done) {
		axe.run(naOption, function (err, results) {
			assert.isNull(err);
			assert.ok(results.violations[0].nodes);
			assert.equal(results.violations[0].nodes.length, 1);
			assert.equal(results.violations[0].nodes[0].html, '<pillock>george bush</pillock>');
			assert.equal(results.passes[0].nodes[0].html, '<minkey>chimp</minky>');
			done();
		});
	});
	it('should add the target selector array to the node data', function(done) {
		axe.run(naOption, function (err, results) {
			assert.isNull(err);
			assert.ok(results.violations[0].nodes);
			assert.equal(results.violations[0].nodes.length, 1);
			assert.deepEqual(results.violations[0].nodes[0].target, ['q', 'r', 'pillock']);
			done();
		});
	});
	it('should add the description to the rule result', function(done) {
		axe.run(naOption, function (err, results) {
			assert.isNull(err);
			assert.equal(results.violations[0].description, 'something more nifty');
			assert.equal(results.passes[0].description, 'something nifty');
			done();
		});
	});
	it('should add the impact to the rule result', function(done) {
		axe.run(naOption, function (err, results) {
			assert.isNull(err);
			assert.equal(results.violations[0].impact, 'cats');
			assert.equal(results.violations[0].nodes[0].impact, 'cats');
			assert.ok(!results.passes[0].impact);
			assert.ok(!results.passes[0].nodes[0].impact);
			assert.isNull(results.passes[0].impact);
			assert.isNull(results.passes[0].nodes[0].impact);
			done();
		});
	});
	it('should map relatedNodes', function(done) {
		axe.run(naOption, function (err, results) {
			assert.isNull(err);
			assert.lengthOf(results.violations[0].nodes[0].all[0].relatedNodes, 1);
			assert.equal(results.violations[0].nodes[0].all[0].relatedNodes[0].target, 'joe');
			assert.equal(results.violations[0].nodes[0].all[0].relatedNodes[0].html, 'bob');

			assert.lengthOf(results.passes[0].nodes[0].any[0].relatedNodes, 1);
			assert.equal(results.passes[0].nodes[0].any[0].relatedNodes[0].target, 'bob');
			assert.equal(results.passes[0].nodes[0].any[0].relatedNodes[0].html, 'fred');
			done();
		});
	});
	it('should include URL', function(done) {
		axe.run(naOption, function (err, results) {
			assert.isNull(err);
			assert.equal(results.url, window.location.href);
			done();
		});
	});
	it('should include timestamp', function(done) {
		axe.run(naOption, function (err, results) {
			assert.isNull(err);
			var timestamp = new Date(results.timestamp);
			assert.instanceOf(timestamp, Date);
			assert.closeTo(timestamp.getTime(), Date.now(), 50);
			done();
		});
	});
});
