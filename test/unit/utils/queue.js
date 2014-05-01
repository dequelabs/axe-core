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

		it('should allow parameters to be passed', function (done) {
			var q = utils.queue(),
				expected = { monkeys: 'bananas' };

			q.defer(function (data, callback) {
				assert.deepEqual(data, expected);
				callback(data);
			}, expected);

			q.then(function (data) {
				assert.deepEqual(data, [expected]);
				done();
			});
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

		it('should remove the `then` callback and pass all tasks as they are', function (done) {
			var q = utils.queue();

			q.defer(function (callback) {
				setTimeout(function () {
					callback(true);
				}, 1);
			});

			q.then(function () {
				assert.ok(false, 'should not execute');
			});

			q.abort(function (data) {
				assert.ok(true, 'Queue aborted');
				assert.isFunction(data[0][0]);
				done();
			});

		});

	});

});