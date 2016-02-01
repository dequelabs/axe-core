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

		describe('configure', function () {
			it('should accept one parameter', function () {
				assert.lengthOf(new Check({}).configure, 1);
			});
			it('should override options', function () {
				Check.prototype.test = function () {
					return this.options;
				};
				var check = new Check({
					options: ['foo']
				});
				check.configure({options: 'fong'});
				assert.equal('fong', check.test());
				delete Check.prototype.test;
			});
			it('should override selector', function () {
				Check.prototype.test = function () {
					return this.selector;
				};
				var check = new Check({
					selector: 'foo'
				});
				check.configure({selector: 'fong'});
				assert.equal('fong', check.test());
				delete Check.prototype.test;
			});
			it('should override evaluate', function () {
				Check.prototype.test = function () {
					return this.evaluate;
				};
				var check = new Check({
					evaluate: 'foo'
				});
				check.configure({evaluate: 'fong'});
				assert.equal('fong', check.test());
				delete Check.prototype.test;
			});
			it('should override matches', function () {
				Check.prototype.test = function () {
					return this.matches;
				};
				var check = new Check({
					matches: 'foo'
				});
				check.configure({matches: 'fong'});
				assert.equal('fong', check.test());
				delete Check.prototype.test;
			});
			it('should override after', function () {
				Check.prototype.test = function () {
					return this.after;
				};
				var check = new Check({
					after: 'foo'
				});
				check.configure({after: 'fong'});
				assert.equal('fong', check.test());
				delete Check.prototype.test;
			});
			it('should override enabled', function () {
				Check.prototype.test = function () {
					return this.enabled;
				};
				var check = new Check({
					enabled: true
				});
				check.configure({enabled: false});
				assert.equal(false, check.test());
				delete Check.prototype.test;
			});
			it('should NOT override id', function () {
				Check.prototype.test = function () {
					return this.id;
				};
				var check = new Check({
					id: 'fong'
				});
				check.configure({id: 'foo'});
				assert.equal('fong', check.test());
				delete Check.prototype.test;
			});
			it('should NOT override any random property', function () {
				Check.prototype.test = function () {
					return this.random;
				};
				var check = new Check({});
				check.configure({random: 'foo'});
				assert.equal(undefined, check.test());
				delete Check.prototype.test;
			});
		});

		describe('run', function () {
			it('should accept 3 parameters', function () {
				assert.lengthOf(new Check({}).run, 3);
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
				}).run(fixture, {}, function () {});

			});

			it('should pass the node through', function (done) {
				new Check({
					evaluate: function (node) {
						assert.equal(node, fixture);
						done();
					}
				}).run(fixture, {}, function () {});

			});

			it('should pass the options through', function (done) {
				var expected = { monkeys: 'bananas' };

				new Check({
					options: expected,
					evaluate: function (node, options) {
						assert.deepEqual(options, expected);
						done();
					}
				}).run(fixture, {}, function () {});

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
				}).run(fixture, { options: expected }, function () {});

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
				}).run(fixture, {}, cb);

			});

			it('should allow for asynchronous checks', function (done) {

				var data = { monkeys: 'bananas' };
				new Check({
					evaluate: function () {
						var ready = this.async();
						setTimeout(function () {
							ready(data);
						}, 10);
					}
				}).run(fixture, {}, function (d) {
					assert.instanceOf(d, CheckResult);
					assert.deepEqual(d.value, data);
					done();
				});

			});
			it('should allow for asynchronous checks through a queue', function (done) {
				var data = { monkeys: 'bananas' };
				var ck = new Check({
					evaluate: function () {
						this.defer(function (resolve) {
							setTimeout(function () {
								resolve(data);
							}, 10);
						});
					}
				});
				var q = ck.run(fixture, {});

				q.then(function (d) {
					console.log(d);
					assert.instanceOf(d[0], CheckResult);
					assert.deepEqual(d[0].value, data);
					done();
				});
				q.catch(console.error.bind(console));


			});

			it('should pass `null` as the parameter if the node does not match', function (done) {

				new Check({
					selector: '#monkeys',
					evaluate: function () {}
				}).run(fixture, {}, function (data) {
					assert.isNull(data);
					done();
				});

			});
			it('should pass `null` as the parameter if not enabled', function (done) {

				new Check({
					selector: '#monkeys',
					evaluate: function () {},
					enabled: false
				}).run(fixture, {}, function (data) {
					assert.isNull(data);
					done();
				});

			});
			it('should pass `null` as the parameter if options disable', function (done) {

				new Check({
					selector: '#monkeys',
					evaluate: function () {}
				}).run(fixture, {enabled: false}, function (data) {
					assert.isNull(data);
					done();
				});

			});

			it('passes a result to the callback', function (done) {

				new Check({
					evaluate: function () {
						return true;
					}
				}).run(fixture, {}, function (data) {
					assert.instanceOf(data, CheckResult);
					assert.isTrue(data.result);
					done();
				});

			});

			describe('returned queue', function () {

				it('has valid methods', function () {
					var testCheck = new Check({
						evaluate: function () {
							return true;
						}
					});

					var q = testCheck.run(fixture, {});
					assert.isFunction (q.defer);
					assert.isFunction (q.then);
					assert.isFunction (q.catch);
				});

				it('calls `then` when check is finished', function (done) {
					var testCheck = new Check({
						evaluate: function () {
							return true;
						}
					});

					var q = testCheck.run(fixture, {});
					q.then(function () {
						assert.ok(true, '`then` was called');
						done();
					});
				});

				it('calls `catch` when check throws', function (done) {
					new Check({
						evaluate: function () {
							throw 'error!';
						}

					}).run(fixture, {})
					.catch(function (err) {
						assert.equal(err, 'error!');
						done();
					});

				});

			});

		});
	});


	describe('spec object', function () {

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
