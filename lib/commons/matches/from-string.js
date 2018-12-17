/* global matches */

/**
 * Check if some value matches
 * 
 * ```js
 * match.fromString('foo', 'foo') // true, string is the same
 * match.fromString('foo', ['foo', 'bar']) // true, string is included
 * match.fromString('foo', /foo/) // true, string matches regex
 * match.fromString('foo', str => str.toUpperCase() === 'FOO') // true, function return is truthy
 * match.fromString('foo', null) // true, matcher is empty
 * match.fromString('foo', undefined) // true, matcher is empty
 * ```
 * 
 * @param {String|Null|Undefined} someString
 * @param {String|RegExp|Function|Array<String>|Null|Undefined} matcher
 * @returns {Boolean}
 */
matches.fromString = function matchFromString (someString, matcher) {
	const matcherType = typeof matcher;
	if (matcherType === 'undefined' || matcher === null) {
		return true;
	}

	if (Array.isArray(matcher) && typeof someString !== 'undefined') {
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

