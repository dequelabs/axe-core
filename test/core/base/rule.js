/*global Rule */
describe('Rule', function() {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function() {
		fixture.innerHTML = '';
	});

	it('should be a function', function() {
		assert.isFunction(Rule);
	});

	it('should accept two parameters', function() {
		assert.lengthOf(Rule, 2);
	});

	describe('prototype', function() {
		describe('gather', function() {
			it('should gather nodes which match the selector', function() {
				var node = document.createElement('div');
				node.id = 'monkeys';
				fixture.appendChild(node);

				var rule = new Rule({
						selector: '#monkeys'
					}),
					nodes = rule.gather({
						include: [fixture],
						exclude: [],
						frames: []
					});

				assert.lengthOf(nodes, 1);
				assert.equal(nodes[0], node);

				node.id = 'bananas';
				nodes = rule.gather({
					include: [fixture],
					exclude: [],
					frames: []
				});

				assert.lengthOf(nodes, 0);
			});

			it('should return a real array', function() {
				var rule = new Rule({
						selector: 'div'
					}),
					result = rule.gather({
						include: [fixture],
						exclude: [],
						frames: []
					});

				assert.isArray(result);
			});

			it('should take a context parameter', function() {
				var node = document.createElement('div');
				fixture.appendChild(node);

				var rule = new Rule({
						selector: 'div'
					}),
					nodes = rule.gather({
						include: [document.getElementById('fixture')]
					});

				assert.deepEqual(nodes, [node]);
			});

			it('should default to all nodes if selector is not specified', function() {
				var nodes = [],
					node = document.createElement('div');

				fixture.appendChild(node);
				nodes.push(node);

				node = document.createElement('div');

				fixture.appendChild(node);
				nodes.push(node);

				var rule = new Rule({}),
					result = rule.gather({
						include: [document.getElementById('fixture')]
					});

				assert.lengthOf(result, 2);
				assert.sameMembers(result, nodes);
			});
			it('should exclude hidden elements', function() {
				fixture.innerHTML = '<div style="display: none"><span>HEHEHE</span></div>';

				var rule = new Rule({}),
					result = rule.gather({
						include: [document.getElementById('fixture')]
					});

				assert.lengthOf(result, 0);
			});
			it('should include hidden elements if excludeHidden is false', function() {
				fixture.innerHTML = '<div style="display: none"></div>';

				var rule = new Rule({
						excludeHidden: false
					}),
					result = rule.gather({
						include: [document.getElementById('fixture')]
					});

				assert.deepEqual(result, [fixture.firstChild]);
			});
		});
		describe('run', function() {
			it('should be a function', function() {
				assert.isFunction(Rule.prototype.run);
			});

			it('should run #matches', function(done) {
				var div = document.createElement('div');
				fixture.appendChild(div);
				var success = false,
					rule = new Rule({
						matches: function(node) {
							assert.equal(node, div);
							success = true;
							return [];
						}
					});

				rule.run({
					include: [fixture]
				}, {}, function() {
					assert.isTrue(success);
					done();
				});

			});

			it('should execute Check#run on its child checks - any', function(done) {
				fixture.innerHTML = '<blink>Hi</blink>';
				var success = false;
				var rule = new Rule({
					any: ['cats']
				}, {
					checks: {
						cats: {
							run: function (node, options, cb) {
								success = true;
								cb(true);
							}
						}
					}
				});

				rule.run({
					include: [fixture]
				}, {}, function() {
					assert.isTrue(success);
					done();
				});

			});

			it('should execute Check#run on its child checks - all', function(done) {
				fixture.innerHTML = '<blink>Hi</blink>';
				var success = false;
				var rule = new Rule({
					all: ['cats']
				}, {
					checks: {
						cats: {
							run: function (node, options, cb) {
								success = true;
								cb(true);
							}
						}
					}
				});

				rule.run({
					include: [fixture]
				}, {}, function() {
					assert.isTrue(success);
					done();
				});

			});

			it('should execute Check#run on its child checks - none', function(done) {
				fixture.innerHTML = '<blink>Hi</blink>';
				var success = false;
				var rule = new Rule({
					none: ['cats']
				}, {
					checks: {
						cats: {
							run: function (node, options, cb) {
								success = true;
								cb(true);
							}
						}
					}
				});

				rule.run({
					include: [fixture]
				}, {}, function() {
					assert.isTrue(success);
					done();
				});

			});

			it('should pass the matching option to run', function(done) {
				fixture.innerHTML = '<blink>Hi</blink>';
				var options = {
					checks: {
						cats: {
							enabled: 'bananas',
							options: 'minkeys'
						}
					}
				};
				var rule = new Rule({
					none: ['cats']
				}, {
					checks: {
						cats: {
							id: 'cats',
							run: function (node, options, cb) {
								assert.equal(options.enabled, 'bananas');
								assert.equal(options.options, 'minkeys');
								cb(true);
							}
						}
					}
				});
				rule.run({
					include: [document]
				}, options, function() {
					done();
				});
			});

			it('should pass the matching option to run defined on the rule over global', function(done) {
				fixture.innerHTML = '<blink>Hi</blink>';
				var options = {
					rules: {
						cats: {
							checks: {
								cats: {
									enabled: 'apples',
									options: 'apes'
								}
							}
						}
					},
					checks: {
						cats: {
							enabled: 'bananas',
							options: 'minkeys'
						}
					}
				};

				var rule = new Rule({
					id: 'cats',
					any: [{
						id: 'cats'
					}]
				}, {
					checks: {
						cats: {
							id: 'cats',
							run: function (node, options, cb) {
								assert.equal(options.enabled, 'apples');
								assert.equal(options.options, 'apes');
								cb(true);
							}
						}
					}
				});
				rule.run({
					include: [document]
				}, options, function() {
					done();
				});
			});

			it('should filter out null results', function() {
				var rule = new Rule({
					selector: '#fixture',
					any: ['cats']
				}, {
					checks: {
						cats: {
							id: 'cats',
							run: function() {}
						}
					}
				});
				rule.run({
					include: [document]
				}, {}, function(r) {
					assert.lengthOf(r.nodes, 0);
				});

			});

			describe('NODE rule', function() {
				it('should create a RuleResult', function() {
					var orig = window.RuleResult;
					var success = false;
					window.RuleResult = function(r) {
						this.nodes = [];
						assert.equal(rule, r);
						success = true;
					};

					var rule = new Rule({
						any: [{
							evaluate: function() {},
							id: 'cats'
						}]
					});
					rule.run({
						include: document
					}, {}, function() {});
					assert.isTrue(success);


					window.RuleResult = orig;
				});
				it('should execute rule callback', function() {
					var success = false;

					var rule = new Rule({
						any: [{
							evaluate: function() {},
							id: 'cats'
						}]
					});
					rule.run({
						include: document
					}, {}, function() {
						success = true;
					});
					assert.isTrue(success);
				});
			});
		});

		describe('after', function() {
			it('should execute Check#after with options', function() {
				var success = false;

				var rule = new Rule({
					id: 'cats',
					any: ['cats']
				}, {
					checks: {
						cats: {
							id: 'cats',
							enabled: true,
							after: function(results, options) {
								assert.deepEqual(options, { enabled: true, options: { dogs: true }});
								success = true;
								return results;
							}
						}
					}
				});

				rule.after({
					id: 'cats',
					nodes: [{
						all: [],
						none: [],
						any: [{
							id: 'cats',
							result: true
						}]
					}]
				}, { checks: { cats: { options: { dogs: true } }} });

				assert.isTrue(success);

			});

			it('should filter removed checks', function () {

				var rule = new Rule({
					id: 'cats',
					any: ['cats']
				}, {
					checks: {
						cats: {
							id: 'cats',
							after: function(results) {
								return [results[0]];
							}
						}
					}
				});

				var result = rule.after({
					id: 'cats',
					nodes: [{
						any: [],
						none: [],
						all: [{
							id: 'cats',
							result: true
						}]
					}, {
						any: [],
						none: [],
						all: [{
							id: 'cats',
							result: false
						}]
					}]
				}, { checks: { cats: { options: { dogs: true } }} });

				assert.lengthOf(result.nodes, 1);
				assert.equal(result.nodes[0].all[0].id, 'cats');
				assert.isTrue(result.nodes[0].all[0].result);

			});

			it('should combine all checks for pageLevel rules', function () {

				var rule = new Rule({});

				var result = rule.after({
					id: 'cats',
					pageLevel: true,
					nodes: [{
						any: [],
						none: [],
						all: [{
							id: 'cats',
							result: false
						}]
					}, {
						any: [],
						none: [{
							id: 'dogs',
							result: false
						}],
						all: []
					}, {
						any: [{
							id: 'monkeys',
							result: false
						}],
						none: [],
						all: []
					}]
				}, { checks: { cats: { options: { dogs: true } }} });

				assert.lengthOf(result.nodes, 1);

			});
		});
	});

	describe('spec object', function() {

		describe('.selector', function() {
			it('should be set', function() {
				var spec = {
					selector: '#monkeys'
				};
				assert.equal(new Rule(spec).selector, spec.selector);
			});

			it('should default to *', function() {
				var spec = {};
				assert.equal(new Rule(spec).selector, '*');

			});

		});

		describe('.enabled', function() {
			it('should be set', function() {
				var spec = {
					enabled: false
				};
				assert.equal(new Rule(spec).enabled, spec.enabled);
			});

			it('should default to true', function() {
				var spec = {};
				assert.isTrue(new Rule(spec).enabled);

			});

			it('should default to true if given a bad value', function() {
				var spec = {
					enabled: 'monkeys'
				};
				assert.isTrue(new Rule(spec).enabled);

			});

		});

		describe('.excludeHidden', function() {
			it('should be set', function() {
				var spec = {
					excludeHidden: false
				};
				assert.equal(new Rule(spec).excludeHidden, spec.excludeHidden);
			});

			it('should default to true', function() {
				var spec = {};
				assert.isTrue(new Rule(spec).excludeHidden);

			});

			it('should default to true if given a bad value', function() {
				var spec = {
					excludeHidden: 'monkeys'
				};
				assert.isTrue(new Rule(spec).excludeHidden);

			});

		});

		describe('.pageLevel', function() {
			it('should be set', function() {
				var spec = {
					pageLevel: false
				};
				assert.equal(new Rule(spec).pageLevel, spec.pageLevel);
			});

			it('should default to false', function() {
				var spec = {};
				assert.isFalse(new Rule(spec).pageLevel);

			});

			it('should default to false if given a bad value', function() {
				var spec = {
					pageLevel: 'monkeys'
				};
				assert.isFalse(new Rule(spec).pageLevel);

			});

		});

		describe('.id', function() {
			it('should be set', function() {
				var spec = {
					id: 'monkeys'
				};
				assert.equal(new Rule(spec).id, spec.id);
			});

			it('should have no default', function() {
				var spec = {};
				assert.equal(new Rule(spec).id, spec.id);

			});

		});

		describe('.any', function() {
			it('should be set', function() {
				var spec = {
					any: [{
						name: 'monkeys'
					}, {
						name: 'bananas'
					}, {
						name: 'pajamas'
					}]
				};
				assert.property(new Rule(spec), 'any');
			});

		});


		describe('.all', function() {
			it('should be set', function() {
				var spec = {
					all: [{
						name: 'monkeys'
					}, {
						name: 'bananas'
					}, {
						name: 'pajamas'
					}]
				};
				assert.property(new Rule(spec), 'all');
			});

		});


		describe('.none', function() {
			it('should be set', function() {
				var spec = {
					none: [{
						name: 'monkeys'
					}, {
						name: 'bananas'
					}, {
						name: 'pajamas'
					}]
				};
				assert.property(new Rule(spec), 'none');
			});

		});

		describe('.matches', function() {
			it('should be set', function() {
				var spec = {
					matches: function() {}
				};
				assert.equal(new Rule(spec).matches, spec.matches);
			});

			it('should default to prototype', function() {
				var spec = {};
				assert.equal(new Rule(spec).matches, Rule.prototype.matches);
			});
		});
		describe('.tags', function() {
			it('should be set', function() {
				var spec = {
					tags: ['foo', 'bar']
				};
				assert.deepEqual(new Rule(spec).tags, spec.tags);
			});

			it('should default to empty array', function() {
				var spec = {};
				assert.deepEqual(new Rule(spec).tags, []);
			});
		});


	});

});
