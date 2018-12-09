/* global matches */
matches.fromString = function matchFromString (someString, matcher) {
	const matcherType = typeof matcher;
	if (matcherType === 'undefined' || matcher === null) {
		return true;
	}
	if (Array.isArray(matcher)) {
		return matcher.includes(someString);
	}
	if (matcherType === 'function') {
		return !!matcher(someString);
	}
	if (matcher instanceof RegExp) {
		return matcher.test(someString);
	}
	return matcher === someString;
}

