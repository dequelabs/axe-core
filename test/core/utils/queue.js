describe('axe.utils.queue', function () {
	'use strict';

	it('should be a function', function () {
		assert.isFunction(axe.utils.queue);
	});

	describe('defer', function () {
		it('should be a function', function () {
			var q = axe.utils.queue();
			assert.isFunction(q.defer);
		});

		it('should push onto the "axe.utils.queue"', function (done) {
			var q = axe.utils.queue();

			q.defer(function (resolve) {
				setTimeout(function () {
					resolve(1);
				}, 0);
			});

			q.defer(function (resolve) {
				setTimeout(function () {
					resolve(2);
				}, 0);
			});

			q.then(function (data) {
				assert.deepEqual(data, [1, 2]);
				done();
			});
		});

		it('should execute resolve immediately if defered functions are already complete', function () {
			var q = axe.utils.queue(),
				complete = false;

			q.defer(function (resolve) {
				resolve(1);
			});

			q.defer(function (resolve) {
				resolve(2);
			});

			q.then(function (data) {
				complete = true;
				assert.deepEqual(data, [1, 2]);
			});

			assert.isTrue(complete);

		});

		it('is chainable', function () {
			var q = axe.utils.queue();
			assert.equal(q, q.defer(function () {}));
		});

		it('throws if then was already called', function () {
			assert.throws(function () {

				var q = axe.utils.queue();
				q.defer(function (resolve) {
					resolve();
				});

				q.then(function () { });

				q.defer(function (resolve) {
					resolve();
				});
			});
		});

		it('can await another queue', function (done) {
			var q1 = axe.utils.queue();
			var q2 = axe.utils.queue();

			q1.defer(function (resolve) {
				setTimeout(function () {
					resolve(123);
				}, 10);
			});

			q2.defer(q1);
			q2.then(function (res) {
				// unwrap both queue results
				assert.equal(res[0][0], 123);
				done();
			});
		});
	});

	describe('then', function () {
		it('should be a function', function () {
			var q = axe.utils.queue();
			assert.isFunction(q.then);
		});

		it('should execute immediately if axe.utils.queue is complete', function () {
			var q = axe.utils.queue();
			var result = false;

			q.then(function () {
				result = true;
			});

			assert.isTrue(result);
		});

		it('is chainable', function () {
			var q = axe.utils.queue();
			assert.equal(q, q.then(function () {}));
		});

		it('throws when called more than once', function () {
			assert.throws(function () {
				var q = axe.utils.queue();
				q.defer(function () {});
				q.then(function () {});
				q.then(function () {});
			});
		});

	});

	describe('abort', function () {
		it('should be a function', function () {
			var q = axe.utils.queue();
			assert.isFunction(q.abort);
		});


		it('stops `then` from being called', function (done) {
			var q = axe.utils.queue();

			q.defer(function (resolve) {
				setTimeout(function () {
					resolve(true);
				}, 100);
			});

			q.then(function () {
				assert.ok(false, 'should not execute');
			});
			q.catch(function () {});

			setTimeout(function () {
				var data = q.abort();
				assert.ok(true, 'Queue aborted');
				assert.isFunction(data[0]);
				done();
			}, 1);

		});

		it('sends a message to `catch`', function (done) {
			var q = axe.utils.queue();
			q.defer(function () {});

			q.then(function () {});
			q.catch(function (err) {
				assert.equal(err, 'Super sheep');
				done();
			});

			q.abort('Super sheep');
		});

	});

	describe('catch', function () {
		it('is called when defer throws an error', function (done) {
			var q = axe.utils.queue();
			q.defer(function () {
				throw 'error! 1';
			});

			q.catch(function (e) {
				assert.equal(e, 'error! 1');
				done();
			});
		});

		it('can catch error synchronously', function (done) {
			var q = axe.utils.queue();
			var sync = true;
			q.defer(function () {
				throw 'error! 2';
			});

			q.catch(function (e) {
				assert.equal(e, 'error! 2');
				assert.ok(sync, 'error caught in sync');
				done();
			});
			sync = false;
		});

		it('is called when the reject method is called', function (done) {
			var q = axe.utils.queue();
			var errorsCaught = 0;

			q.defer(function (resolve, reject) {
				setTimeout(function () {
					reject('error! 2');
				}, 1);
			});

			q.catch(function (e) {
				assert.equal(e, 'error! 2');
				errorsCaught += 1;
				done();
			});
		});

		it('will not run `then` if an error is thrown', function (done) {
			var q = axe.utils.queue();
			q.defer(function () {
				throw 'error! 3';
			});

			q.then(function () {
				assert.ok(false, 'Should not be called');
			});
			q.catch(function (e) {
				assert.equal(e, 'error! 3');
				done();
			});
		});

		it('does not continue other tasks if an error occurs', function (done) {
			var q = axe.utils.queue();
			var aborted;
			q.defer(function () {
				throw 'error! 3';
			});
			q.defer(function () {
				aborted = false;
			});

			q.then(function () {
				assert.ok(false, 'Should not be called');
			});
			q.catch(function (e) {
				assert.equal(e, 'error! 3');
			});
			setTimeout(function () {
				assert.notEqual(aborted, false);
				done();
			}, 30);
		});

		it('is chainable', function () {
			var q = axe.utils.queue();
			assert.equal(q, q.catch(function () {}));
		});

		it('throws when called more than once', function () {
			assert.throws(function () {
				var q = axe.utils.queue();
				q.defer(function () {});
				q.catch(function () {});
				q.catch(function () {});
			});
		});

	});

});