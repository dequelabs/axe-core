/*global Rule, Check, RuleFrameResult */
describe('Rule', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should be a function', function () {
		assert.isFunction(Rule);
	});

	it('should accept one parameter', function () {
		assert.lengthOf(Rule, 1);
	});

	describe('prototype', function () {
		describe('gather', function () {
			it('should gather nodes which match the selector', function () {
				var node = document.createElement('div');
				node.id = 'monkeys';
				fixture.appendChild(node);

				var rule = new Rule({ selector: '#monkeys' }),
					nodes = rule.gather({ include: [fixture], exclude: [], frames: [] });

				assert.lengthOf(nodes, 1);
				assert.equal(nodes[0], node);

				node.id = 'bananas';
				nodes = rule.gather({ include: [fixture], exclude: [], frames: [] });

				assert.lengthOf(nodes, 0);
			});

			it('should return a real array', function () {
				var rule = new Rule({selector: 'div'}),
					result = rule.gather({ include: [fixture], exclude: [], frames: [] });

				assert.isArray(result);
			});

			it('should take a context parameter', function () {
				var node = document.createElement('div');
				fixture.appendChild(node);

				var rule = new Rule({ selector: 'div' }),
					nodes = rule.gather({ include: [document.getElementById('fixture')] });

				assert.deepEqual(nodes, [node]);
			});

			it('should default to all nodes if selector is not specified', function () {
				var nodes = [],
					node = document.createElement('div');

				fixture.appendChild(node);
				nodes.push(node);

				node = document.createElement('div');

				fixture.appendChild(node);
				nodes.push(node);

				var rule = new Rule({}),
					result = rule.gather({ include: [document.getElementById('fixture')] });

				assert.lengthOf(result, 2);
				assert.sameMembers(result, nodes);
			});
		});
		describe('run', function () {
			it('should be a function', function () {
				assert.isFunction(Rule.prototype.run);
			});

			it('should run #gather', function (done) {
				var success = false,
					rule = new Rule({
						gather: function (context) {
							assert.deepEqual(context, { include: [fixture] });
							success = true;
							return [];
						}
					});

				rule.run({ include: [fixture] }, {}, function () {
					assert.isTrue(success);
					done();
				});

			});

			it('should execute Check#runEvaluate on its child checks', function (done) {
				fixture.innerHTML = '<blink>Hi</blink>';
				var orig = Check.prototype.runEvaluate;
				var success = false;
				Check.prototype.runEvaluate = function (_, __, cb) {
					success = true;
					cb(true);
				};

				var rule = new Rule({ checks: [{ id: 'cats', evaluate: function () {} }]});

				rule.run({ include: [fixture] }, {}, function () {
					assert.isTrue(success);
					Check.prototype.runEvaluate = orig;
					done();
				});

			});

			it('should NOT execute Check#run on checks that are disabled', function (done) {
				fixture.innerHTML = '<blink>Hi</blink>';
				var orig = Check.prototype.runEvaluate;
				var success = true;
				var ran = 0;
				Check.prototype.runEvaluate = function (_, __, cb) {
					ran++;
					if (this.id === 'dogs') {
						success = false;
					}
					cb(true);
				};

				var rule = new Rule({ checks: [{ id: 'cats' }, { id: 'dogs' }]});
				rule.run({ include: [fixture] }, {checks: [{ id: 'dogs', enabled: false }]}, function () {

					assert.isTrue(success);
					assert.equal(ran, 1);
					Check.prototype.runEvaluate = orig;
					done();
				});

			});

			it('should pass the matching option to runEvaluate', function (done) {
				fixture.innerHTML = '<blink>Hi</blink>';
				var orig = Check.prototype.runEvaluate,
					option = {id: 'cats', data: 'minkeys'};

				Check.prototype.runEvaluate = function (node, options, cb) {
					assert.deepEqual(options, option);
					cb(true);
				};

				var rule = new Rule({ checks: [{ id: 'cats' }]});
				rule.run({ include: [document] }, {
					checks: [option]
				}, function () {
					Check.prototype.runEvaluate = orig;
					done();
				});
			});
			it('should not throw if the options object is undefined', function () {
				var rule = new Rule({ checks: [{ id: 'cats', evaluate: function () {} }]});
				assert.doesNotThrow(function () {
					rule.run({ include: [document] }, undefined, function () {
					});
				});
			});

			describe('NODE rule', function () {
				it('should create a RuleResult', function () {
					var orig = window.RuleResult;
					var success = false;
					window.RuleResult = function (r) {
						this.details = [];
						assert.equal(rule, r);
						success = true;
					};

					var rule = new Rule({ checks: [{ evaluate: function () {}, id: 'cats' }]});
					rule.run({ include: document }, {}, function () {});
					assert.isTrue(success);


					window.RuleResult = orig;
				});
				it('should execute rule callback', function () {
					var success = false;

					var rule = new Rule({ checks: [{ evaluate: function () {}, id: 'cats' }]});
					rule.run({ include: document }, {}, function () {
						success = true;
					});
					assert.isTrue(success);
				});
			});

			describe('PAGE rule', function () {
				it('should create a RuleFrameResult', function () {
					var orig = window.RuleFrameResult;
					var success = false;
					window.RuleFrameResult = function (r) {
						this.details = [];
						assert.equal(rule, r);
						success = true;
					};

					var rule = new Rule({ checks: [{ evaluate: function () {}, id: 'cats'}], type: 'PAGE' });
					rule.run({ include: document }, {}, function () {});
					assert.isTrue(success);
					window.RuleFrameResult = orig;
				});
				it('should execute rule callback', function () {
					var success = false;

					var rule = new Rule({ checks: [{ evaluate: function () {}, id: 'cats'}], type: 'PAGE'});
					rule.run({ include: document }, {}, function () {
						success = true;
					});
					assert.isTrue(success);
				});
			});
		});
		describe('after', function () {
			var rfr, rule, data, afterResult = false;
			beforeEach(function () {
				rule = new Rule({
					checks: [{
						after: function (ruleData) {
							data = ruleData;
							return afterResult;
						},
						id: 'cats'
					}],
					type: 'PAGE',
					id: 'tests'
				});
				rfr = new RuleFrameResult(rule);
			});
			afterEach(function () {
				data = undefined;
			});
			it('should pass the check data to the check\'s after function', function (done) {
				rfr.addResults(document.documentElement, [{id: 'cats', data: 'dogs'}]);
				rule.after(document.documentElement, {}, rfr, function () {
					assert.deepEqual(data, ['dogs']);
					done();
				});
			});
			it('should return a new RuleResult object', function (done) {
				rfr.addResults(document.documentElement, [{id: 'cats', data: 'dogs'}]);
				rule.after(document.documentElement, {}, rfr, function (rr) {
					assert.ok(rr);
					assert.ok(rfr !== rr);
					done();
				});
			});
			it('should RuleResult must be a PASS if the after function returns true', function (done) {
				afterResult = true;
				rfr.addResults(document.documentElement, [{id: 'cats', data: 'dogs'}]);
				rule.after(document.documentElement, {}, rfr, function (rr) {
					assert.equal(rr.result, 'PASS');
					done();
				});
			});
			it('should RuleResult must be a FAIL if the after function returns false', function (done) {
				afterResult = false;
				rfr.addResults(document.documentElement, [{id: 'cats', data: 'dogs'}]);
				rule.after(document.documentElement, {}, rfr, function (rr) {
					assert.equal(rr.result, 'FAIL');
					done();
				});
			});
			it('should not throw if the options object is undefined', function () {
				afterResult = false;
				rfr.addResults(document.documentElement, [{id: 'cats', data: 'dogs'}]);
				assert.doesNotThrow(function () {
					rule.after(document.documentElement, undefined, rfr, function () {
					});
				});
			});
			it('should pass the matching option to runAfter', function () {
				var orig = Check.prototype.runAfter,
					option = {id: 'cats', data: 'minkeys'};

				Check.prototype.runAfter = function (data, options) {
					assert.deepEqual(options, option);
					Check.prototype.runAfter = orig;
				};

				afterResult = true;
				rfr.addResults(document.documentElement, [{id: 'cats', data: 'dogs'}]);
				rule.after(document.documentElement, { checks: [option] }, rfr, function (rr) {
					assert.equal(rr.result, 'PASS');
				});
			});
		});
	});

	describe('spec object', function () {

		describe('.selector', function () {
			it('should be set', function () {
				var spec = {
					selector: '#monkeys'
				};
				assert.equal(new Rule(spec).selector, spec.selector);
			});

			it('should default to *', function () {
				var spec = {};
				assert.equal(new Rule(spec).selector, '*');

			});

		});

		describe('.enabled', function () {
			it('should be set', function () {
				var spec = {
					enabled: false
				};
				assert.equal(new Rule(spec).enabled, spec.enabled);
			});

			it('should default to true', function () {
				var spec = {};
				assert.isTrue(new Rule(spec).enabled);

			});

			it('should default to true if given a bad value', function () {
				var spec = { enabled: 'monkeys' };
				assert.isTrue(new Rule(spec).enabled);

			});

		});

		describe('.pageLevel', function () {
			it('should be set', function () {
				var spec = {
					pageLevel: false
				};
				assert.equal(new Rule(spec).pageLevel, spec.pageLevel);
			});

			it('should default to false', function () {
				var spec = {};
				assert.isFalse(new Rule(spec).pageLevel);

			});

			it('should default to false if given a bad value', function () {
				var spec = { pageLevel: 'monkeys' };
				assert.isFalse(new Rule(spec).pageLevel);

			});

		});

		describe('.id', function () {
			it('should be set', function () {
				var spec = {
					id: 'monkeys'
				};
				assert.equal(new Rule(spec).id, spec.id);
			});

			it('should have no default', function () {
				var spec = {};
				assert.equal(new Rule(spec).id, spec.id);

			});

		});

		describe('.checks', function () {
			it('should be set', function () {
				var spec = {
					checks: [{ name: 'monkeys'}, { name: 'bananas'}, { name: 'pajamas' }]
				};
				assert.property(new Rule(spec), 'checks');
			});

			it('should contain instances of Check', function () {
				var spec = {
					checks: [{ name: 'monkeys'}, { name: 'bananas'}, { name: 'pajamas' }]
				};
				var rule = new Rule(spec);

				for (var i = 0, l = spec.checks.length; i < l; i++) {

					assert.instanceOf(rule.checks[i], Check);
					assert.deepEqual(rule.checks[i], new Check(spec.checks[i]));
				}

			});
		});
		describe('.gather', function () {
			it('should be set', function () {
				var spec = {
					gather: function () {}
				};
				assert.equal(new Rule(spec).gather, spec.gather);
			});

			it('should default to prototype', function () {
				var spec = {};
				assert.equal(new Rule(spec).gather, Rule.prototype.gather);
			});
		});
		describe('.type', function () {
			it('should be set to "NODE" by default', function () {
				var spec = {};
				assert.equal(new Rule(spec).type, 'NODE');
			});

			it('should be overridden if passed in', function () {
				var spec = {
					type : 'PAGE'
				};
				assert.equal(new Rule(spec).type, spec.type);
			});
		});


	});

});