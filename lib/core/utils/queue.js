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
		var failed = console.error.bind(console, 'Uncaught error (of queue)');

		function pop() {
			var length = tasks.length;
			for (; started < length; started++) {
				var task = tasks[started],
					fn = task.shift();

				task.push(callback(started));
				fn.apply(null, task);
			}
		}

		function callback(i) {
			return function (r) {
				tasks[i] = r;
				if (!--remaining) {
					notify();
				}
			};
		}

		function notify() {
			await(tasks);
		}

		return {
			/**
			 * Defer a function that may or may not run asynchronously.
			 *
			 * First parameter should be the function to execute with subsequent
			 * parameters being passed as arguments to that function
			 */
			defer: function (fn) {
				tasks.push([fn]);
				++remaining;
				pop();
			},
			/**
			 * The callback to execute once all "deferred" functions have completed.  Will only be invoked once.
			 * @param  {Function} f The callback, receives an array of the return/callbacked
			 * values of each of the "deferred" functions
			 */
			then: function (f) {
				await = f;
				if (!remaining) {
					notify();
				}
			},

			catch: function (f) {
				failed = f;
			},
			/**
			 * Abort the "queue" and prevent `then` function from firing
			 * @param  {Function} fn The callback to execute; receives an array of the results which have completed
			 */
			abort: function (msg) {
				await = noop;
				failed(msg);
				return tasks;
			}
		};
	}

	utils.queue = queue;
})();
