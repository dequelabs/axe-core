
/**
 * Extends metadata onto result object and executes any functions.  Will not deeply extend.
 * @param  {Object} to   The target of the extend
 * @param  {Object} from Metadata to extend
 * @param  {Array}  blacklist property names to exclude from resulting object
 */
axe.utils.extendBlacklist = function (to, from, blacklist) {
	'use strict';
	blacklist = blacklist || [];

	for (var i in from) {
		if (from.hasOwnProperty(i) && blacklist.indexOf(i) === -1) {
			to[i] = from[i];
		}
	}

	return to;
};
