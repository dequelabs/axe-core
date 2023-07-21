/**
 * Check if a "thing" is truthy according to a "condition"
 *
 * Note: matches.condition(node, matcher) can be indirectly used through
 * matches(node, { condition: matcher })
 *
 * Example:
 * ```js
 * matches.condition(node, (arg) => arg === null)
 * ```
 *
 * @param {any} argument
 * @param {Function|Null|undefined} matcher
 * @returns {Boolean}
 */
export default function condition(arg, matcher) {
  return !!matcher(arg);
}
