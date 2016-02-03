/* global console */
(function () {
	'use strict';
	function noop() {}

	/**
	 * Create an asynchronous "queue", list of functions to be invoked in parallel, but not necessarily returned in order
	 * @return {Queue} The newly generated "queue"
	 */
	function queue() {
		var tasks = [];
		var started = 0;
		var remaining = 0; // number of tasks not yet finished
		var await = noop;
		var complete = false;
		var err;

		// By default, wait until the next tick,
		// if no catch was set, throw to console.
		var defaultFail= function (e) {
			err = e;
			setTimeout(function () {
				if (err) {
					console.error('Uncaught error (of queue)', err);
				}
			}, 1);
		};
		var failed = defaultFail;

		function pop() {
			var length = tasks.length;
			for (; started < length; started++) {
				var task = tasks[started];

				try {
					task.call(null, callback(started), abort);
				} catch (e) {
					abort(e);
				}
			}
		}

		function callback(i) {
			return function (r) {
				tasks[i] = r;
				remaining -= 1;
				if (!remaining && await !== noop) {
					complete = true;
					await(tasks);
				}
			};
		}

		function abort(msg) {
			// reset tasks
			complete = true;
			await = noop;

			// notify catch
			failed(msg);
			// return unfinished work
			return tasks;
		}

		var q = {
			/**
			 * Defer a function that may or may not run asynchronously.
			 *
			 * First parameter should be the function to execute with subsequent
			 * parameters being passed as arguments to that function
			 */
			defer: function (fn) {
				if (complete) {
					throw new Error('Queue already completed');
				}
				tasks.push(fn);
				++remaining;
				pop();
				return q;
			},
			/**
			 * The callback to execute once all "deferred" functions have completed.  Will only be invoked once.
			 * @param  {Function} f The callback, receives an array of the return/callbacked
			 * values of each of the "deferred" functions
			 */
			then: function (f) {
				if (await !== noop) {
					throw new Error('queue `then` already set');
				}
				if (!err) {
					await = f;
					if (!remaining) {
						complete = true;
						await(tasks);
					}
				}
				return q;
			},

			catch: function (f) {
				if (failed !== defaultFail) {
					throw new Error('queue `then` already set');
				}
				if (!err) {
					failed = f;
				} else {
					f(err);
					err = null;
				}
				return q;
			},
			/**
			 * Abort the "queue" and prevent `then` function from firing
			 * @param  {Function} fn The callback to execute; receives an array of the results which have completed
			 */
			abort: abort
		};
		return q;
	}

	utils.queue = queue;
})();
