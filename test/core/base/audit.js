/*global Audit, Rule */
describe('Audit', function() {
	'use strict';

	var a, getFlattenedTree;
	var isNotCalled = function(err) {
		throw err || new Error('Reject should not be called');
	};
	var noop = function() {};

	var mockChecks = [
		{
			id: 'positive1-check1',
			evaluate: function() {
				return true;
			}
		},
		{
			id: 'positive2-check1',
			evaluate: function() {
				return true;
			}
		},
		{
			id: 'negative1-check1',
			evaluate: function() {
				return true;
			}
		},
		{
			id: 'positive3-check1',
			evaluate: function() {
				return true;
			}
		}
	];

	var mockRules = [
		{
			id: 'positive1',
			selector: 'input',
			tags: ['positive'],
			any: [
				{
					id: 'positive1-check1'
				}
			]
		},
		{
			id: 'positive2',
			selector: '#monkeys',
			tags: ['positive'],
			any: ['positive2-check1']
		},
		{
			id: 'negative1',
			selector: 'div',
			tags: ['negative'],
			none: ['negative1-check1']
		},
		{
			id: 'positive3',
			selector: 'blink',
			tags: ['positive'],
			any: ['positive3-check1']
		}
	];

	var fixture = document.getElementById('fixture');

	var origAuditRun;
	var origAxeUtilsPreload;

	beforeEach(function() {
		a = new Audit();
		mockRules.forEach(function(r) {
			a.addRule(r);
		});
		mockChecks.forEach(function(c) {
			a.addCheck(c);
		});
		getFlattenedTree = axe.utils.getFlattenedTree;
		origAuditRun = a.run;
		origAxeUtilsPreload = axe.utils.preload;
	});

	afterEach(function() {
		fixture.innerHTML = '';
		axe._tree = undefined;
		axe._selectCache = undefined;
		axe.utils.getFlattenedTree = getFlattenedTree;
		a.run = origAuditRun;
		axe.utils.preload = origAxeUtilsPreload;
	});

	it('should be a function', function() {
		assert.isFunction(Audit);
	});

	describe('Audit#_constructHelpUrls', function() {
		it('should create default help URLS', function() {
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
				helpUrl:
					'https://dequeuniversity.com/rules/axe/x.y/target?application=axeAPI'
			});
		});
		it('should use changed branding', function() {
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
				helpUrl:
					'https://dequeuniversity.com/rules/thing/x.y/target?application=axeAPI'
			});
		});
		it('should use changed application', function() {
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
				helpUrl:
					'https://dequeuniversity.com/rules/axe/x.y/target?application=thing'
			});
		});

		it('does not override helpUrls of different products', function() {
			var audit = new Audit();
			audit.addRule({
				id: 'target1',
				matches: 'function () {return "hello";}',
				selector: 'bob',
				metadata: {
					helpUrl:
						'https://dequeuniversity.com/rules/myproject/x.y/target1?application=axeAPI'
				}
			});
			audit.addRule({
				id: 'target2',
				matches: 'function () {return "hello";}',
				selector: 'bob'
			});

			assert.equal(
				audit.data.rules.target1.helpUrl,
				'https://dequeuniversity.com/rules/myproject/x.y/target1?application=axeAPI'
			);
			assert.isUndefined(audit.data.rules.target2);

			assert.lengthOf(audit.rules, 2);
			audit.brand = 'thing';
			audit._constructHelpUrls();

			assert.equal(
				audit.data.rules.target1.helpUrl,
				'https://dequeuniversity.com/rules/myproject/x.y/target1?application=axeAPI'
			);
			assert.equal(
				audit.data.rules.target2.helpUrl,
				'https://dequeuniversity.com/rules/thing/x.y/target2?application=axeAPI'
			);
		});
		it('understands prerelease type version numbers', function() {
			var tempVersion = axe.version;
			var audit = new Audit();
			audit.addRule({
				id: 'target',
				matches: 'function () {return "hello";}',
				selector: 'bob'
			});

			axe.version = '3.2.1-alpha.0';
			audit._constructHelpUrls();

			axe.version = tempVersion;
			assert.equal(
				audit.data.rules.target.helpUrl,
				'https://dequeuniversity.com/rules/axe/3.2/target?application=axeAPI'
			);
		});
		it('sets x.y as version for invalid versions', function() {
			var tempVersion = axe.version;
			var audit = new Audit();
			audit.addRule({
				id: 'target',
				matches: 'function () {return "hello";}',
				selector: 'bob'
			});

			axe.version = 'in-3.0-valid';
			audit._constructHelpUrls();

			axe.version = tempVersion;
			assert.equal(
				audit.data.rules.target.helpUrl,
				'https://dequeuniversity.com/rules/axe/x.y/target?application=axeAPI'
			);
		});
		it('matches major release versions', function() {
			var tempVersion = axe.version;
			var audit = new Audit();
			audit.addRule({
				id: 'target',
				matches: 'function () {return "hello";}',
				selector: 'bob'
			});

			axe.version = '1.0.0';
			audit._constructHelpUrls();

			axe.version = tempVersion;
			assert.equal(
				audit.data.rules.target.helpUrl,
				'https://dequeuniversity.com/rules/axe/1.0/target?application=axeAPI'
			);
		});
	});

	describe('Audit#setBranding', function() {
		it('should change the brand', function() {
			var audit = new Audit();
			assert.equal(audit.brand, 'axe');
			assert.equal(audit.application, 'axeAPI');
			audit.setBranding({
				brand: 'thing'
			});
			assert.equal(audit.brand, 'thing');
			assert.equal(audit.application, 'axeAPI');
		});
		it('should change the application', function() {
			var audit = new Audit();
			assert.equal(audit.brand, 'axe');
			assert.equal(audit.application, 'axeAPI');
			audit.setBranding({
				application: 'thing'
			});
			assert.equal(audit.brand, 'axe');
			assert.equal(audit.application, 'thing');
		});
		it('should call _constructHelpUrls', function() {
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
				helpUrl:
					'https://dequeuniversity.com/rules/axe/x.y/target?application=thing'
			});
		});
		it('should call _constructHelpUrls even when nothing changed', function() {
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
				helpUrl:
					'https://dequeuniversity.com/rules/axe/x.y/target?application=axeAPI'
			});
		});
		it('should not replace custom set branding', function() {
			var audit = new Audit();
			audit.addRule({
				id: 'target',
				matches: 'function () {return "hello";}',
				selector: 'bob',
				metadata: {
					helpUrl:
						'https://dequeuniversity.com/rules/customer-x/x.y/target?application=axeAPI'
				}
			});
			audit.setBranding({
				application: 'thing',
				brand: 'other'
			});
			assert.equal(
				audit.data.rules.target.helpUrl,
				'https://dequeuniversity.com/rules/customer-x/x.y/target?application=axeAPI'
			);
		});
	});

	describe('Audit#addRule', function() {
		it('should override existing rule', function() {
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
		it('should otherwise push new rule', function() {
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

	describe('Audit#resetRulesAndChecks', function() {
		it('should override newly created check', function() {
			var audit = new Audit();
			assert.equal(audit.checks.target, undefined);
			audit.addCheck({
				id: 'target',
				options: 'jane'
			});
			assert.ok(audit.checks.target);
			assert.equal(audit.checks.target.options, 'jane');
			audit.resetRulesAndChecks();
			assert.equal(audit.checks.target, undefined);
		});
	});

	describe('Audit#addCheck', function() {
		it('should create a new check', function() {
			var audit = new Audit();
			assert.equal(audit.checks.target, undefined);
			audit.addCheck({
				id: 'target',
				options: 'jane'
			});
			assert.ok(audit.checks.target);
			assert.equal(audit.checks.target.options, 'jane');
		});
		it('should configure the metadata, if passed', function() {
			var audit = new Audit();
			assert.equal(audit.checks.target, undefined);
			audit.addCheck({
				id: 'target',
				metadata: { guy: 'bob' }
			});
			assert.ok(audit.checks.target);
			assert.equal(audit.data.checks.target.guy, 'bob');
		});
		it('should reconfigure existing check', function() {
			var audit = new Audit();
			var myTest = function() {};
			audit.addCheck({
				id: 'target',
				evaluate: myTest,
				options: 'jane'
			});

			assert.equal(audit.checks.target.options, 'jane');

			audit.addCheck({
				id: 'target',
				options: 'fred'
			});

			assert.equal(audit.checks.target.evaluate, myTest);
			assert.equal(audit.checks.target.options, 'fred');
		});
		it('should not turn messages into a function', function() {
			var audit = new Audit();
			var spec = {
				id: 'target',
				evaluate: 'function () { return "blah";}',
				metadata: {
					messages: {
						fail: 'it failed'
					}
				}
			};
			audit.addCheck(spec);

			assert.equal(typeof audit.checks.target.evaluate, 'function');
			assert.equal(typeof audit.data.checks.target.messages.fail, 'string');
			assert.equal(audit.data.checks.target.messages.fail, 'it failed');
		});

		it('should turn function strings into a function', function() {
			var audit = new Audit();
			var spec = {
				id: 'target',
				evaluate: 'function () { return "blah";}',
				metadata: {
					messages: {
						fail: 'function () {return "it failed";}'
					}
				}
			};
			audit.addCheck(spec);

			assert.equal(typeof audit.checks.target.evaluate, 'function');
			assert.equal(typeof audit.data.checks.target.messages.fail, 'function');
			assert.equal(audit.data.checks.target.messages.fail(), 'it failed');
		});
	});

	describe('Audit#run', function() {
		it('should run all the rules', function(done) {
			fixture.innerHTML =
				'<input aria-label="monkeys" type="text">' +
				'<div id="monkeys">bananas</div>' +
				'<input aria-labelledby="monkeys">' +
				'<blink>FAIL ME</blink>';

			a.run(
				{ include: [axe.utils.getFlattenedTree(fixture)[0]] },
				{},
				function(results) {
					var expected = [
						{
							id: 'positive1',
							result: 'inapplicable',
							pageLevel: false,
							impact: null,
							nodes: '...other tests cover this...'
						},
						{
							id: 'positive2',
							result: 'inapplicable',
							pageLevel: false,
							impact: null,
							nodes: '...other tests cover this...'
						},
						{
							id: 'negative1',
							result: 'inapplicable',
							pageLevel: false,
							impact: null,
							nodes: '...other tests cover this...'
						},
						{
							id: 'positive3',
							result: 'inapplicable',
							pageLevel: false,
							impact: null,
							nodes: '...other tests cover this...'
						}
					];

					var out = results[0].nodes[0].node.source;
					results.forEach(function(res) {
						// attribute order is a pain in the lower back in IE, so we're not
						// comparing nodes. Check.run and Rule.run do this.
						res.nodes = '...other tests cover this...';
					});

					assert.deepEqual(JSON.parse(JSON.stringify(results)), expected);
					assert.match(
						out,
						/^<input(\s+type="text"|\s+aria-label="monkeys"){2,}>/
					);
					done();
				},
				isNotCalled
			);
		});

		it('should not run rules disabled by the options', function(done) {
			a.run(
				{ include: [document] },
				{
					rules: {
						positive3: {
							enabled: false
						}
					}
				},
				function(results) {
					assert.equal(results.length, 3);
					done();
				},
				isNotCalled
			);
		});

		it('should ensure audit.run recieves preload options', function(done) {
			fixture.innerHTML = '<input aria-label="yo" type="text">';

			var audit = new Audit();
			audit.addRule({
				id: 'preload1',
				selector: '*'
				// this inherently means this rule does not need preload
			});
			audit.run = function(context, options, resolve, reject) {
				var randomRule = this.rules[0];
				randomRule.run(
					context,
					options,
					function(ruleResult) {
						ruleResult.OPTIONS_PASSED = options;
						resolve([ruleResult]);
					},
					reject
				);
			};

			var preloadOptions = {
				preload: {
					assets: ['cssom']
				}
			};
			audit.run(
				{ include: [axe.utils.getFlattenedTree(fixture)[0]] },
				{
					preload: preloadOptions
				},
				function(res) {
					assert.isDefined(res);

					assert.lengthOf(res, 1);
					assert.property(res[0], 'OPTIONS_PASSED');

					var optionsPassed = res[0].OPTIONS_PASSED;
					assert.property(optionsPassed, 'preload');
					assert.deepEqual(optionsPassed.preload, preloadOptions);

					// ensure cache is cleared
					assert.isTrue(typeof axe._selectCache === 'undefined');

					done();
				},
				noop
			);
		});

		it('should run rules (that do not need preload) and preload assets simultaneously', function(done) {
			// overriding and resolving both check and preload with a delay
			// but the invoked timestamp should ensure that they were invoked alomost immediately

			fixture.innerHTML = '<div id="div1"></div><div id="div2"></div>';

			var runStartTime = new Date();
			var preloadInvokedTime = new Date();
			var noPreloadCheckedInvokedTime = new Date();
			var noPreloadRuleCheckEvaluateInvoked = false;
			var preloadOverrideInvoked = false;

			// override preload method
			axe.utils.preload = function(options) {
				preloadInvokedTime = new Date();
				preloadOverrideInvoked = true;

				var q = axe.utils.queue();

				q.defer(function(res, rej) {
					// a delayed deferred fn, so the q resolves late
					setTimeout(function() {
						res(true);
					}, 2000);
				});

				return q;
			};

			var audit = new Audit();
			// add a rule and check that does not need preload
			audit.addRule({
				id: 'no-preload',
				selector: 'div#div1', // this inherently means this rule does not need preload
				any: ['no-preload-check']
			});
			audit.addCheck({
				id: 'no-preload-check',
				evaluate: function(node, options, vNode, context) {
					noPreloadCheckedInvokedTime = new Date();
					noPreloadRuleCheckEvaluateInvoked = true;
					var ready = this.async();
					setTimeout(function() {
						ready(true);
					}, 1000);
				}
			});

			// add a rule which needs preload
			audit.addRule({
				id: 'yes-preload',
				selector: 'div#div2', // this inherently means this rule does not need preload
				preload: true
			});

			var preloadOptions = {
				preload: {
					assets: ['cssom']
				}
			};

			var allowedDiff = 50;

			audit.run(
				{ include: [axe.utils.getFlattenedTree(fixture)[0]] },
				{
					preload: preloadOptions
				},
				function(results) {
					assert.isDefined(results);
					// assert that check was invoked for rule(s)
					assert.isTrue(noPreloadRuleCheckEvaluateInvoked);
					// assert preload was invoked
					assert.isTrue(preloadOverrideInvoked);
					// assert that time diff(s)
					// assert that run check invoked immediately
					// choosing 5ms as an arbitary number
					assert.isBelow(
						noPreloadCheckedInvokedTime - runStartTime,
						allowedDiff
					);
					// assert that preload  invoked immediately
					assert.isBelow(preloadInvokedTime - runStartTime, allowedDiff);
					// ensure cache is clear
					assert.isTrue(typeof axe._selectCache === 'undefined');
					// done
					done();
				},
				noop
			);
		});

		it('should pass assets from preload to rule check that needs assets as context', function(done) {
			fixture.innerHTML = '<div id="div1"></div><div id="div2"></div>';

			var yesPreloadRuleCheckEvaluateInvoked = false;
			var preloadOverrideInvoked = false;

			var preloadData = {
				data: 'you got it!'
			};
			// override preload method
			axe.utils.preload = function(options) {
				preloadOverrideInvoked = true;
				var q = axe.utils.queue();
				q.defer(function(resolve, reject) {
					resolve({
						cssom: preloadData
					});
				});
				return q;
			};

			var audit = new Audit();
			// add a rule and check that does not need preload
			audit.addRule({
				id: 'no-preload',
				selector: 'div#div1' // this inherently means this rule does not need preload
			});
			// add a rule which needs preload
			audit.addRule({
				id: 'yes-preload',
				selector: 'div#div2', // this inherently means this rule does not need preload
				preload: true,
				any: ['yes-preload-check']
			});
			audit.addCheck({
				id: 'yes-preload-check',
				evaluate: function(node, options, vNode, context) {
					yesPreloadRuleCheckEvaluateInvoked = true;
					this.data(context);
					return true;
				}
			});

			var preloadOptions = {
				preload: {
					assets: ['cssom']
				}
			};
			audit.run(
				{ include: [axe.utils.getFlattenedTree(fixture)[0]] },
				{
					preload: preloadOptions
				},
				function(results) {
					assert.isDefined(results);
					// assert that check was invoked for rule(s)
					assert.isTrue(yesPreloadRuleCheckEvaluateInvoked);
					// assert preload was invoked
					assert.isTrue(preloadOverrideInvoked);

					// assert preload data that was passed to check
					var ruleResult = results.filter(function(r) {
						return (r.id = 'yes-preload' && r.nodes.length > 0);
					})[0];
					var checkResult = ruleResult.nodes[0].any[0];
					assert.isDefined(checkResult.data);
					assert.property(checkResult.data, ['cssom']);
					assert.deepEqual(checkResult.data.cssom, preloadData);
					// ensure cache is clear
					assert.isTrue(typeof axe._selectCache === 'undefined');
					// done
					done();
				},
				noop
			);
		});

		it('should continue to run rules and return result when preload is rejected', function(done) {
			fixture.innerHTML = '<div id="div1"></div><div id="div2"></div>';

			var preloadOverrideInvoked = false;
			var preloadNeededCheckInvoked = false;
			var rejectionMsg = 'Boom! Things went terribly wrong!';

			// override preload method
			axe.utils.preload = function(options) {
				preloadOverrideInvoked = true;
				var q = axe.utils.queue();
				q.defer(function(resolve, reject) {
					reject(rejectionMsg);
				});
				return q;
			};

			var audit = new Audit();
			// add a rule and check that does not need preload
			audit.addRule({
				id: 'no-preload',
				selector: 'div#div1' // this inherently means this rule does not need preload
			});
			// add a rule which needs preload
			audit.addRule({
				id: 'yes-preload',
				selector: 'div#div2', // this inherently means this rule does not need preload
				preload: true,
				any: ['yes-preload-check']
			});
			audit.addCheck({
				id: 'yes-preload-check',
				evaluate: function(node, options, vNode, context) {
					preloadNeededCheckInvoked = true;
					this.data(context);
					return true;
				}
			});

			var preloadOptions = {
				preload: {
					assets: ['cssom']
				}
			};
			audit.run(
				{ include: [axe.utils.getFlattenedTree(fixture)[0]] },
				{
					preload: preloadOptions
				},
				function(results) {
					assert.isDefined(results);
					// assert preload was invoked
					assert.isTrue(preloadOverrideInvoked);

					// assert that both rules ran, although preload failed
					assert.lengthOf(results, 2);

					// assert that because preload failed
					// cssom was not populated on context of repective check
					assert.isTrue(preloadNeededCheckInvoked);
					var ruleResult = results.filter(function(r) {
						return (r.id = 'yes-preload' && r.nodes.length > 0);
					})[0];
					var checkResult = ruleResult.nodes[0].any[0];
					assert.isDefined(checkResult.data);
					assert.notProperty(checkResult.data, ['cssom']);
					// done
					done();
				},
				noop
			);
		});

		it('should continue to run rules and return result when axios time(s)out and rejects preload', function(done) {
			fixture.innerHTML = '<div id="div1"></div><div id="div2"></div>';

			// there is no stubbing here,
			// the actual axios call is invoked, and timedout immediately as timeout is set to 0.1

			var preloadNeededCheckInvoked = false;
			var audit = new Audit();
			// add a rule and check that does not need preload
			audit.addRule({
				id: 'no-preload',
				selector: 'div#div1' // this inherently means this rule does not need preload
			});
			// add a rule which needs preload
			audit.addRule({
				id: 'yes-preload',
				selector: 'div#div2', // this inherently means this rule does not need preload
				preload: true,
				any: ['yes-preload-check']
			});
			audit.addCheck({
				id: 'yes-preload-check',
				evaluate: function(node, options, vNode, context) {
					preloadNeededCheckInvoked = true;
					this.data(context);
					return true;
				}
			});

			var preloadOptions = {
				preload: {
					assets: ['cssom'],
					timeout: 0.1
				}
			};
			audit.run(
				{ include: [axe.utils.getFlattenedTree(fixture)[0]] },
				{
					preload: preloadOptions
				},
				function(results) {
					assert.isDefined(results);
					// assert that both rules ran, although preload failed
					assert.lengthOf(results, 2);

					// assert that because preload failed
					// cssom was not populated on context of repective check
					assert.isTrue(preloadNeededCheckInvoked);
					var ruleResult = results.filter(function(r) {
						return (r.id = 'yes-preload' && r.nodes.length > 0);
					})[0];
					var checkResult = ruleResult.nodes[0].any[0];
					assert.isDefined(checkResult.data);
					assert.notProperty(checkResult.data, ['cssom']);
					// done
					done();
				},
				noop
			);
		});

		it('should assign an empty array to axe._selectCache', function(done) {
			var saved = axe.utils.ruleShouldRun;
			axe.utils.ruleShouldRun = function() {
				assert.equal(axe._selectCache.length, 0);
				return false;
			};
			a.run(
				{ include: [document] },
				{},
				function() {
					axe.utils.ruleShouldRun = saved;
					done();
				},
				isNotCalled
			);
		});

		it('should clear axe._selectCache', function(done) {
			a.run(
				{ include: [document] },
				{
					rules: {}
				},
				function() {
					assert.isTrue(typeof axe._selectCache === 'undefined');
					done();
				},
				isNotCalled
			);
		});

		it('should not run rules disabled by the configuration', function(done) {
			var a = new Audit();
			var success = true;
			a.rules.push(
				new Rule({
					id: 'positive1',
					selector: '*',
					enabled: false,
					any: [
						{
							id: 'positive1-check1',
							evaluate: function() {
								success = false;
							}
						}
					]
				})
			);
			a.run(
				{ include: [document] },
				{},
				function() {
					assert.ok(success);
					done();
				},
				isNotCalled
			);
		});

		it("should call the rule's run function", function(done) {
			var targetRule = mockRules[mockRules.length - 1],
				rule = axe.utils.findBy(a.rules, 'id', targetRule.id),
				called = false,
				orig;

			fixture.innerHTML = '<a href="#">link</a>';
			orig = rule.run;
			rule.run = function(node, options, callback) {
				called = true;
				callback({});
			};
			a.run(
				{ include: [document] },
				{},
				function() {
					assert.isTrue(called);
					rule.run = orig;
					done();
				},
				isNotCalled
			);
		});

		it('should pass the option to the run function', function(done) {
			var targetRule = mockRules[mockRules.length - 1],
				rule = axe.utils.findBy(a.rules, 'id', targetRule.id),
				passed = false,
				orig,
				options;

			fixture.innerHTML = '<a href="#">link</a>';
			orig = rule.run;
			rule.run = function(node, o, callback) {
				assert.deepEqual(o, options);
				passed = true;
				callback({});
			};
			options = { rules: {} };
			(options.rules[targetRule.id] = {}).data = 'monkeys';
			a.run(
				{ include: [document] },
				options,
				function() {
					assert.ok(passed);
					rule.run = orig;
					done();
				},
				isNotCalled
			);
		});

		it('should skip pageLevel rules if context is not set to entire page', function() {
			var audit = new Audit();

			audit.rules.push(
				new Rule({
					pageLevel: true,
					enabled: true,
					evaluate: function() {
						assert.ok(false, 'Should not run');
					}
				})
			);

			audit.run(
				{ include: [document.body], page: false },
				{},
				function(results) {
					assert.deepEqual(results, []);
				},
				isNotCalled
			);
		});

		it('catches errors and passes them as a cantTell result', function(done) {
			var err = new Error('Launch the super sheep!');
			a.addRule({
				id: 'throw1',
				selector: '*',
				any: [
					{
						id: 'throw1-check1'
					}
				]
			});
			a.addCheck({
				id: 'throw1-check1',
				evaluate: function() {
					throw err;
				}
			});

			a.run(
				{ include: [axe.utils.getFlattenedTree(fixture)[0]] },
				{
					runOnly: {
						type: 'rule',
						values: ['throw1']
					}
				},
				function(results) {
					assert.lengthOf(results, 1);
					assert.equal(results[0].result, 'cantTell');
					assert.equal(results[0].message, err.message);
					assert.equal(results[0].stack, err.stack);
					assert.equal(results[0].error, err);
					done();
				},
				isNotCalled
			);
		});

		it('should not halt if errors occur', function(done) {
			a.addRule({
				id: 'throw1',
				selector: '*',
				any: [
					{
						id: 'throw1-check1'
					}
				]
			});
			a.addCheck({
				id: 'throw1-check1',
				evaluate: function() {
					throw new Error('Launch the super sheep!');
				}
			});
			a.run(
				{ include: [axe.utils.getFlattenedTree(fixture)[0]] },
				{
					runOnly: {
						type: 'rule',
						values: ['throw1', 'positive1']
					}
				},
				function() {
					done();
				},
				isNotCalled
			);
		});

		it('should run audit.normalizeOptions to ensure valid input', function() {
			fixture.innerHTML =
				'<input type="text" aria-label="monkeys">' +
				'<div id="monkeys">bananas</div>' +
				'<input aria-labelledby="monkeys" type="text">' +
				'<blink>FAIL ME</blink>';
			var checked = 'options not validated';

			a.normalizeOptions = function() {
				checked = 'options validated';
			};

			a.run({ include: [fixture] }, {}, noop, isNotCalled);
			assert.equal(checked, 'options validated');
		});

		it('should halt if an error occurs when debug is set', function(done) {
			a.addRule({
				id: 'throw1',
				selector: '*',
				any: [
					{
						id: 'throw1-check1'
					}
				]
			});
			a.addCheck({
				id: 'throw1-check1',
				evaluate: function() {
					throw new Error('Launch the super sheep!');
				}
			});
			a.run(
				{ include: [axe.utils.getFlattenedTree(fixture)[0]] },
				{
					debug: true,
					runOnly: {
						type: 'rule',
						values: ['throw1']
					}
				},
				noop,
				function(err) {
					assert.equal(err.message, 'Launch the super sheep!');
					done();
				}
			);
		});
	});

	describe('Audit#after', function() {
		it('should run Rule#after on any rule whose result is passed in', function() {
			/*eslint no-unused-vars:0*/
			var audit = new Audit();
			var success = false;
			var options = [{ id: 'hehe', enabled: true, monkeys: 'bananas' }];
			var results = [
				{
					id: 'hehe',
					monkeys: 'bananas'
				}
			];
			audit.rules.push(
				new Rule({
					id: 'hehe',
					pageLevel: false,
					enabled: false
				})
			);

			audit.rules[0].after = function(res, opts) {
				assert.equal(res, results[0]);
				assert.deepEqual(opts, options);
				success = true;
			};

			audit.after(results, options);
		});
	});

	describe('Audit#normalizeOptions', function() {
		it('returns the options object when it is valid', function() {
			var opt = {
				runOnly: {
					type: 'rule',
					values: ['positive1', 'positive2']
				},
				rules: {
					negative1: { enabled: false }
				}
			};
			assert(a.normalizeOptions(opt), opt);
		});

		it('allows `value` as alternative to `values`', function() {
			var opt = {
				runOnly: {
					type: 'rule',
					value: ['positive1', 'positive2']
				}
			};
			var out = a.normalizeOptions(opt);
			assert.deepEqual(out.runOnly.values, ['positive1', 'positive2']);
			assert.isUndefined(out.runOnly.value);
		});

		it('allows type: rules as an alternative to type: rule', function() {
			var opt = {
				runOnly: {
					type: 'rules',
					values: ['positive1', 'positive2']
				}
			};
			assert(a.normalizeOptions(opt).runOnly.type, 'rule');
		});

		it('allows type: tags as an alternative to type: tag', function() {
			var opt = {
				runOnly: {
					type: 'tags',
					values: ['positive']
				}
			};
			assert(a.normalizeOptions(opt).runOnly.type, 'tag');
		});

		it('allows type: undefined as an alternative to type: tag', function() {
			var opt = {
				runOnly: {
					values: ['positive']
				}
			};
			assert(a.normalizeOptions(opt).runOnly.type, 'tag');
		});

		it('allows runOnly as an array as an alternative to type: tag', function() {
			var opt = { runOnly: ['positive', 'negative'] };
			var out = a.normalizeOptions(opt);
			assert(out.runOnly.type, 'tag');
			assert.deepEqual(out.runOnly.values, ['positive', 'negative']);
		});

		it('throws an error runOnly.values not an array', function() {
			assert.throws(function() {
				a.normalizeOptions({
					runOnly: {
						type: 'rule',
						values: { badProp: 'badValue' }
					}
				});
			});
		});

		it('throws an error runOnly.values an empty', function() {
			assert.throws(function() {
				a.normalizeOptions({
					runOnly: {
						type: 'rule',
						values: []
					}
				});
			});
		});

		it('throws an error runOnly.type is unknown', function() {
			assert.throws(function() {
				a.normalizeOptions({
					runOnly: {
						type: 'something-else',
						values: ['wcag2aa']
					}
				});
			});
		});

		it('throws an error when option.runOnly has an unknown rule', function() {
			assert.throws(function() {
				a.normalizeOptions({
					runOnly: {
						type: 'rule',
						values: ['frakeRule']
					}
				});
			});
		});

		it('throws an error when option.runOnly has an unknown tag', function() {
			assert.throws(function() {
				a.normalizeOptions({
					runOnly: {
						type: 'tags',
						values: ['fakeTag']
					}
				});
			});
		});

		it('throws an error when option.rules has an unknown rule', function() {
			assert.throws(function() {
				a.normalizeOptions({
					rules: {
						fakeRule: { enabled: false }
					}
				});
			});
		});
	});
});
