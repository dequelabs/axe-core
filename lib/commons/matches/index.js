/* exported matches */

/**
 * Check if a DOM element matches a definition
 *
 * Example:
 * ```js
 * // Match a single nodeName:
 * axe.commons.matches(elm, 'div')
 *
 * // Match one of multiple nodeNames:
 * axe.commons.matches(elm, ['ul', 'ol'])
 *
 * // Match a node with nodeName 'button' and with aria-hidden: true:
 * axe.commons.matches(elm, {
 * 	 nodeName: 'button',
 * 	 attributes: { 'aria-hidden': 'true' }
 * })
 *
 * // Mixed input. Match button nodeName, input[type=button] and input[type=reset]
 * axe.commons.matches(elm, ['button', {
 * 	nodeName: 'input', // nodeName match isn't case sensitive
 * 	properties: { type: ['button', 'reset'] }
 * }])
 * ```
 *
 * @namespace matches
 * @memberof axe.commons
 * @param {HTMLElement|VirtualNode} node node to verify attributes against constraints
 * @param {Array<ElementDefinition>|String|Object|Function|Regex} definition
 * @return {Boolean} true/ false based on if node passes the constraints expected
 */
function matches(node, definition) {
	return matches.fromDefinition(node, definition);
}

commons.matches = matches;
