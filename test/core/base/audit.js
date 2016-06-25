/*global Audit, Rule */
describe('Audit', function () {
	'use strict';
	var a;
	var isNotCalled = function () {
		assert.ok(false, 'Function should not be called');
	};
	var noop = function () {};

	var mockChecks = [{
		id: 'positive1-check1',
		evaluate: function () {
			return true;
		}
	}, {
		id: 'positive2-check1',
		evaluate: function () {
			return true;
		}
	}, {
		id: 'negative1-check1',
		evaluate: function () {
			return true;
		}
	}, {
		id: 'positive3-check1',
		evaluate: function () {
			return true;
		}
	}];

	var mockRules = [{
		id: 'positive1',
		selector: 'input',
		any: [{
			id: 'positive1-check1',
		}]
	}, {
		id: 'positive2',
		selector: '#monkeys',
		any: ['positive2-check1']
	}, {
		id: 'negative1',
		selector: 'div',
		none: ['negative1-check1']
	}, {
		id: 'positive3',
		selector: 'blink',
		any: ['positive3-check1']
	}];

	var fixture = document.getElementById('fixture');

	beforeEach(function () {
		a = new Audit();
		mockRules.forEach(function (r) {
			a.addRule(r);
		});
		mockChecks.forEach(function (c) {
			a.addCheck(c);
		});
	});
	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should be a function', function () {
		assert.isFunction(Audit);
	});

	describe('Audit#_constructHelpUrls', function () {
		it('should create default help URLS', function () {
			var audit = new Audit();
			audit.addRule({
				id: 'target',
				matches: 'function () {return "hello";}',
				selector: 'bob'
			});
			assert.lengthOf(audit.rules, 1);
			assert.equal(audit.data.rules.target, undefined);
			audit._constructHelpUrls();
			assert.deepEqual(audit.data.rules.target, {
				helpUrl: 'https://dequeuniversity.com/rules/axe/x.y/target?application=axeAPI'
			});
		});
		it('should use changed branding', function () {
			var audit = new Audit();
			audit.addRule({
				id: 'target',
				matches: 'function () {return "hello";}',
				selector: 'bob'
			});
			assert.lengthOf(audit.rules, 1);
			assert.equal(audit.data.rules.target, undefined);
			audit.brand = 'thing';
			audit._constructHelpUrls();
			assert.deepEqual(audit.data.rules.target, {
				helpUrl: 'https://dequeuniversity.com/rules/thing/x.y/target?application=axeAPI'
			});
		});
		it('should use changed application', function () {
			var audit = new Audit();
			audit.addRule({
				id: 'target',
				matches: 'function () {return "hello";}',
				selector: 'bob'
			});
			assert.lengthOf(audit.rules, 1);
			assert.equal(audit.data.rules.target, undefined);
			audit.application = 'thing';
			audit._constructHelpUrls();
			assert.deepEqual(audit.data.rules.target, {
				helpUrl: 'https://dequeuniversity.com/rules/axe/x.y/target?application=thing'
			});
		});
	});

	describe('Audit#setBranding', function () {
		it('should change the brand', function () {
			var audit = new Audit();
			assert.equal(audit.brand, 'axe');
			assert.equal(audit.application, 'axeAPI');
			audit.setBranding({
				brand: 'thing'
			});
			assert.equal(audit.brand, 'thing');
			assert.equal(audit.application, 'axeAPI');
		});
		it('should change the application', function () {
			var audit = new Audit();
			assert.equal(audit.brand, 'axe');
			assert.equal(audit.application, 'axeAPI');
			audit.setBranding({
				application: 'thing'
			});
			assert.equal(audit.brand, 'axe');
			assert.equal(audit.application, 'thing');
		});
		it('should call _constructHelpUrls', function () {
			var audit = new Audit();
			audit.addRule({
				id: 'target',
				matches: 'function () {return "hello";}',
				selector: 'bob'
			});
			assert.lengthOf(audit.rules, 1);
			assert.equal(audit.data.rules.target, undefined);
			audit.setBranding({
				application: 'thing'
			});
			assert.deepEqual(audit.data.rules.target, {
				helpUrl: 'https://dequeuniversity.com/rules/axe/x.y/target?application=thing'
			});
		});
		it('should call _constructHelpUrls even when nothing changed', function () {
			var audit = new Audit();
			audit.addRule({
				id: 'target',
				matches: 'function () {return "hello";}',
				selector: 'bob'
			});
			assert.lengthOf(audit.rules, 1);
			assert.equal(audit.data.rules.target, undefined);
			audit.setBranding(undefined);
			assert.deepEqual(audit.data.rules.target, {
				helpUrl: 'https://dequeuniversity.com/rules/axe/x.y/target?application=axeAPI'
			});
		});
	});


	describe('Audit#addRule', function () {
		it('should override existing rule', function () {
			var audit = new Audit();
			audit.addRule({
				id: 'target',
				matches: 'function () {return "hello";}',
				selector: 'bob'
			});
			assert.lengthOf(audit.rules, 1);
			assert.equal(audit.rules[0].selector, 'bob');
			assert.equal(audit.rules[0].matches(), 'hello');

			audit.addRule({
				id: 'target',
				selector: 'fred'
			});

			assert.lengthOf(audit.rules, 1);
			assert.equal(audit.rules[0].selector, 'fred');
			assert.equal(audit.rules[0].matches(), 'hello');
		});
		it('should otherwise push new rule', function () {
			var audit = new Audit();
			audit.addRule({
				id: 'target',
				selector: 'bob'
			});
			assert.lengthOf(audit.rules, 1);
			assert.equal(audit.rules[0].id, 'target');
			assert.equal(audit.rules[0].selector, 'bob');

			audit.addRule({
				id: 'target2',
				selector: 'fred'
			});

			assert.lengthOf(audit.rules, 2);
			assert.equal(audit.rules[1].id, 'target2');
			assert.equal(audit.rules[1].selector, 'fred');
		});

	});

	describe('Audit#resetRulesAndChecks', function () {
		it('should override newly created check', function () {
			var audit = new Audit();
			assert.equal(audit.checks.target, undefined);
			audit.addCheck({
				id: 'target',
				selector: 'bob',
				options: 'jane'
			});
			assert.ok(audit.checks.target);
			assert.equal(audit.checks.target.selector, 'bob');
			audit.resetRulesAndChecks();
			assert.equal(audit.checks.target, undefined);
		});
	});

	describe('Audit#addCheck', function () {
		it('should create a new check', function () {
			var audit = new Audit();
			assert.equal(audit.checks.target, undefined);
			audit.addCheck({
				id: 'target',
				selector: 'bob',
				options: 'jane'
			});
			assert.ok(audit.checks.target);
			assert.equal(audit.checks.target.selector, 'bob');
		});
		it('should configure the metadata, if passed', function () {
			var audit = new Audit();
			assert.equal(audit.checks.target, undefined);
			audit.addCheck({
				id: 'target',
				metadata: 'bob'
			});
			assert.ok(audit.checks.target);
			assert.equal(audit.data.checks.target, 'bob');
		});
		it('should reconfigure existing check', function () {
			var audit = new Audit();
			audit.addCheck({
				id: 'target',
				selector: 'bob',
				options: 'jane'
			});
			assert.equal(audit.checks.target.selector, 'bob');
			assert.equal(audit.checks.target.options, 'jane');

			audit.addCheck({
				id: 'target',
				selector: 'fred'
			});

			assert.equal(audit.checks.target.selector, 'fred');
			assert.equal(audit.checks.target.options, 'jane');
		});
	});

	describe('Audit#run', function () {
		it('should run all the rules', function (done) {
			fixture.innerHTML = '<input aria-label="monkeys" type="text">' +
				'<div id="monkeys">bananas</div>' +
				'<input aria-labelledby="monkeys" type="text">' +
				'<blink>FAIL ME</blink>';

			a.run({ include: [fixture] }, {}, function (results) {
				var expected = [{
					id: 'positive1',
					result: 'NA',
					pageLevel: false,
					impact: null,
					nodes: [{
						node: {
							selector: ['#fixture > input:nth-of-type(1)'],
							source: null
						},
						any: [{
							id: 'positive1-check1',
							result: true,
							data: null,
							relatedNodes: []
						}],
						all: [],
						none: []
					}, {
						node: {
							selector: ['#fixture > input:nth-of-type(2)'],
							source: '<input aria-labelledby="monkeys" type="text">'
						},
						any: [{
							id: 'positive1-check1',
							result: true,
							data: null,
							relatedNodes: []
						}],
						all: [],
						none: []
					}]
				}, {
					id: 'positive2',
					result: 'NA',
					pageLevel: false,
					impact: null,
					nodes: [{
						node: {
							selector: ['#monkeys'],
							source: '<div id="monkeys">bananas</div>'
						},
						any: [{
							id: 'positive2-check1',
							result: true,
							data: null,
							relatedNodes: []
						}],
						all: [],
						none: []
					}]
				}, {
					id: 'negative1',
					result: 'NA',
					pageLevel: false,
					impact: null,
					nodes: [{
						node: {
							selector: ['#fixture'],
							source: '<div id="fixture"><input aria-label="monkeys" type="text"><div id="monkeys">bananas</div><input aria-labelledby="monkeys" type="text"><blink>FAIL ME</blink></div>'
						},
						none: [{
							id: 'negative1-check1',
							result: true,
							data: null,
							relatedNodes: []
						}],
						all: [],
						any: []
					}, {
						node: {
							selector: ['#monkeys'],
							source: '<div id="monkeys">bananas</div>'
						},
						none: [{
							id: 'negative1-check1',
							result: true,
							data: null,
							relatedNodes: []
						}],
						all: [],
						any: []
					}]
				}, {
					id: 'positive3',
					result: 'NA',
					pageLevel: false,
					impact: null,
					nodes: [{
						node: {
							selector: ['#fixture > blink'],
							source: '<blink>FAIL ME</blink>'
						},
						any: [{
							id: 'positive3-check1',
							result: true,
							data: null,
							relatedNodes: []
						}],
						all: [],
						none: []
					}]
				}];
				var out = results[0].nodes[0].node.source;
				results[0].nodes[0].node.source = null;
				assert.deepEqual(JSON.parse(JSON.stringify(results)), expected);
				assert.match(out, /^<input(\s+type="text"|\s+aria-label="monkeys"){2,}>/);
				done();
			}, isNotCalled);
		});
		it('should not run rules disabled by the options', function (done) {
			a.run({ include: [document] }, {
				rules: {
					'positive3': {
						enabled: false
					}
				}
			}, function (results) {
				assert.equal(results.length, 3);
				done();
			}, isNotCalled);
		});
		it('should not run rules disabled by the configuration', function (done) {
			var a = new Audit();
			var success = true;
			a.rules.push(new Rule({
				id: 'positive1',
				selector: '*',
				enabled: false,
				any: [{
					id: 'positive1-check1',
					evaluate: function () {
						success = false;
					}
				}]
			}));
			a.run({ include: [document] }, {}, function () {
				assert.ok(success);
				done();
			}, isNotCalled);
		});
		it('should call the rule\'s run function', function (done) {
			var targetRule = mockRules[mockRules.length - 1],
				rule = axe.utils.findBy(a.rules, 'id', targetRule.id),
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
			}, isNotCalled);
		});
		it('should pass the option to the run function', function (done) {
			var targetRule = mockRules[mockRules.length - 1],
				rule = axe.utils.findBy(a.rules, 'id', targetRule.id),
				passed = false,
				orig, options;

			fixture.innerHTML = '<a href="#">link</a>';
			orig = rule.run;
			rule.run = function (node, o, callback) {
				assert.deepEqual(o, options);
				passed = true;
				callback({});
			};
			options = {rules: {}};
			(options.rules[targetRule.id] = {}).data = 'monkeys';
			a.run({ include: [document] }, options, function () {
				assert.ok(passed);
				rule.run = orig;
				done();
			}, isNotCalled);
		});

		it('should skip pageLevel rules if context is not set to entire page', function () {
			var audit = new Audit();

			audit.rules.push(new Rule({
				pageLevel: true,
				enabled: true,
				evaluate: function () {
					assert.ok(false, 'Should not run');
				}
			}));

			audit.run({ include: [ document.body ], page: false }, {}, function (results) {
				assert.deepEqual(results, []);
			}, isNotCalled);

		});

		it('should pass errors to axe.log', function (done) {
			var orig = axe.log;
			axe.log = function (err) {
				assert.equal(err.message, 'Launch the super sheep!');
				axe.log = orig;
				done();
			};

			a.addRule({
				id: 'throw1',
				selector: '*',
				any: [{
					id: 'throw1-check1',
				}]
			});
			a.addCheck({
				id: 'throw1-check1',
				evaluate: function () {
					throw new Error('Launch the super sheep!');
				}
			});
			a.run({ include: [fixture] }, {
				runOnly: {
					'type': 'rule',
					'values': ['throw1']
				}
			}, noop, isNotCalled);
		});

		it('should not halt if errors occur', function (done) {
			a.addRule({
				id: 'throw1',
				selector: '*',
				any: [{
					id: 'throw1-check1',
				}]
			});
			a.addCheck({
				id: 'throw1-check1',
				evaluate: function () {
					throw new Error('Launch the super sheep!');
				}
			});
			a.run({ include: [fixture] }, {
				runOnly: {
					'type': 'rule',
					'values': ['throw1', 'positive1']
				}
			}, function (results) {
				results = results.filter(function (result) {
					return !!result;
				});
				assert.equal(results.length, 1);
				assert.equal(results[0].id, 'positive1');
				done();
			}, isNotCalled);
		});

		it('should halt if an error occurs when debug is set', function (done) {
			a.addRule({
				id: 'throw1',
				selector: '*',
				any: [{
					id: 'throw1-check1',
				}]
			});
			a.addCheck({
				id: 'throw1-check1',
				evaluate: function () {
					throw new Error('Launch the super sheep!');
				}
			});
			a.run({ include: [fixture] }, {
				debug: true,
				runOnly: {
					'type': 'rule',
					'values': ['throw1']
				}
			}, noop, function (err) {
				assert.equal(err.message, 'Launch the super sheep!');
				done();
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
			audit.rules.push(new Rule({
				id: 'hehe',
				pageLevel: false,
				enabled: false
			}));

			audit.rules[0].after = function (res, opts) {
				assert.equal(res, results[0]);
				assert.deepEqual(opts, options);
				success = true;
			};

			audit.after(results, options);
		});
	});

});
