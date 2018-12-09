/* exported matches */

/**
 * Check if a DOM element matches a definition
 *
 * Example:
 * ```js
 * // Match a single nodeName:
 * axe.utils.elementMatch(elm, 'div')
 *
 * // Match one of multiple nodeNames:
 * axe.utils.elementMatch(elm, ['ul', 'ol'])
 *
 * // Match a node with nodeName 'button' and with aria-hidden: true:
 * axe.utils.elementMatch(elm, {
 * 	 nodeName: 'button',
 * 	 attributes: { 'aria-hidden': 'true' }
 * })
 *
 * // Mixed input. Match button nodeName, input[type=button] and input[type=reset]
 * axe.utils.elementMatch(elm, ['button', {
 * 	nodeName: 'input', // nodeName match isn't case sensitive
 * 	properties: { type: ['button', 'reset'] }
 * }])
 * ```
 *
 * - Array<ElementDefinition>: Return true if at least one element definition matches
 * - <ElementDefinition>:
 * 		- <String>: Element nodeName matches the string (upper case, case sensitive)
 * 		- <Object>: Return true if all properties match
 * 			- .nodeName<String>: Element nodeName matches the string
 * 			- .property<StringMatcher>: A property of the DOM node matches
 * 			- .attribute<StringMatcher>: The DOM node has the attribute and it matches
 *
 * <StringMatcher>: <String|Array|Regex|Function>:
 * 	- String: Strings matches the property or attribute value (case sensitive)
 *  - Array: Array includes the property or attribute value
 *  - Regex: Regex returns true when testing the property or attribute value
 *  - Function: Function returns true when testing the property or attribute value
 *
 * @namespace matches
 * @memberof axe.commons
 * @param {HTMLElement|VirtualNode} node node to verify attributes against constraints
 * @param {Array<ElementDefinition>|String|Object|Function|Regex} definition
 * @return {Boolean} true/ false based on if node passes the constraints expected
 */
function matches (node, definition) {
	return matches.fromDefinition(node, definition);;
}

commons.matches = matches
