
/**
 * Converts array-like (numerical indicies and `length` property) structures to actual, real arrays
 * @param  {Mixed} thing Array-like thing to convert
 * @return {Array}
 */
axe.utils.toArray = function (thing) {
	'use strict';
	return Array.prototype.slice.call(thing);
};


/**
 * Creates an array without duplicate values
 * @param  {Array} arrArg Array to filter
 * @return {Array}
 */
axe.utils.uniqueArray = (arrArg) => {
  return arrArg.filter((elem, pos, arr) => {
    return arr.indexOf(elem) === pos;
  });
};
