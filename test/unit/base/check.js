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

		describe('run', function () {
			it('should accept 2 parameters', function () {
				assert.lengthOf(new Check({}).run, 2);
			});

			it('should call matches', function (done) {
				var success = false;

				new Check({
					matches: function () {
						success = true;
						return true;
					},
					fn: function () {
						assert.isTrue(success);
						done();
					}
				}).run(fixture, function () {});

			});

			it('should pass the node through', function (done) {
				new Check({
					fn: function (node) {
						assert.equal(node, fixture);
						done();
					}
				}).run(fixture, function () {});

			});

			it('should pass the options through', function (done) {
				var expected = { monkeys: 'bananas' };

				new Check({
					options: expected,
					fn: function (node, options) {
						assert.deepEqual(options, expected);
						done();
					}
				}).run(fixture, function () {});

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
					fn: function () {
						assert.deepEqual(result, this);
						utils.checkHelper = orig;
						done();
					}
				}).run(fixture, cb);

			});

			it('should allow for asynchronous checks', function (done) {

				var data = { monkeys: 'bananas' };
				new Check({
					fn: function () {
						this.async()(data);
					}
				}).run(fixture, function (d) {
					assert.instanceOf(d, CheckResult);
					assert.deepEqual(d.value, data);
					done();
				});

			});

			it('should pass `null` as the parameter if the node does not match', function (done) {

				new Check({
					selector: '#monkeys',
					fn: function () {}
				}).run(fixture, function (data) {
					assert.isNull(data);
					done();
				});

			});

			it('should not throw, but add any raised error as `error` on the returned object', function (done) {
				assert.doesNotThrow(function () {
					var error = new Error('oh noes');

					new Check({
						fn: function () {
							throw error;
						}
					}).run(fixture, function (data) {
						assert.deepEqual(data.error, { message: error.message, stack: error.stack });
						done();
					});

				});

			});

			it('should not throw, but pass any raised error as the first parameter to callback - async', function () {
				assert.doesNotThrow(function () {
					var error = new Error('oh noes');

					new Check({
						fn: function () {
							this.async();
							throw error;
						}
					}).run(fixture, function (data) {
						assert.deepEqual(data.error, { message: error.message, stack: error.stack });
					});

				});

			});

			it('should return a result', function (done) {

				new Check({
					fn: function () {
						return true;
					}
				}).run(fixture, function (data) {
					assert.instanceOf(data, CheckResult);
					done();
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