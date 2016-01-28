describe('utils.queue', function () {
	'use strict';

	it('should be a function', function () {
		assert.isFunction(utils.queue);
	});

	describe('defer', function () {
		it('should be a function', function () {
			var q = utils.queue();
			assert.isFunction(q.defer);
		});

		it('should push onto the "utils.queue"', function (done) {
			var q = utils.queue();

			q.defer(function (callback) {
				setTimeout(function () {
					callback(1);
				}, 0);
			});

			q.defer(function (callback) {
				setTimeout(function () {
					callback(2);
				}, 0);
			});

			q.then(function (data) {
				assert.deepEqual(data, [1, 2]);
				done();
			});
		});

		it('should execute callback immediately if defered functions are already complete', function () {
			var q = utils.queue(),
				complete = false;

			q.defer(function (callback) {
				callback(1);
			});

			q.defer(function (callback) {
				callback(2);
			});

			q.then(function (data) {
				complete = true;
				assert.deepEqual(data, [1, 2]);
			});

			assert.isTrue(complete);

		});

	});

	describe('then', function () {
		it('should be a function', function () {
			var q = utils.queue();
			assert.isFunction(q.then);
		});

		it('should execute immediately if utils.queue is complete', function () {
			var q = utils.queue();
			var result = false;

			q.then(function () {
				result = true;
			});

			assert.isTrue(result);
		});

	});

	describe('abort', function () {
		it('should be a function', function () {
			var q = utils.queue();
			assert.isFunction(q.abort);
		});


		it('stops `then` from being called', function (done) {
			var q = utils.queue();

			q.defer(function (resolve) {
				setTimeout(function () {
					assert.ok(true, 'will run');
					resolve();
				}, 100);
			});

			q.defer(function (resolve) {
				assert.ok(false, 'should not run');
				resolve();
			});

			q.then(function () {
				assert.ok(false, 'should not run either');

			});
			q.catch(function (e) {});

			setTimeout(function () {
				var unfinished = q.abort();
				assert.equal(unfinished.length, 2);
				assert.isFunction(unfinished[0]);
				assert.isFunction(unfinished[1]);
				done();
			}, 1);
		});

		it('sends a message to `catch`', function (done) {
			var q = utils.queue();
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
			var q = utils.queue();
			q.defer(function () {
				throw 'error! 1';
			});

			q.catch(function (e) {
				assert.equal(e, 'error! 1');
				done();
			});
		});

		it('is called when the reject method is called', function (done) {
			var q = utils.queue();
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
			var q = utils.queue();
			q.defer(function () {
				throw 'error! 3';

			}).then(function () {
				assert.ok(false, 'Should not be called');

			}).catch(function (e) {
				assert.equal(e, 'error! 3');
				done();
			});
		});

	});

});