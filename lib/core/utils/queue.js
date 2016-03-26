/* jshint latedef: false */

(function () {
	'use strict';
	function noop() {}

	/**
	 * Create an asyncronous "queue", list of functions to be invoked in parallel, but not necessarily returned in order
	 * @return {Queue} The newly generated "queue"
	 */
	function queue() {
		var tasks = [],
			started = 0,
			remaining = 0, // number of tasks not yet finished
			awt = noop;

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
			awt(tasks);
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
				awt = f;
				if (!remaining) {
					notify();
				}
			},
			/**
			 * Abort the "queue" and prevent `then` function from firing
			 * @param  {Function} fn The callback to execute; receives an array of the results which have completed
			 */
			abort: function (fn) {
				awt = noop;
				fn(tasks);
			}
		};
	}

	utils.queue = queue;
})();
