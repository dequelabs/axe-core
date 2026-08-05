import fromPrimitive from './from-primitive';

/**
 * Check if some value matches
 *
 * ```js
 * match.fromPrimative('foo', 'foo') // true, string is the same
 * match.fromPrimative('foo', ['foo', 'bar']) // true, string is included
 * match.fromPrimative('foo', /foo/) // true, string matches regex
 * match.fromPrimative('foo', str => str.toUpperCase() === 'FOO') // true, function return is truthy
 * match.fromPrimative('foo', '/foo/') // true, string matches regex string
 * ```
 *
 * @deprecated use fromPrimitive
 * @private
 * @param {String|Boolean|Array|Number|Null|Undefined} someString
 * @param {String|RegExp|Function|Array<String>|Null|Undefined} matcher
 * @returns {Boolean}
 */
export default function fromPrimative(someString, matcher) {
  return fromPrimitive(someString, matcher);
}
