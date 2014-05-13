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
					nodes = rule.gather();

				assert.lengthOf(nodes, 1);
				assert.equal(nodes[0], node);

				node.id = 'bananas';
				nodes = rule.gather();

				assert.lengthOf(nodes, 0);
			});

			it('should return a real array', function () {
				var rule = new Rule({selector: 'div'}),
					result = rule.gather();

				assert.isArray(result);
			});

			it('should take a context parameter', function () {
				var node = document.createElement('div');
				fixture.appendChild(node);

				var rule = new Rule({ selector: 'div' }),
					nodes = rule.gather(fixture);

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
					result = rule.gather(fixture);

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
							assert.equal(context, document);
							success = true;
							return [];
						}
					});

				rule.run(document, function () {
					assert.isTrue(success);
					done();
				});

			});

			it('should execute Check#run on its child checks', function () {
				var orig = Check.prototype.runEvaluate;
				var success = false;
				Check.prototype.runEvaluate = function () { success = true; };

				var rule = new Rule({ checks: [{ id: 'cats' }]});

				rule.run();
				assert.isTrue(success);
				Check.prototype.runEvaluate = orig;

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
					window.RuleResult.prototype.addResults = orig.prototype.addResults;

					var rule = new Rule({ checks: [{ evaluate: function () {}, id: 'cats' }]});
					rule.run(null, function () {});
					assert.isTrue(success);


					window.RuleResult = orig;
				});
				it('should execute rule callback', function () {
					var success = false;

					var rule = new Rule({ checks: [{ evaluate: function () {}, id: 'cats' }]});
					rule.run(null, function () {
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
					window.RuleFrameResult.prototype.addResults = orig.prototype.addResults;

					var rule = new Rule({ checks: [{ evaluate: function () {}, id: 'cats'}], type: 'PAGE' });
					rule.run(null, function () {});
					assert.isTrue(success);
					window.RuleFrameResult = orig;
				});
				it('should execute rule callback', function () {
					var success = false;

					var rule = new Rule({ checks: [{ evaluate: function () {}, id: 'cats'}], type: 'PAGE'});
					rule.run(null, function () {
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
				rule.after(document.documentElement, rfr, function () {
					assert.deepEqual(data, ['dogs']);
					done();
				});
			});
			it('should return a new RuleResult object', function (done) {
				rfr.addResults(document.documentElement, [{id: 'cats', data: 'dogs'}]);
				rule.after(document.documentElement, rfr, function (rr) {
					assert.ok(rr);
					assert.ok(rfr !== rr);
					done();
				});
			});
			it('should RuleResult must be a PASS if the after function returns true', function (done) {
				afterResult = true;
				rfr.addResults(document.documentElement, [{id: 'cats', data: 'dogs'}]);
				rule.after(document.documentElement, rfr, function (rr) {
					assert.equal(rr.result, 'PASS');
					done();
				});
			});
			it('should RuleResult must be a FAIL if the after function returns false', function (done) {
				afterResult = false;
				rfr.addResults(document.documentElement, [{id: 'cats', data: 'dogs'}]);
				rule.after(document.documentElement, rfr, function (rr) {
					assert.equal(rr.result, 'FAIL');
					done();
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