
/**
 * Iterates an array of objects looking for a property with a specific value
 * @param  {Array} array  The array of objects to iterate
 * @param  {String} key   The property name to test against
 * @param  {Mixed} value  The value to find
 * @return {Object}       The first matching object or `undefined` if no match
 */
axe.utils.findBy = function (array, key, value) {
	'use strict';
	array = array || [];

	var index, length;
	for (index = 0, length = array.length; index < length; index++) {
		if (array[index][key] === value) {
			return array[index];
		}
	}
};