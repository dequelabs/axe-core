/*global Rule, Check */
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
			it('should exclude hidden elements', function () {
				fixture.innerHTML = '<div style="display: none"><span>HEHEHE</span></div>';

				var rule = new Rule({}),
					result = rule.gather({ include: [document.getElementById('fixture')] });

				assert.lengthOf(result, 0);
			});
		});
		describe('run', function () {
			it('should be a function', function () {
				assert.isFunction(Rule.prototype.run);
			});

			it('should run #matches', function (done) {
				var div = document.createElement('div');
				fixture.appendChild(div);
				var success = false,
					rule = new Rule({
						matches: function (node) {
							assert.equal(node, div);
							success = true;
							return [];
						}
					});

				rule.run({ include: [fixture] }, {}, function () {
					assert.isTrue(success);
					done();
				});

			});

			it('should execute Check#run on its child checks', function (done) {
				fixture.innerHTML = '<blink>Hi</blink>';
				var orig = Check.prototype.run;
				var success = false;
				Check.prototype.run = function (_, __, cb) {
					success = true;
					cb(true);
				};

				var rule = new Rule({ checks: [{ id: 'cats', evaluate: function () {} }]});

				rule.run({ include: [fixture] }, {}, function () {
					assert.isTrue(success);
					Check.prototype.run = orig;
					done();
				});

			});

			it('should pass the matching option to run', function (done) {
				fixture.innerHTML = '<blink>Hi</blink>';
				var orig = Check.prototype.run,
					option = {id: 'cats', data: 'minkeys'};

				Check.prototype.run = function (node, options, cb) {
					assert.deepEqual(options, option);
					cb(true);
				};

				var rule = new Rule({ checks: [{ id: 'cats' }]});
				rule.run({ include: [document] }, {
					checks: [option]
				}, function () {
					Check.prototype.run = orig;
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

		describe('.excludeHidden', function () {
			it('should be set', function () {
				var spec = {
					excludeHidden: false
				};
				assert.equal(new Rule(spec).excludeHidden, spec.excludeHidden);
			});

			it('should default to true', function () {
				var spec = {};
				assert.isTrue(new Rule(spec).excludeHidden);

			});

			it('should default to true if given a bad value', function () {
				var spec = { excludeHidden: 'monkeys' };
				assert.isTrue(new Rule(spec).excludeHidden);

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
		describe('.matches', function () {
			it('should be set', function () {
				var spec = {
					matches: function () {}
				};
				assert.equal(new Rule(spec).matches, spec.matches);
			});

			it('should default to prototype', function () {
				var spec = {};
				assert.equal(new Rule(spec).matches, Rule.prototype.matches);
			});
		});


	});

});