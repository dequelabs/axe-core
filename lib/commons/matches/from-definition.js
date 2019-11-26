import attributes from './attributes';
import condition from './condition';
import nodeName from './node-name';
import properties from './properties';
import matches from './matches';
import { matchesSelector } from '../../core/utils';

const matchers = {
	attributes,
	condition,
	nodeName,
	properties
};

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
function fromDefinition(node, definition) {
	node = node.actualNode || node;
	if (Array.isArray(definition)) {
		return definition.some(definitionItem => matches(node, definitionItem));
	}
	if (typeof definition === 'string') {
		return matchesSelector(node, definition);
	}

	return Object.keys(definition).every(matcherName => {
		if (!matchers[matcherName]) {
			throw new Error(`Unknown matcher type "${matcherName}"`);
		}
		// Find the specific matches method to.
		// matches.attributes, matches.nodeName, matches.properties, etc.
		let matchMethod = matchers[matcherName];

		// Find the matcher that goes into the matches method.
		// 'div', /^div$/, (str) => str === 'div', etc.
		const matcher = definition[matcherName];
		return matchMethod(node, matcher);
	});
}

export default fromDefinition;
