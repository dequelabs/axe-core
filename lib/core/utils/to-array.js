/**
 * Converts array-like (numerical indicies and `length` property) structures to actual, real arrays
 * @param	{Mixed} thing Array-like thing to convert
 * @return {Array}
 */
function toArray(thing) {
	return Array.prototype.slice.call(thing);
}

/**
 * Creates an array without duplicate values from 2 array inputs
 * @param	{Array} arr1 First array
 * @param	{Array} arr2 Second array
 * @return {Array}
 */
export function uniqueArray(arr1, arr2) {
	return arr1.concat(arr2).filter((elem, pos, arr) => {
		return arr.indexOf(elem) === pos;
	});
}

export default toArray;
