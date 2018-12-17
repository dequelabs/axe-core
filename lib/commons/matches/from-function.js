/* global matches */

/**
 * Check if the value from a function matches some condition
 * 
 * Each key on the matcher object is passed to getValue, the returned value
 * must than match the with the value of that matcher
 * 
 * @param {Function} getValue
 * @param {Object} matcher matcher
 * @returns {Boolean}
 */
matches.fromFunction = function matchFromFunction(getValue, matcher) {
	const matcherType = typeof matcher;
	if (matcherType === 'undefined' || matcher === null) {
		return true;
	}
	if (matcherType !== 'object' || Array.isArray(matcher) || matcher instanceof RegExp) {
		throw new Error('Expect elementMatch properties to be an object');
	}

	// Check that the property has all the expected values
	return Object.keys(matcher).every(propName => {
		return matches.fromString(getValue(propName), matcher[propName]);
	});
}