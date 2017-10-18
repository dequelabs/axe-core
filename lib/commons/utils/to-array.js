/* global axe */

/**
 * Converts thing to an Array
 * @method toArray
 * @memberof axe.commons.utils
 * @instance
 * @param  {NodeList|HTMLCollection|String} thing
 * @return {Array}
 */
axe.utils.toArray = function (thing) {
	'use strict';
	return Array.prototype.slice.call(thing);
};
