/*global Audit */
describe('Audit', function () {
	'use strict';
	var a;

	var mockRules = [{
		id: 'positive1',
		selector: 'input',
		checks: [{
			id: 'positive1-check1',
			evaluate: function () {
				return true;
			}
		}]
	}, {
		id: 'positive2',
		selector: '#monkeys',
		checks: [{
			id: 'positive2-check1',
			evaluate: function () {
				return true;
			}
		}]
	}, {
		id: 'negative1',
		selector: 'div',
		checks: [{
			id: 'negative1-check1',
			type: 'FAIL',
			evaluate: function () {
				return true;
			}
		}]
	}, {
		id: 'positive3',
		selector: 'blink',
		checks: [{
			id: 'positive3-check1',
			evaluate: function () {
				return true;
			}
		}]
	}];

	var fixture = document.getElementById('fixture');

	beforeEach(function () {
		a = new Audit();
		mockRules.forEach(function (rule) {
			a.addRule(rule);
		});
	});
	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should be a function', function () {
		assert.isFunction(Audit);
	});

	describe('Audit#run', function () {
		it('should run all the rules', function (done) {
			fixture.innerHTML = '<input type="text" aria-label="monkeys">' +
				'<div id="monkeys">bananas</div>' +
				'<input aria-labelledby="monkeys" type="text">' +
				'<blink>FAIL ME</blink>';

			a.run({ include: [fixture] }, {}, function (results) {
				var expected = [{
					id: 'positive1',
					result: 'NA',
					pageLevel: false,
					details: [{
						node: {
							selector: '#fixture > input:nth-of-type(1)',
							source: null,
							frames: []
						},
						checks: [{
							id: 'positive1-check1',
							type: 'PASS',
							result: true,
							data: null,
							relatedNodes: []
						}]
					}, {
						node: {
							selector: '#fixture > input:nth-of-type(2)',
							source: '<input aria-labelledby="monkeys" type="text">',
							frames: []
						},
						checks: [{
							id: 'positive1-check1',
							type: 'PASS',
							result: true,
							data: null,
							relatedNodes: []
						}]
					}]
				}, {
					id: 'positive2',
					result: 'NA',
					pageLevel: false,
					details: [{
						node: {
							selector: '#monkeys',
							source: '<div id="monkeys">bananas</div>',
							frames: []
						},
						checks: [{
							id: 'positive2-check1',
							type: 'PASS',
							result: true,
							data: null,
							relatedNodes: []
						}]
					}]
				}, {
					id: 'negative1',
					result: 'NA',
					pageLevel: false,
					details: [{
						node: {
							selector: '#monkeys',
							source: '<div id="monkeys">bananas</div>',
							frames: []
						},
						checks: [{
							id: 'negative1-check1',
							type: 'FAIL',
							result: true,
							data: null,
							relatedNodes: []
						}]
					}]
				}, {
					id: 'positive3',
					result: 'NA',
					pageLevel: false,
					details: [{
						node: {
							selector: '#fixture > blink',
							source: '<blink>FAIL ME</blink>',
							frames: []
						},
						checks: [{
							id: 'positive3-check1',
							type: 'PASS',
							result: true,
							data: null,
							relatedNodes: []
						}]
					}]
				}];
				var out = results[0].details[0].node.source;
				results[0].details[0].node.source = null;
				assert.deepEqual(results, expected);
				assert.match(out, /^<input(\s+type="text"|\s+aria-label="monkeys"){2,}>/);
				done();
			});
		});
		it('should not run rules disabled by the options', function (done) {
			a.run({ include: [document] }, [{id: 'positive3', enabled: false}], function (results) {
				assert.equal(results.length, 3);
				done();
			});
		});
		it('should not run rules disabled by the configuration', function (done) {
			var a = new Audit();
			var success = true;
			a.addRule({
				id: 'positive1',
				selector: '*',
				enabled: false,
				checks: [{
					id: 'positive1-check1',
					evaluate: function () {
						success = false;
					}
				}]
			});
			a.run({ include: [document] }, null, function () {
				assert.ok(success);
				done();
			});
		});
		it('should call the rule\'s run function', function (done) {
			var targetRule = mockRules[mockRules.length - 1],
				rule = utils.findBy(a.rules, 'id', targetRule.id),
				called = false,
				orig;

			fixture.innerHTML = '<a href="#">link</a>';
			orig = rule.run;
			rule.run = function (node, options, callback) {
				called = true;
				callback({});
			};
			a.run({ include: [document] }, {}, function () {
				assert.isTrue(called);
				rule.run = orig;
				done();
			});
		});
		it('should pass the option to the run function', function (done) {
			var targetRule = mockRules[mockRules.length - 1],
				rule = utils.findBy(a.rules, 'id', targetRule.id),
				passed = false,
				orig, options;

			fixture.innerHTML = '<a href="#">link</a>';
			orig = rule.run;
			rule.run = function (node, options, callback) {
				assert.ok(options);
				assert.equal(options.id, targetRule.id);
				assert.equal(options.data, 'monkeys');
				passed = true;
				callback({});
			};
			options = [{id: targetRule.id, data: 'monkeys'}];
			a.run({ include: [document] }, options, function () {
				assert.ok(passed);
				rule.run = orig;
				done();
			});
		});

		it('should skip pageLevel rules if context is not set to entire page', function () {
			var audit = new Audit();

			audit.addRule({
				pageLevel: true,
				enabled: true,
				evaluate: function () {
					assert.ok(false, 'Should not run');
				}
			});

			audit.run({ include: [ document.body ], page: false }, {}, function (results) {
				assert.deepEqual(results, []);
			});

		});
	});
	describe('Audit#after', function () {
		it('should run Rule#after on any rule whose result is passed in', function () {
			var audit = new Audit();
			var success = false;
			var options = [{ id: 'hehe', enabled: true, monkeys: 'bananas' }];
			var results = [{
				id: 'hehe',
				monkeys: 'bananas'
			}];
			audit.addRule({
				id: 'hehe',
				pageLevel: false,
				enabled: false
			});

			audit.rules[0].after = function (res, opts) {
				assert.equal(res, results[0]);
				assert.equal(opts, options[0]);
				success = true;
			};

			audit.after(results, options);
		});
	});

});
