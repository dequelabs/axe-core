/* global axe */
/**
 * Converts space delimited token list to an Array
 * @method tokenList
 * @memberof axe.commons.utils
 * @instance
 * @param  {String} str
 * @return {Array}
 */
axe.utils.tokenList = function (str) {
	'use strict';

	return str.trim().replace(/\s{2,}/g, ' ').split(' ');
};
