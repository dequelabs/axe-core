/*global Rule, Check */
describe('Rule', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var noop = function () {};
	var isNotCalled = function (err) {
		throw err || new Error('Reject should not be called');
	};

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
						include: [document.getElementById('fixture').firstChild]
					});

				assert.deepEqual(nodes, [node]);
			});

			it('should default to all nodes if selector is not specified', function() {
				var nodes = [fixture],
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

				assert.lengthOf(result, 3);
				assert.sameMembers(result, nodes);
			});
			it('should exclude hidden elements', function() {
				fixture.innerHTML = '<div style="display: none"><span>HEHEHE</span></div>';

				var rule = new Rule({}),
					result = rule.gather({
						include: [document.getElementById('fixture').firstChild]
					});

				assert.lengthOf(result, 0);
			});
			it('should include hidden elements if excludeHidden is false', function() {
				fixture.innerHTML = '<div style="display: none"></div>';

				var rule = new Rule({
						excludeHidden: false
					}),
					result = rule.gather({
						include: [document.getElementById('fixture').firstChild]
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
					include: [div]
				}, {}, function() {
					assert.isTrue(success);
					done();
				}, isNotCalled);

			});

			it('should handle an error in #matches', function(done) {
				var div = document.createElement('div');
				div.setAttribute('style', '#fff');
				fixture.appendChild(div);
				var success = false,
					rule = new Rule({
						matches: function() {
							throw new Error('this is an error');
						}
					});

				rule.run({
					include: [div]
				}, {}, isNotCalled, function() {
					assert.isFalse(success);
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
							run: function (node, options, resolve) {
								success = true;
								resolve(true);
							}
						}
					}
				});

				rule.run({
					include: [fixture]
				}, {}, function() {
					assert.isTrue(success);
					done();
				}, isNotCalled);

			});

			it('should execute Check#run on its child checks - all', function(done) {
				fixture.innerHTML = '<blink>Hi</blink>';
				var success = false;
				var rule = new Rule({
					all: ['cats']
				}, {
					checks: {
						cats: {
							run: function (node, options, resolve) {
								success = true;
								resolve(true);
							}
						}
					}
				});

				rule.run({
					include: [fixture]
				}, {}, function() {
					assert.isTrue(success);
					done();
				}, isNotCalled);

			});

			it('should execute Check#run on its child checks - none', function(done) {
				fixture.innerHTML = '<blink>Hi</blink>';
				var success = false;
				var rule = new Rule({
					none: ['cats']
				}, {
					checks: {
						cats: {
							run: function (node, options, resolve) {
								success = true;
								resolve(true);
							}
						}
					}
				}, isNotCalled);

				rule.run({
					include: [fixture]
				}, {}, function() {
					assert.isTrue(success);
					done();
				}, isNotCalled);

			});

			it('should pass the matching option to check.run', function(done) {
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
							run: function (node, options, resolve) {
								assert.equal(options.enabled, 'bananas');
								assert.equal(options.options, 'minkeys');
								resolve(true);
							}
						}
					}
				});
				rule.run({
					include: [document]
				}, options, function() {
					done();
				}, isNotCalled);
			});

			it('should pass the matching option to check.run defined on the rule over global', function(done) {
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
							run: function (node, options, resolve) {
								assert.equal(options.enabled, 'apples');
								assert.equal(options.options, 'apes');
								resolve(true);
							}
						}
					}
				});
				rule.run({
					include: [document]
				}, options, function() {
					done();
				}, isNotCalled);
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
				}, isNotCalled);
			});

			describe('DqElement', function() {
				var origDqElement;
				var isDqElementCalled;

				beforeEach(function() {
					isDqElementCalled = false;
					origDqElement = axe.utils.DqElement;
					axe.utils.DqElement = function() {
						isDqElementCalled = true;
					};
					fixture.innerHTML = '<blink>Hi</blink>';
				});

				afterEach(function() {
					axe.utils.DqElement = origDqElement;
				});

				it('is created for matching nodes', function(done) {
					var rule = new Rule({
						all: ['cats']
					}, {
						checks: {
							cats: new Check({
								id: 'cats',
								enabled: true,
								evaluate: function() {
									return true;
								},
								matches: function() {
									return true;
								}
							})
						}
					});
					rule.run({
						include: [fixture]
					}, {}, function() {
						assert.isTrue(isDqElementCalled);
						done();
					}, isNotCalled);
				});

				it('is not created for disabled checks', function(done) {
					var rule = new Rule({
						all: ['cats']
					}, {
						checks: {
							cats: new Check({
								id: 'cats',
								enabled: false,
								evaluate: function() {},
								matches: function() {
									return true;
								}
							})
						}
					});
					rule.run({
						include: [fixture]
					}, {}, function() {
						assert.isFalse(isDqElementCalled);
						done();
					}, isNotCalled);
				});

				it('is created for matching nodes', function(done) {
					var rule = new Rule({
						all: ['cats']
					}, {
						checks: {
							cats: new Check({
								id: 'cats',
								enabled: true,
								evaluate: function() {
									return true;
								}
							})
						}
					});
					rule.run({
						include: [fixture]
					}, {}, function() {
						assert.isTrue(isDqElementCalled);
						done();
					}, isNotCalled);
				});

				it('is not created for disabled checks', function(done) {
					var rule = new Rule({
						all: ['cats']
					}, {
						checks: {
							cats: new Check({
								id: 'cats',
								enabled: false,
								evaluate: function() {}
							})
						}
					});
					rule.run({
						include: [fixture]
					}, {}, function() {
						assert.isFalse(isDqElementCalled);
						done();
					}, isNotCalled);
				});
			});

			it('should pass thrown errors to the reject param', function (done) {
				fixture.innerHTML = '<blink>Hi</blink>';
				var rule = new Rule({
					none: ['cats']
				}, {
					checks: {
						cats: {
							run: function () {
								throw new Error('Holy hand grenade');
							}
						}
					}
				});

				rule.run({
					include: [fixture]
				}, {}, noop, function(err) {
					assert.equal(err.message, 'Holy hand grenade');
					done();
				}, isNotCalled);
			});

			it('should pass reject calls to the reject param', function (done) {
				fixture.innerHTML = '<blink>Hi</blink>';
				var rule = new Rule({
					none: ['cats']
				}, {
					checks: {
						cats: {
							run: function (nope, options, resolve, reject) {
								reject(new Error('your reality'));
							}
						}
					}
				});

				rule.run({
					include: [fixture]
				}, {}, noop, function(err) {
					assert.equal(err.message, 'your reality');
					done();
				}, isNotCalled);
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
					}, {}, noop, isNotCalled);
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
					}, isNotCalled);
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

			it('should turn a string into a function', function () {
				var spec = {
					matches: 'function() {return "blah";}'
				};
				assert.equal(new Rule(spec).matches(), 'blah');
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

	describe('configure', function () {
		beforeEach(function () {
			Rule.prototype._get = function (attr) {
				return this[attr];
			};
		});
		afterEach(function () {
			delete Rule.prototype._get;
		});
		it('should be a function that takes one argument', function() {
			assert.isFunction(Rule.prototype.configure);
			assert.lengthOf(new Rule({}).configure, 1);
		});
		it('should NOT override the id', function () {
			var rule = new Rule({id: 'foo'});

			assert.equal(rule._get('id'), 'foo');
			rule.configure({id: 'fong'});
			assert.equal(rule._get('id'), 'foo');
		});
		it('should NOT override a random property', function () {
			var rule = new Rule({id: 'foo'});

			rule.configure({fong: 'fong'});
			assert.equal(rule._get('fong'), undefined);
		});
		it('should override the selector', function () {
			var rule = new Rule({selector: 'foo'});

			assert.equal(rule._get('selector'), 'foo');
			rule.configure({selector: 'fong'});
			assert.equal(rule._get('selector'), 'fong');
		});
		it('should override excludeHidden', function () {
			var rule = new Rule({excludeHidden: false});

			assert.equal(rule._get('excludeHidden'), false);
			rule.configure({excludeHidden: true});
			assert.equal(rule._get('excludeHidden'), true);
		});
		it('should override enabled', function () {
			var rule = new Rule({enabled: false});

			assert.equal(rule._get('enabled'), false);
			rule.configure({enabled: true});
			assert.equal(rule._get('enabled'), true);
		});
		it('should override pageLevel', function () {
			var rule = new Rule({pageLevel: false});

			assert.equal(rule._get('pageLevel'), false);
			rule.configure({pageLevel: true});
			assert.equal(rule._get('pageLevel'), true);
		});
		it('should override any', function () {
			var rule = new Rule({any: ['one', 'two']});

			assert.deepEqual(rule._get('any'), ['one', 'two']);
			rule.configure({any: []});
			assert.deepEqual(rule._get('any'), []);
		});
		it('should override all', function () {
			var rule = new Rule({all: ['one', 'two']});

			assert.deepEqual(rule._get('all'), ['one', 'two']);
			rule.configure({all: []});
			assert.deepEqual(rule._get('all'), []);
		});
		it('should override none', function () {
			var rule = new Rule({none: ['none', 'two']});

			assert.deepEqual(rule._get('none'), ['none', 'two']);
			rule.configure({none: []});
			assert.deepEqual(rule._get('none'), []);
		});
		it('should override tags', function () {
			var rule = new Rule({tags: ['tags', 'two']});

			assert.deepEqual(rule._get('tags'), ['tags', 'two']);
			rule.configure({tags: []});
			assert.deepEqual(rule._get('tags'), []);
		});
		it('should override matches', function () {
			var rule = new Rule({matches: 'function () {return "matches";}'});

			assert.equal(rule._get('matches')(), 'matches');
			rule.configure({matches: 'function () {return "does not match";}'});
			assert.equal(rule._get('matches')(), 'does not match');
		});
	});

});
