/* global matches */
const matchers = ['nodeName', 'attributes', 'properties', 'condition'];

/**
 * Check if a node matches some definition
 *
 * Note: matches.fromDefinition(node, definition) can be indirectly used through
 * matches(node, definition)
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
 * @private
 * @param {HTMLElement|VirtualNode} node
 * @param {Object|Array<Object>} definition
 * @returns {Boolean}
 */
matches.fromDefinition = function matchFromDefinition(node, definition) {
	node = node.actualNode || node;
	if (Array.isArray(definition)) {
		return definition.some(definitionItem => matches(node, definitionItem));
	}
	if (typeof definition === 'string') {
		return axe.utils.matchesSelector(node, definition);
	}

	return Object.keys(definition).every(matcherName => {
		if (!matchers.includes(matcherName)) {
			throw new Error(`Unknown matcher type "${matcherName}"`);
		}
		// Find the specific matches method to.
		// matches.attributes, matches.nodeName, matches.properties, etc.
		const matchMethod = matches[matcherName];

		// Find the matcher that goes into the matches method.
		// 'div', /^div$/, (str) => str === 'div', etc.
		const matcher = definition[matcherName];
		return matchMethod(node, matcher);
	});
};
