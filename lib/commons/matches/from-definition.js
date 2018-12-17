/* global matches */
const matchers = [
  'nodeName',
  'attributes',
  'properties',
  'condition'
]

/**
 * Check if a node matches some definition
 * 
 * Example:
 * ```js
 * matches.fromDefinition(node, {
 *   nodeName: ['div', 'span']
 *   attributes: {
 *     'aria-live': 'assertive'
 *   }
 * })
 * ```
 * 
 * @param {HTMLElement|VirtualNode} node
 * @param {Object|Array<Object>} definition
 * @returns {Boolean}
 */
matches.fromDefinition = function matchFromDefinition (node, definition) {
  node = node.actualNode || node;
	if (Array.isArray(definition)) {
		return definition.some(definition => matches(node, definition));
  }
	if (typeof definition === 'string') {
		return axe.utils.matchesSelector(node, definition);
  }

  return Object.keys(definition)
  .every(matcherName => {
    if (!matchers.includes(matcherName)) {
      throw new Error(`Unknown matcher type "${matcherName}"`)
    }
    const matchMethod = matches[matcherName]
    const matcher = definition[matcherName]
    return matchMethod(node, matcher)
  })
}

matches.condition = function (node, condition) {
  return !condition || condition(node)
}
