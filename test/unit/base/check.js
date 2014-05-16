/*global Check, CheckResult */
describe('Check', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should be a function', function () {
		assert.isFunction(Check);
	});

	describe('prototype', function () {
		describe('enabled', function () {
			it('should be true by default', function () {
				var check = new Check({});
				assert.isTrue(check.enabled);
			});
			it('should be set to whatever is passed in', function () {
				var check = new Check({enabled: false});
				assert.isFalse(check.enabled);
			});
		});
		describe('matches', function () {
			it('should be a function', function () {
				assert.isFunction(Check.prototype.matches);
			});

			it('should test its selector against a given node', function () {
				var node = document.createElement('div');
				node.id = 'monkeys';
				fixture.appendChild(node);

				var check = new Check({ selector: '#monkeys' });

				assert.isTrue(check.matches(node));

				node.id = 'bananas';
				assert.isFalse(check.matches(node));

			});

			it('should default to true if selector is not set', function () {
				var node = document.createElement('div');

				var check = new Check({});

				assert.isTrue(check.matches(node));

			});
		});

		describe('runEvaluate', function () {
			it('should accept 3 parameters', function () {
				assert.lengthOf(new Check({}).runEvaluate, 3);
			});

			it('should call matches', function (done) {
				var success = false;

				new Check({
					matches: function () {
						success = true;
						return true;
					},
					evaluate: function () {
						assert.isTrue(success);
						done();
					}
				}).runEvaluate(fixture, {}, function () {});

			});

			it('should pass the node through', function (done) {
				new Check({
					evaluate: function (node) {
						assert.equal(node, fixture);
						done();
					}
				}).runEvaluate(fixture, {}, function () {});

			});

			it('should pass the options through', function (done) {
				var expected = { monkeys: 'bananas' };

				new Check({
					options: expected,
					evaluate: function (node, options) {
						assert.deepEqual(options, expected);
						done();
					}
				}).runEvaluate(fixture, {}, function () {});

			});
			it('should pass the options through modified by the ones passed into the call', function (done) {
				var configured = { monkeys: 'bananas' },
					expected = { monkeys: 'bananas', dogs: 'cats' };

				new Check({
					options: configured,
					evaluate: function (node, options) {
						assert.deepEqual(options, expected);
						done();
					}
				}).runEvaluate(fixture, expected, function () {});

			});

			it('should bind context to `bindCheckResult`', function (done) {
				var orig = utils.checkHelper,
					cb = function () { return true; },
					result = { monkeys: 'bananas' };

				utils.checkHelper = function (checkResult, callback) {
					assert.instanceOf(checkResult, window.CheckResult);
					assert.equal(callback, cb);

					return result;
				};

				new Check({
					evaluate: function () {
						assert.deepEqual(result, this);
						utils.checkHelper = orig;
						done();
					}
				}).runEvaluate(fixture, {}, cb);

			});

			it('should allow for asynchronous checks', function (done) {

				var data = { monkeys: 'bananas' };
				new Check({
					evaluate: function () {
						this.async()(data);
					}
				}).runEvaluate(fixture, {}, function (d) {
					assert.instanceOf(d, CheckResult);
					assert.deepEqual(d.value, data);
					done();
				});

			});

			it('should pass `null` as the parameter if the node does not match', function (done) {

				new Check({
					selector: '#monkeys',
					evaluate: function () {}
				}).runEvaluate(fixture, {}, function (data) {
					assert.isNull(data);
					done();
				});

			});
			it('should pass `null` as the parameter if not enabled', function (done) {

				new Check({
					selector: '#monkeys',
					evaluate: function () {},
					enabled: false
				}).runEvaluate(fixture, {}, function (data) {
					assert.isNull(data);
					done();
				});

			});
			it('should pass `null` as the parameter if options disable', function (done) {

				new Check({
					selector: '#monkeys',
					evaluate: function () {}
				}).runEvaluate(fixture, {enabled: false}, function (data) {
					assert.isNull(data);
					done();
				});

			});

			it('should not throw, but add any raised error as `error` on the returned object', function (done) {
				assert.doesNotThrow(function () {
					var error = new Error('oh noes');

					new Check({
						evaluate: function () {
							throw error;
						}
					}).runEvaluate(fixture, {}, function (data) {
						assert.deepEqual(data.error, { message: error.message, stack: error.stack });
						done();
					});

				});

			});

			it('should not throw, but pass any raised error as the first parameter to callback - async', function () {
				assert.doesNotThrow(function () {
					var error = new Error('oh noes');

					new Check({
						evaluate: function () {
							this.async();
							throw error;
						}
					}).runEvaluate(fixture, {}, function (data) {
						assert.deepEqual(data.error, { message: error.message, stack: error.stack });
					});

				});

			});

			it('should return a result', function (done) {

				new Check({
					evaluate: function () {
						return true;
					}
				}).runEvaluate(fixture, {}, function (data) {
					assert.instanceOf(data, CheckResult);
					done();
				});

			});
		});
		describe('runAfter', function () {
			it('should call the "after" function', function (done) {
				new Check({
					after: function () {
						assert.ok(true);
						done();
					}
				}).runAfter([], {}, function () {});
			});
			it('should bind context to `bindCheckResult`', function (done) {
				var orig = utils.checkHelper,
					cb = function () { return true; },
					data = { monkeys: 'bananas' };

				utils.checkHelper = function (checkResult, callback) {
					assert.instanceOf(checkResult, window.CheckResult);
					assert.equal(callback, cb);
					return data;
				};
				new Check({
					after: function () {
						assert.deepEqual(data, this);
						utils.checkHelper = orig;
						done();
					}
				}).runAfter(data, {}, cb);
			});
			it('should set the value attribute of the check to true', function (done) {
				new Check({
					after: function () {
						return true;
					}
				}).runAfter([], {}, function (check) {
					assert.equal(check.value, true);
					done();
				});
			});
			it('should pass the options through', function (done) {
				var configured = { monkeys: 'bananas' },
					expected = configured;

				new Check({
					options: configured,
					after: function (data, options) {
						assert.deepEqual(options, expected);
						done();
					}
				}).runAfter(fixture, {}, function () {});
			});
			it('should pass the options through modified by the ones passed into the call', function (done) {
				var configured = { monkeys: 'bananas' },
					expected = { monkeys: 'bananas', dogs: 'cats' };

				new Check({
					options: configured,
					after: function (data, options) {
						assert.deepEqual(options, expected);
						done();
					}
				}).runAfter(fixture, expected, function () {});
			});
			it('should set the value attribute of the check to false', function (done) {
				new Check({
					after: function () {
						return false;
					}
				}).runAfter([], {}, function (check) {
					assert.equal(check.value, false);
					done();
				});

			});
			it('should set the error attribute if the after function throws', function (done) {
				assert.doesNotThrow(function () {
					var error = new Error('oh noes');
					new Check({
						after: function () {
							throw error;
						}
					}).runAfter([], {}, function (check) {
						assert.deepEqual(check.error, { message: error.message, stack: error.stack });
						done();
					});
				});
			});
		});
	});


	describe('spec object', function () {
		describe('.result', function () {
			it('should be set', function () {
				var spec = {
					result: 'bananas'
				};
				assert.equal(new Check(spec).result, spec.result);
			});

			it('should have no (defaults to rule\'s result)', function () {
				var spec = {};
				assert.equal(new Check(spec).result, dqre.constants.result.PASS);

			});
		});
		describe('.priority', function () {
			it('should be set', function () {
				var spec = {
					priority: 'bananas'
				};
				assert.equal(new Check(spec).priority, spec.priority);
			});

			it('should have no default (defaults to rule\'s priority)', function () {
				var spec = {};
				assert.equal(new Check(spec).priority, spec.priority);

			});

		});

		describe('.matches', function () {
			it('should be set', function () {
				var spec = {
					matches: function () {}
				};
				assert.equal(new Check(spec).matches, spec.matches);
			});

			it('should default to prototype', function () {
				var spec = {};
				assert.equal(new Check(spec).matches, Check.prototype.matches);
			});

		});

		describe('.id', function () {
			it('should be set', function () {
				var spec = {
					id: 'monkeys'
				};
				assert.equal(new Check(spec).id, spec.id);
			});

			it('should have no default', function () {
				var spec = {};
				assert.equal(new Check(spec).id, spec.id);

			});

		});

		describe('.after', function () {
			it('should be set', function () {
				var spec = {
					after: 'monkeys'
				};
				assert.equal(new Check(spec).after, spec.after);
			});

			it('should have no default', function () {
				var spec = {};
				assert.equal(new Check(spec).after, spec.after);

			});

		});

		describe('.options', function () {
			it('should be set', function () {
				var spec = {
					options: ['monkeys', 'bananas']
				};
				assert.equal(new Check(spec).options, spec.options);
			});

			it('should have no default', function () {
				var spec = {};
				assert.equal(new Check(spec).options, spec.options);

			});

		});
	});

});