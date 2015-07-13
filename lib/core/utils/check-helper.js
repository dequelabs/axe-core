/*global DqElement */
/**
 * Helper to denote which checks are asyncronous and provide callbacks and pass data back to the CheckResult
 * @param  {CheckResult}   checkResult The target object
 * @param  {Function} callback    The callback to expose when `this.async()` is called
 * @return {Object}               Bound to `this` for a check's fn
 */
utils.checkHelper = function checkHelper(checkResult, callback) {
	'use strict';

	return {
		isAsync: false,
		async: function () {
			this.isAsync = true;
			return function (result) {
				checkResult.value = result;
				callback(checkResult);
			};
		},
		data: function (data) {
			checkResult.data = data;
		},
		relatedNodes: function (nodes) {
			nodes = nodes instanceof Node ? [nodes] : utils.toArray(nodes);
			checkResult.relatedNodes = nodes.map(function (element) {
				return new DqElement(element);
			});
		}
	};
};
