/*global Audit, RuleResult */
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
		result: 'FAIL',
		checks: [{
			id: 'positive2-check1',
			evaluate: function () {
				return true;
			}
		}]
	}, {
		id: 'negative1',
		selector: 'div',
		result: 'FAIL',
		checks: [{
			id: 'negative1-check1',
			evaluate: function () {
				return false;
			}
		}]
	}, {
		id: 'positive3',
		selector: 'blink',
		result: 'FAIL',
		type: 'PAGE',
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

	describe('document', function () {
		it('should create a document based on the current window.document', function () {
			var orig = window.DqDocument;
			var called = false;
			window.DqDocument = function () {
				called = true;
				assert.notEqual(this, window, 'invoked with `new`');
				return { bananas: 'monkeys' };
			};
			var a = new Audit({});

			assert.isTrue(called);
			assert.deepEqual(a.document, { bananas: 'monkeys' });
			window.DqDocument = orig;
		});
	});

	describe('Audit#findRule', function () {
		it('should have tests');
	});

	describe('Audit#run', function () {
		it('should work', function (done) {
			fixture.innerHTML = '<input type="text" aria-label="monkeys">' +
				'<div id="monkeys">bananas</div>' +
				'<input type="text" aria-labelledby="monkeys">' +
				'<blink>FAIL ME</blink>';
			a.run({ include: [fixture] }, {}, function () {
				assert.ok('yay');
				done();
			});
		});
		it('should run all the rules', function (done) {
			fixture.innerHTML = '<input type="text" aria-label="monkeys">' +
				'<div id="monkeys">bananas</div>' +
				'<input type="text" aria-labelledby="monkeys">' +
				'<blink>FAIL ME</blink>';

			a.run({ include: [fixture] }, {}, function (results) {
				var expected = [{
					addResults: RuleResult.prototype.addResults,
					id: 'positive1',
					type: 'NODE',
					details: [{
						node: {
							selector: '#fixture > input:nth-of-type(1)',
							source: '<input type="text" aria-label="monkeys">',
							frames: []
						},
						result: 'PASS',
						value: true,
						checks: [{
							id: 'positive1-check1',
							result: 'PASS',
							data: null,
							async: false,
							value: true,
							error: null
						}]
					}, {
						node: {
							selector: '#fixture > input:nth-of-type(2)',
							source: '<input type="text" aria-labelledby="monkeys">',
							frames: []
						},
						result: 'PASS',
						value: true,
						checks: [{
							id: 'positive1-check1',
							result: 'PASS',
							data: null,
							async: false,
							value: true,
							error: null
						}]
					}],
					result: 'PASS'
				}, {
					addResults: RuleResult.prototype.addResults,
					id: 'positive2',
					type: 'NODE',
					details: [{
						node: {
							selector: '#monkeys',
							source: '<div id="monkeys">bananas</div>',
							frames: []
						},
						result: 'PASS',
						value: true,
						checks: [{
							id: 'positive2-check1',
							result: 'PASS',
							data: null,
							async: false,
							value: true,
							error: null
						}]
					}],
					result: 'PASS'
				}, {
					addResults: RuleResult.prototype.addResults,
					id: 'negative1',
					type: 'NODE',
					details: [{
						node: {
							selector: '#monkeys',
							source: '<div id="monkeys">bananas</div>',
							frames: []
						},
						result: 'FAIL',
						value: false,
						checks: [{
							id: 'negative1-check1',
							result: 'PASS',
							data: null,
							async: false,
							value: false,
							error: null
						}]
					}],
					result: 'FAIL'
				}, {
					addResults: RuleFrameResult.prototype.addResults,
					id: 'positive3',
					type: 'PAGE',
					details: [{
						node: {
							selector: '#fixture > blink',
							source: '<blink>FAIL ME</blink>',
							frames: []
						},
						checks: [{
							id: 'positive3-check1',
							result: 'PASS',
							data: null,
							async: false,
							value: true,
							error: null
						}]
					}]
				}];
				assert.deepEqual(results, expected);
				done();
			});
		});
		it('should not run rules disabled by the options', function (done) {
			a.run({ include: [document] }, [{id: 'positive3', enabled: false}], function (results) {
				assert.equal(results.length, 3);
				done();
			});
		});
		it('should call the rule\'s run function', function (done) {
			var targetRule = mockRules[mockRules.length - 1],
				rule = a.findRule(targetRule.id),
				called = false,
				orig;

			fixture.innerHTML = '<a href="#">link</a>';
			orig = rule.run;
			rule.run = function (node, options, callback) {
				called = true;
				callback({});
			};
			a.run({ include: [document] }, {}, function () {
				rule.run = orig;
				done();
			});
		});
		it('should pass the option to the run function', function (done) {
			var targetRule = mockRules[mockRules.length - 1],
				rule = a.findRule(targetRule.id),
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
	describe('Audit#findRule', function () {
		it('should return the rule object by its id', function () {
			var targetRule = mockRules[mockRules.length - 1],
				rule = a.findRule(targetRule.id);
			assert.ok(rule);
			assert.equal(rule.id, targetRule.id);
		});
		it('should return undefined if the id does not exist', function () {
			var rule = a.findRule('somefalseid');
			assert.equal(rule, undefined);
		});
	});
	describe('Audit#after', function () {
		it('should call the rule\'s after function', function (done) {
			var targetRule = mockRules[mockRules.length - 1],
				rule = a.findRule(targetRule.id),
				called = false,
				orig;
			fixture.innerHTML = '<input type="text" aria-label="monkeys">' +
				'<div id="monkeys">bananas</div>' +
				'<input type="text" aria-labelledby="monkeys">' +
				'<blink>FAIL ME</blink>';

			orig = rule.after;
			rule.after = function (node, options, ruleResult, callback) {
				called = true;
				callback(ruleResult);
			};
			a.run({ include: [fixture] }, {}, function (result) {
				a.after(document, {}, result, function () {
					assert.ok(called);
					rule.after = orig;
					done();
				});
			});
		});
		it('should pass the option to the after function', function (done) {
			var targetRule = mockRules[mockRules.length - 1],
				rule = a.findRule(targetRule.id),
				passed = false,
				orig,
				options;
			fixture.innerHTML = '<input type="text" aria-label="monkeys">' +
				'<div id="monkeys">bananas</div>' +
				'<input type="text" aria-labelledby="monkeys">' +
				'<blink>FAIL ME</blink>';

			orig = rule.after;
			options = [{id: targetRule.id, data: 'monkeys'}];
			rule.after = function (node, options, ruleResult, callback) {
				assert.ok(options);
				assert.equal(options.id, targetRule.id);
				assert.equal(options.data, 'monkeys');
				passed = true;
				callback(ruleResult);
			};
			a.run({ include: [fixture] }, options, function (result) {
				a.after(null, options, result, function () {
					assert.ok(passed);
					rule.after = orig;
					done();
				});
			});
		});
		it('should replace the FrameRuleResult object', function (done) {
			fixture.innerHTML = '<a href="#">link</a>';

			a.run({ include: [fixture] }, {}, function (result) {
				var rfr;
				result.forEach(function (r) {
					if (r.id === 'positive3') {
						rfr = r;
					}
				});
				a.after(null, {}, result, function () {
					var nrfr;
					result.forEach(function (r) {
						if (r.id === 'positive3') {
							nrfr = r;
						}
					});
					assert.notEqual(rfr, nrfr);
					done();
				});
			});
		});
	});
});