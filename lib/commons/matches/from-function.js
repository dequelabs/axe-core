/* global matches */
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