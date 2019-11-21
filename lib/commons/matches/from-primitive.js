/**
 * Check if some value matches
 *
 * ```js
 * matches.fromPrimitive('foo', 'foo') // true, string is the same
 * matches.fromPrimitive('foo', ['foo', 'bar']) // true, string is included
 * matches.fromPrimitive('foo', /foo/) // true, string matches regex
 * matches.fromPrimitive('foo', str => str.toUpperCase() === 'FOO') // true, function return is truthy
 * ```
 *
 * @private
 * @param {String|Boolean|Array|Number|Null|Undefined} someString
 * @param {String|RegExp|Function|Array<String>|Null|Undefined} matcher
 * @returns {Boolean}
 */
function fromPrimitive(someString, matcher) {
	const matcherType = typeof matcher;
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

export default fromPrimitive;
