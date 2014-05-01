(function () {
	'use strict';

	var slice = [].slice;
	function noop() {}

	function queue() {
		var tasks = [],
			started = 0,
			remaining = 0, // number of tasks not yet finished
			await = noop;

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
			defer: function () {
				tasks.push(slice.call(arguments));
				++remaining;
				pop();
			},
			then: function (f) {
				await = f;
				if (!remaining) {
					notify();
				}
			},
			abort: function (fn) {
				await = noop;
				fn(tasks);
			}
		};
	}

	utils.queue = queue;
})();
