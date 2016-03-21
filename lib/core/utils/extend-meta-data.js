
/**
 * Extends metadata onto result object and executes any functions
 * @param  {Object} to   The target of the extend
 * @param  {Object} from Metadata to extend
 */
axe.utils.extendMetaData = function (to, from) {
	'use strict';

	for (var i in from) {
		if (from.hasOwnProperty(i)) {
			if (typeof from[i] === 'function') {
				try {
					to[i] = from[i](to);
				} catch (e) {
					to[i] = null;
				}
			} else {
				to[i] = from[i];
			}
		}
	}
};