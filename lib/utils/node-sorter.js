/**
 * Array#sort callback to sort nodes by DOM order
 * @private
 * @param  {Node} a
 * @param  {Node} b
 * @return {Integer}   @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Sort
 */
utils.nodeSorter = function nodeSorter(a, b) {
	/*jshint bitwise: false */

	'use strict';

	if (a.compareDocumentPosition(b) & 4) { // a before b
		return -1;
	}

	return 1; // b before a

};