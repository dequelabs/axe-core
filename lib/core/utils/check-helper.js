/**
 * Helper to denote which checks are asyncronous and provide callbacks and pass data back to the CheckResult
 * @param  {CheckResult}   checkResult The target object
 * @param  {Function} callback    The callback to expose when `this.async()` is called
 * @return {Object}               Bound to `this` for a check's fn
 */
utils.checkHelper = function checkHelper(checkResult, resolve, reject) {
	'use strict';

	return {
		isAsync: false,
		async: function () {
			this.isAsync = true;
			return function (result) {
				if (typeof result === 'boolean') {
					checkResult.value = result;
					resolve(checkResult);
				} else {
					reject(result);
				}
			};
		},
		data: function (data) {
			checkResult.data = data;
		},
		relatedNodes: function (nodes) {
			nodes = nodes instanceof Node ? [nodes] : utils.toArray(nodes);
			checkResult.relatedNodes = nodes.map(function (element) {
				return new utils.DqElement(element);
			});
		}
	};
};
